'use server';
import { getSession, JWTPayload } from '@/lib/session';
import { ActionResponse } from './response';
import { ApplicationsProps, getAllApplications, updateApplicationStatus } from '@/model/admin';
import { logOutSession } from '@/lib/auth';

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

export async function getCurrentAdmin(): Promise<ActionResponse<JWTPayload>> {
    try {
        const userInfo = await getSession();

        if (!userInfo || userInfo.username === null || userInfo.username === undefined) {
            return {
                success: false,
                message: 'No user found!',
                data: undefined,
                error: 'Unauthorized access',
            };
        }

        return {
            success: true,
            message: 'Fetch current user successfully!',
            data: userInfo,
        };
    } catch (error) {
        console.error('An error occured: ', error);
        return {
            success: false,
            message: 'Failed to get current user',
            data: undefined,
            error: 'Server error',
        };
    }
}

export async function deleteCurrentSession(): Promise<ActionResponse> {
    try {
        const log = await logOutSession();

        if (!log) {
            return {
                success: false,
                message: 'Failed to delete session',
            };
        }
        return {
            success: true,
            message: 'Session deleted successfully!',
        };
    } catch (error) {
        console.error('An error occured: ', error);
        return {
            success: false,
            message: 'Failed to delete session',
            error: 'Server error',
        };
    } finally {
        return {
            success: true,
            message: 'Log out successfully!',
        };
    }
}
