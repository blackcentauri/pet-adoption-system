'use server';
import { getSession } from '@/lib/session';
import { ActionResponse } from './response';
import { ApplicationsProps, getAllApplications, updateApplicationStatus } from '@/model/admin';

export async function getAllFosterRequests(): Promise<ActionResponse<ApplicationsProps[]>> {
    try {
        const adminId = await getSession();

        if (!adminId || adminId.userId === undefined || adminId.userId === null) {
            return {
                success: false,
                message: 'No admin found!',
                error: 'Unauthorized access',
            };
        }

        const applications = await getAllApplications(adminId.userId);

        if (!applications.success) {
            return {
                success: false,
                message: 'Failed to fetch application data',
                error: 'Database error',
                data: [],
            };
        }

        return {
            success: true,
            message: 'Successful!',
            data: applications.data,
        };
    } catch (error) {
        console.error('An error occured: ', error);
        return {
            success: false,
            message: 'Failed to fetch all foster requests',
            data: [],
            error: 'Server error',
        };
    }
}

export async function updateApplication(applicationId: number, applicationStatus: string): Promise<ActionResponse> {
    try {
        const adminId = await getSession();

        if (!adminId || adminId.userId === null || adminId.userId === undefined) {
            return {
                success: false,
                message: 'No user found',
                error: 'Unauthorized access!',
            };
        }

        const adoptionDate = new Date();
        const unionApplicationStatus = applicationStatus as 'applied' | 'pending' | 'approved';

        const updateApplication = await updateApplicationStatus({
            applicationId: applicationId,
            applicationStatus: unionApplicationStatus,
            adoptionDate: adoptionDate,
        });

        if (!updateApplication.success) {
            return {
                success: false,
                message: 'Failed to update application status',
                error: 'Database error',
            };
        }

        return {
            success: true,
            message: 'Successful!',
        };
    } catch (error) {
        console.error('An error occured: ', error);
        return {
            success: false,
            message: 'Failed to update',
            error: 'Server error',
        };
    }
}
