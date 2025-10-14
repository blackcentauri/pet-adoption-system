'use server';
import { createAdoptedPet, createPet, getAllAvailablePets, getAllFosterPets } from '@/model/pet';
import { ActionResponse } from './response';
import { getSession } from '@/lib/session';
import { pets } from '@/app/generated/prisma';
import { CreatePetSchema } from '@/lib/pets';
import { deletePet as removePet } from '@/model/pet';

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
        const data = {
            name: formData.get('name') as string,
            species: formData.get('species') as string,
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

        const pet = await createPet({
            name: data.name,
            species: data.species,
            age: data.age,
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
