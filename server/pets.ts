'use server';
import {
    AdoptedPetsProps,
    createAdoptedPet,
    createPet,
    getAllAvailablePets,
    getAllCats,
    getAllDogs,
    getAllFosterPets,
    getAllUserPetApplications,
    getUserAdoptedPets,
} from '@/model/pet';
import { ActionResponse } from './response';
import { getSession } from '@/lib/session';
import { applications, pet_status, pets } from '@/app/generated/prisma';
import { CreatePetSchema, UpdatePetSchema } from '@/lib/pets';
import { deletePet as removePet, updatePet as updateModelPet } from '@/model/pet';
import { getCurrentAdmin } from './admin';
import fs from 'fs';
import path from 'path';
import { ApplicationsProps } from '@/model/admin';

export async function getFosterPets(): Promise<ActionResponse<pets[]>> {
    try {
        const userId = await getSession();

        if (!userId || userId === null) {
            return { success: false, message: 'No user found' };
        }

        const pets = await getAllFosterPets(userId.userId);

        if (!pets.success) {
            return { success: false, message: 'Server error' };
        }
        return { success: true, message: 'Successful!', data: pets.data };
    } catch (error) {
        console.error('Server side error: ', error);
        return {
            success: false,
            message: 'Failed to fetch pets data',
            error: 'Server error',
        };
    }
}

export async function geAvailablePets(): Promise<ActionResponse<pets[]>> {
    try {
        const pets = await getAllAvailablePets();

        if (!pets.success) {
            return {
                success: false,
                message: 'Failed to get pets',
                error: 'Database error',
            };
        }

        return {
            success: true,
            message: 'Successful!',
            data: pets.data,
        };
    } catch (error) {
        console.error('An error occured:', error);
        return {
            success: false,
            message: 'Server failed',
            error: 'Server side error',
        };
    }
}

export async function insertPet(formData: FormData): Promise<ActionResponse> {
    try {
        const imageFile = formData.get('image') as File | null;
        const data = {
            name: formData.get('name') as string,
            species: formData.get('species') as string,
            image: imageFile ?? null,
            age: formData.get('age') as string,
            sex: formData.get('sex') as string,
            breed: formData.get('breed') as string,
            birthday: formData.get('birthday') ? new Date(formData.get('birthday') as string) : null,
            weight: Number(formData.get('weight')),
            height: Number(formData.get('height')),
            description: formData.get('description') as string,
            condition: formData.get('condition') as string,
        };

        const validateResult = CreatePetSchema.safeParse(data);

        if (!validateResult.success) {
            return {
                success: false,
                message: 'Validation failed',
                error: `${validateResult.error.flatten().formErrors}`,
            };
        }

        if (!imageFile) {
            return {
                success: false,
                message: 'Image is required',
                error: 'No image found',
            };
        }

        const bytes = await imageFile.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const uploadDirectory = process.env.PET_UPLOAD_DIR
            ? path.resolve(process.env.PET_UPLOAD_DIR)
            : path.join(process.cwd(), 'public', 'pets');
        if (!fs.existsSync(uploadDirectory)) fs.mkdirSync(uploadDirectory, { recursive: true });

        const ext = path.extname(imageFile.name);
        const base = path
            .basename(imageFile.name, ext)
            .replace(/[^a-z0-9-_]/gi, '_')
            .toLowerCase();
        const filename = `${base}-${Date.now()}${ext}`;
        const filePath = path.join(uploadDirectory, filename);

        fs.writeFileSync(filePath, buffer);

        const imageURL = uploadDirectory.includes(path.join('public')) ? `/pets/${filename}` : filePath;

        const pet = await createPet({
            name: data.name,
            species: data.species,
            age: data.age,
            image: imageURL,
            sex: data.sex,
            breed: data.breed,
            birthday: data.birthday,
            weight: data.weight,
            height: data.height,
            description: data.description,
            condition: data.condition,
        });

        if (!pet.success) {
            return {
                success: false,
                message: 'Failed to insert pet',
                error: 'Server error',
            };
        }

        return {
            success: true,
            message: 'Created Successfully!',
        };
    } catch (error) {
        console.error('An error occured: ', error);
        return {
            success: false,
            message: 'Failed to insert pet. An error occured',
            error: 'Server error',
        };
    }
}

export async function getAllPets(): Promise<ActionResponse<pets[]>> {
    try {
        const pets = await getAllAvailablePets();

        if (!pets.success) {
            return {
                success: false,
                message: 'Failed to fetch data',
                error: 'Database error',
            };
        }

        return {
            success: true,
            message: 'Fetch successfully!',
            data: pets.data,
        };
    } catch (error) {
        console.error('An error occured: ', error);
        return {
            success: false,
            message: 'Failed to fetch data',
            error: 'Server error',
        };
    }
}

export async function createPetAdoption(petId: number, adoptionDate: Date): Promise<ActionResponse> {
    try {
        const userId = await getSession();

        if (!userId || userId === null) {
            return { success: false, message: 'No user found' };
        }

        const createAdoption = await createAdoptedPet(userId.userId, petId, adoptionDate);

        if (!createAdoption.success) {
            return {
                success: false,
                message: 'Failed to create adopted pet',
            };
        }

        return {
            success: true,
            message: 'Created successfully!',
        };
    } catch (error) {
        console.error('An error occured: ', error);
        return {
            success: false,
            message: 'Failed too create pet adoption',
            error: 'Server error',
        };
    }
}

