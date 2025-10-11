import { pet_status, pets, PrismaClient } from '@/app/generated/prisma';
import { ModelResponse } from './response';
import { getSession } from '@/lib/session';
const prisma = new PrismaClient();

// Get all not adopted pets
export async function getAllAvailablePets(): Promise<ModelResponse<pets[]>> {
    try {
        const pets = await prisma.pets.findMany({
            where: {
                pet_status: 'not_adopted',
            },
        });

        if (!pets || pets === null) {
            return {
                success: false,
                message: 'No pets found',
            };
        }
        return {
            success: true,
            message: 'Query successful!',
            data: pets,
        };
    } catch (error) {
        console.error(error);
        return {
            success: false,
            message: 'Query failed! An error occured',
            error: `${error}`,
        };
    }
}

export async function getAllFosterPets(adminId: number): Promise<ModelResponse<pets[]>> {
    try {
        const fosterPets = await prisma.pets.findMany({
            where: {
                admin_id: adminId,
            },
        });

        return {
            success: true,
            message: 'Successful query',
            data: fosterPets,
        };
    } catch (error) {
        console.error('An error occured while fetching data: ', error);
        return {
            success: false,
            message: 'Failed to query data',
            error: 'Database error',
        };
    }
}

type PetsProps = {
    name: string;
    species: string;
    age: string;
    sex: string;
    breed: string;

    description: string;
};

export async function createPet({ name, species, age, sex, breed, description }: PetsProps): Promise<ModelResponse> {
    try {
        const user_id = await getSession();

        if (!user_id || user_id === null || user_id.userId === null) {
            return {
                success: false,
                message: 'No user found with current session',
                error: 'Unauthorized user',
            };
        }

        const insertPet = await prisma.pets.create({
            data: {
                pet_name: name,
                pet_species: species,
                pet_age: age,
                pet_sex: sex,
                pet_breed: breed,
                pet_description: description,
                admin_id: user_id.userId,
            },
        });

        if (!insertPet) {
            return {
                success: false,
                message: 'Failed to inser pet',
                error: 'Database error, Failed to insert pet',
            };
        }

        return {
            success: true,
            message: 'Inserted succesfully!',
        };
    } catch (error) {
        console.error('An error occured: ', error);
        return {
            success: false,
            message: 'Insertion failed',
            error: 'Database error',
        };
    }
}

export async function updatePetStatus(petId: number, petStatus: pet_status): Promise<ModelResponse> {
    try {
        const updateStatus = await prisma.pets.update({
            where: {
                pet_id: petId,
            },
            data: {
                pet_status: petStatus,
            },
        });

        if (!updateStatus) {
            return {
                success: false,
                message: 'Failed to update pet status',
                error: 'Database error',
            };
        }

        return {
            success: true,
            message: 'Updated successfully!',
        };
    } catch (error) {
        console.error('An error occured: ', error);
        return {
            success: false,
            message: 'An error occured while updating pet status',
            error: 'Database error',
        };
    }
}

export async function createAdoptedPet(userId: number, petId: number, adoptionDate: Date): Promise<ModelResponse> {
    try {
        const adoption = await prisma.adopted_pets.create({
            data: {
                user_id: userId,
                pet_id: petId,
                date_of_adoption: adoptionDate,
            },
        });

        if (!adoption) {
            return {
                success: false,
                message: 'Failed to create adoption',
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
            message: 'Failed to create pet adoption',
            error: 'Database error',
        };
    }
}

export async function deletePet(petId: number): Promise<ModelResponse> {
    try {
        const pet = await prisma.pets.delete({
            where: {
                pet_id: petId,
            },
        });

        if (!pet) {
            return {
                success: false,
                message: 'Failed to delete pet',
            };
        }

        return {
            success: true,
            message: 'Pet deleted successfully',
        };
    } catch (error) {
        console.error('An error occured: ', error);
        return {
            success: false,
            message: 'Failed to delete pet',
            error: 'Database error',
        };
    }
}
