'use server';
import { ActionResponse } from './response';
import { inserUserApplication } from '@/model/user';
import { pets } from '@/app/generated/prisma';
import { getSession } from '@/lib/session';



export async function createUserApplication(data: pets): Promise<ActionResponse> {
    try {
        if (!data || data.admin_id === null) {
            return {
                success: false,
                message: 'No data found',
            };
        }

        const userId = await getSession();

        if (!userId || userId.userId === null || userId.userId === undefined) {
            return {
                success: false,
                message: 'No user found',
                error: 'Unauthorized access',
            };
        }
        const APPLICATION_DATE = new Date();
        const application = await inserUserApplication({
            userId: userId.userId,
            adminId: data.admin_id,
            petId: data.pet_id,
            applicationDate: APPLICATION_DATE,
        });

        if (!application.success) {
            return {
                success: false,
                message: 'Failed to create application',
                error: 'Model error',
            };
        }

        return {
            success: true,
            message: 'Application creation successful!',
        };
    } catch (error) {
        console.error('An error occured: ', error);
        return {
            success: false,
            message: 'Creation failed',
            error: 'Server error',
        };
    }
}