export async function deletePet(petId: number): Promise<ActionResponse> {
    try {
        const pet = await removePet(petId);

        if (!pet.success) {
            return {
                success: false,
                message: 'Failed to delete pet',
            };
        }

        return {
            success: true,
            message: 'Pet deleted successfully!',
        };
    } catch (error) {
        console.error('An error occured: ', error);
        return {
            success: false,
            message: 'Failed to delete pet',
            error: 'Server error',
        };
    }
}

export async function updatePet(formData: FormData): Promise<ActionResponse> {
    try {
        const imageFile = formData.get('image') as File | null;
        const data = {
            id: Number(formData.get('id')),
            name: formData.get('name') as string,
            species: formData.get('species') as string,
            image: imageFile,
            age: formData.get('age') as string,
            sex: formData.get('sex') as string,
            breed: formData.get('breed') as string,
            birthday: formData.get('birthday') ? new Date(formData.get('birthday') as string) : null,
            weight: Number(formData.get('weight')),
            height: Number(formData.get('height')),
            status: formData.get('status') as string,
            description: formData.get('description') as string,
            condition: formData.get('condition') as string,
        };

        const adminId = await getCurrentAdmin();

        if (!adminId.success || adminId.data === null || adminId.data === undefined) {
            return {
                success: false,
                message: 'No admin found',
                error: 'Unauthorized access',
            };
        }

        const validateResult = UpdatePetSchema.safeParse(data);

        if (!validateResult.success) {
            return {
                success: false,
                message: 'Validation failed',
                error: `${validateResult.error.flatten().formErrors}`,
            };
        }

        if (!imageFile) {
            return {
                success: false,
                message: 'Image is required',
                error: 'No image found',
            };
        }

        const bytes = await imageFile.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const uploadDirectory = path.join(process.cwd(), 'public', 'uploads');
        if (!fs.existsSync(uploadDirectory)) fs.mkdirSync(uploadDirectory, { recursive: true });

        const filePath = path.join(uploadDirectory, imageFile.name);
        fs.writeFileSync(filePath, buffer);

        const imageURL = filePath;

        const parseData: pets = {
            pet_id: data.id,
            pet_name: data.name,
            pet_species: data.species,
            pet_age: data.age,
            pet_sex: data.sex,
            pet_breed: data.breed,
            pet_birthday: data.birthday,
            pet_weight: data.weight,
            pet_height: data.height,
            pet_status: data.status as pet_status,
            pet_description: data.description,
            pet_condition: data.condition,
            pet_image: imageURL,
            admin_id: adminId.data.admin_id,
        };

        const pet = await updateModelPet(parseData);

        if (!pet.success) {
            return {
                success: false,
                message: 'Failed to insert pet',
                error: 'Server error',
            };
        }

        return {
            success: true,
            message: 'Created Successfully!',
        };
    } catch (error) {
        console.error('An error occured: ', error);
        return {
            success: false,
            message: 'Failed to insert pet. An error occured',
            error: 'Server error',
        };
    }
}

export async function fetchAllUserApplications(): Promise<ActionResponse<ApplicationsProps[]>> {
    try {
        const session = await getSession();

        if (!session || session.userId === undefined || session.userId === null) {
            return {
                success: false,
                message: 'No user found',
                error: 'Unauthorized access',
                data: [],
            };
        }

        const applications = await getAllUserPetApplications(session.userId);

        if (
            !applications.success ||
            applications.data === undefined ||
            applications.data === null ||
            !applications.data
        ) {
            return {
                success: false,
                message: 'Failed to fetch applications',
                error: 'Database error',
                data: [],
            };
        }

        return {
            success: true,
            message: 'Served successfully!',
            data: applications.data,
        };
    } catch (error) {
        console.error('An error occured: ', error);
        return {
            success: false,
            message: 'Failed to fetch applications',
            error: 'Server error',
            data: [],
        };
    }
}

export async function fetchAllUserAdoptedPets(): Promise<ActionResponse<AdoptedPetsProps[]>> {
    try {
        const session = await getSession();

        if (!session || session.userId === undefined || session.userId === null) {
            return {
                success: false,
                message: 'No user found',
            };
        }

        const adoptedPets = await getUserAdoptedPets(session.userId);

        if (!adoptedPets.success) {
            return {
                success: false,
                message: 'Failed to query adopted pets',
            };
        }

        return {
            success: true,
            message: 'Successful fetched!',
            data: adoptedPets.data,
        };
    } catch (error) {
        console.error('An error occured: ', error);
        return {
            success: false,
            message: 'Failed to fetched data',
            error: 'Server error',
        };
    }
}

export async function fetchAllStatistics(): Promise<ActionResponse<pets[]>> {
    try {
        const session = await getSession();

        if (!session || session.userId === undefined || session.userId === null) {
            return {
                success: false,
                message: 'No user found',
            };
        }

        const dogs = await getAllDogs(session.userId);
        const cats = await getAllCats(session.userId);

        if (!dogs.success || !cats.success) {
            return {
                success: false,
                message: 'Failed to fetch pets',
            };
        }

        const allPets = [...(dogs.data ?? []), ...(cats.data ?? [])];
        return {
            success: true,
            message: 'Successful fetched!',
            data: allPets,
        };
    } catch (error) {
        console.error('An error occured: ', error);
        return {
            success: false,
            message: 'Failed to fetched data',
            error: 'Server error',
        };
    }
}
