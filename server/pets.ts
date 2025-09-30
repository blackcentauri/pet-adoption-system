'use server';
import { getAllFosterPets } from '@/model/pet';
import { ActionResponse } from './response';
import { getSession } from '@/lib/session';
import { pets } from '@/app/generated/prisma';

export async function getPets(): Promise<ActionResponse<pets[]>> {
    try {
        const userId = await getSession();

        if (!userId || userId === null) {
            return {
                success: false,
                message: 'No user found',
            };
        }

        const pets = await getAllFosterPets(userId.userId);

        if (!pets.success) {
            return {
                success: false,
                message: 'Server error',
            };
        }
        return {
            success: true,
            message: 'Successful!',
            data: pets.data,
        };
    } catch (error) {
        console.error('Server side error: ', error);
        return {
            success: false,
            message: 'Failed to fetch pets data',
            error: 'Server error',
        };
    }
}
