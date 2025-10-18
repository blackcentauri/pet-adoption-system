'use server';
import { getSession, JWTPayload } from '@/lib/session';
import { ActionResponse } from './response';
import {
    ApplicationsProps,
    getAllApplications,
    getAllApplicationsCount,
    getAllApprovedApplications,
    getAllRejectedApplicationsCount,
    modelAdminInfo,
    queryAdminInfo,
    updateAdminInfo,
    updateApplicationStatus,
} from '@/model/admin';
import { logOutSession, UpdateAdminSchema } from '@/lib/auth';
import { admins } from '@/app/generated/prisma';

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

export async function getCurrentAdmin(): Promise<ActionResponse<admins>> {
    try {
        const userInfo = await getSession();

        if (!userInfo || userInfo.userId === null || userInfo.userId === undefined) {
            return {
                success: false,
                message: 'No user found!',
                data: undefined,
                error: 'Unauthorized access',
            };
        }

        const admin = await modelAdminInfo(userInfo.userId);

        if (!admin.success) {
            return {
                success: false,
                message: 'Failed to query data',
            };
        }
        return {
            success: true,
            message: 'Fetch current user successfully!',
            data: admin.data,
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

type ApplicationCounts = {
    appliedCounts: number;
    rejectedCounts: number;
    approvedCounts: number;
};

export async function fetchAllApplicationsCount(): Promise<ActionResponse<ApplicationCounts>> {
    const fallbackData: ApplicationCounts = {
        appliedCounts: 0,
        rejectedCounts: 0,
        approvedCounts: 0,
    };
    try {
        const session = await getSession();

        if (!session || session.userId === null || session.userId === undefined) {
            return {
                success: false,
                message: 'No user found',
                error: 'Unauthorized access',
                data: fallbackData,
            };
        }

        const applicationsCount = await getAllApplicationsCount(session.userId);
        const rejectedCount = await getAllRejectedApplicationsCount(session.userId);
        const approvedApplicationsCount = await getAllApprovedApplications(session.userId);

        if (!applicationsCount.success) {
            return {
                success: false,
                message: 'Failed to fetched applications count',
                data: fallbackData,
                error: 'Server side error',
            };
        }

        if (!rejectedCount.success) {
            return {
                success: false,
                message: 'Failed to fetched applications count',
                data: fallbackData,
                error: 'Server side error',
            };
        }

        if (!approvedApplicationsCount.success) {
            return {
                success: false,
                message: 'Failed to fetched applications count',
                data: fallbackData,
                error: 'Server side error',
            };
        }

        const counts: ApplicationCounts = {
            appliedCounts: applicationsCount.data ?? 0,
            rejectedCounts: rejectedCount.data ?? 0,
            approvedCounts: approvedApplicationsCount.data ?? 0,
        };

        return {
            success: true,
            message: 'Fetched successfully!',
            data: counts,
        };
    } catch (error) {
        console.error('An error occured: ', error);
        return {
            success: false,
            message: 'Failed to fetch applications count',
            error: 'Server error',
            data: fallbackData,
        };
    }
}

export async function fetchAdminInfo(): Promise<ActionResponse<admins>> {
    try {
        const session = await getSession();

        if (!session || session.userId === null || session.userId === undefined) {
            return {
                success: false,
                message: 'No user found',
                error: 'Unauthorized access',
            };
        }

        const userInfo = await queryAdminInfo(session.userId);

        if (!userInfo.success) {
            return {
                success: false,
                message: 'Failed to fetch user info',
            };
        }

        return {
            success: true,
            message: 'Successful',
            data: userInfo.data,
        };
    } catch (error) {
        console.error('An erro occured: ', error);
        return {
            success: false,
            message: 'Failed to fetch user data',
        };
    }
}

export async function updateAdmin(formData: FormData): Promise<ActionResponse> {
    try {
        const userId = await getSession();

        if (!userId || userId.userId == null || userId.userId === undefined) {
            return {
                success: false,
                message: 'No user found',
            };
        }

        const data = {
            adminName: formData.get('adminName') as string,
            username: formData.get('username') as string,
            email: formData.get('email') as string,
        };

        const Validation = UpdateAdminSchema.safeParse(data);

        if (!Validation.success) {
            return {
                success: false,
                message: 'Failed to update user',
            };
        }

        const user = await updateAdminInfo({
            adminId: userId.userId,
            adminName: data.adminName,
            username: data.username,
            email: data.email,
        });
        if (!user.success) {
            return {
                success: false,
                message: 'Failed to update user',
            };
        }

        return {
            success: true,
            message: 'Successful update',
        };
    } catch (error) {
        console.error('Error', error);
        return {
            success: false,
            message: 'Failed to update',
            error: 'Server error',
        };
    }
}
