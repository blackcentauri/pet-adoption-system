import { pets, PrismaClient } from '@/app/generated/prisma';
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

export async function getAllFosterPets(
    userId: number
): Promise<ModelResponse<pets[]>> {
    try {
        const fosterPets = await prisma.pets.findMany({
            where: {
                user_id: userId,
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

export async function createPet({
    name,
    species,
    age,
    sex,
    breed,
    description,
}: PetsProps): Promise<ModelResponse> {
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
                user_id: user_id.userId,
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
