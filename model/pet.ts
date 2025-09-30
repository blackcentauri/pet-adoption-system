import { pets, PrismaClient } from '@/app/generated/prisma';
import { ModelResponse } from './response';
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
