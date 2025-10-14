import { admins, applications, pets, PrismaClient, users } from '@/app/generated/prisma';
import { ModelResponse } from './response';
import { encryptPassword } from '@/util/encrypt-password';
import { createAdoptedPet, updatePetStatus } from './pet';

const prisma = new PrismaClient();

export async function getOrganizationInfo(email: string): Promise<ModelResponse<admins>> {
    try {
        const organizationInfo = await prisma.admins.findUnique({
            where: {
                email: email,
            },
        });

        if (!organizationInfo || organizationInfo === undefined) {
            return {
                success: false,
                message: 'No user found',
                error: 'User not found',
            };
        }

        return {
            success: true,
            message: 'User found',
            data: organizationInfo,
        };
    } catch (error) {
        console.error('An error occured while querying', error);
        return {
            success: false,
            message: 'Failed to query organization info',
            error: `${error}`,
        };
    }
}

type OrganizationProps = {
    organizationName: string;
    username: string;
    email: string;
    password: string;
};

export async function insertOrganization({
    organizationName,
    username,
    email,
    password,
}: OrganizationProps): Promise<ModelResponse<admins>> {
    try {
        const hashedPassword = await encryptPassword(password);
        const createdAt = new Date();
        const USER_ROLE = 'admin';
        const admin = await prisma.admins.create({
            data: {
                admin_name: organizationName,
                username: username,
                email: email,
                password: hashedPassword,
                role: USER_ROLE,
                created_at: createdAt,
            },
        });

        if (!admin || admin === undefined) {
            return {
                success: false,
                message: 'Failed to insert organization info',
                error: 'Database error! Failed to insert organization info',
            };
        }

        return {
            success: true,
            message: 'Insertion successful!',
            data: admin,
        };
    } catch (error) {
        console.error('An error occured: ', error);
        return {
            success: false,
            message: 'Failed to insert current user',
            error: 'Database error! Insertion failed',
        };
    }
}

export async function getAdminInfo(email: string): Promise<ModelResponse<admins>> {
    try {
        const adminInfo = await prisma.admins.findUnique({
            where: {
                email: email,
            },
        });

        if (!adminInfo || adminInfo === undefined) {
            return {
                success: false,
                message: 'User info does not exists',
            };
        }

        return {
            success: true,
            message: 'Successful query!',
            data: adminInfo,
        };
    } catch (error) {
        console.error(error);
        return {
            success: false,
            message: 'An error occured while querying user email',
            error: `${error}`,
        };
    }
}

export async function getUsername(username: string): Promise<ModelResponse<admins>> {
    try {
        const isUsernameExists = await prisma.admins.findUnique({
            where: {
                username: username,
            },
        });

        if (!isUsernameExists || isUsernameExists === null) {
            return {
                success: false,
                message: 'No user found',
            };
        }

        return {
            success: true,
            message: 'User found',
            data: isUsernameExists,
        };
    } catch (error) {
        console.error('An error occured while querying', error);
        return {
            success: false,
            message: 'Query failed',
            error: `${error}`,
        };
    }
}

export type ApplicationsProps = applications & {
    admins: admins;
    pets: pets;
    users: users;
};

export async function getAllApplications(adminId: number): Promise<ModelResponse<ApplicationsProps[]>> {
    try {
        const applications = await prisma.applications.findMany({
            where: {
                admin_id: adminId,
                application_status: {
                    not: 'approved',
                },
            },
            include: {
                admins: true,
                pets: true,
                users: true,
            },
        });

        return {
            success: true,
            message: 'Successful query!',
            data: applications,
        };
    } catch (error) {
        console.error('An error occured: ', error);
        return {
            success: false,
            message: 'Query failed',
            error: 'Database error, failed to query',
        };
    }
}

type ApplicationStatusProps = {
    applicationId: number;
    applicationStatus: 'applied' | 'pending' | 'approved';
    adoptionDate: Date;
};

export async function updateApplicationStatus({
    applicationId,
    applicationStatus,
    adoptionDate,
}: ApplicationStatusProps): Promise<ModelResponse> {
    try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const data: any = {
            application_status: applicationStatus,
        };
        if (applicationStatus === 'approved') {
            data.adoption_date = adoptionDate;
        }

        const updateApplication = await prisma.applications.update({
            where: {
                application_id: applicationId,
            },
            data,
        });

        if (applicationStatus === 'approved') {
            const petAdoption = await createAdoptedPet(
                updateApplication.user_id,
                updateApplication.pet_id,
                adoptionDate
            );

            if (!petAdoption.success) {
                return {
                    success: false,
                    message: 'Failed to create pet adoption',
                };
            }
            const ADOPTED_STATUS = 'adopted';
            const petStatus = await updatePetStatus(updateApplication.pet_id, ADOPTED_STATUS);

            if (!petStatus.success) {
                return {
                    success: false,
                    message: 'Failed to update pet status',
                };
            }
        }

        if (!updateApplication) {
            return {
                success: false,
                message: 'Failed to update application',
                error: 'Database error',
            };
        }

        return {
            success: true,
            message: 'Updated successfully!',
        };
    } catch (error) {
        console.error('An error occured:', error);
        return {
            success: false,
            message: 'Failed to query',
            error: 'Database error',
        };
    }
}

export async function getAllApplicationsCount(adminId: number): Promise<ModelResponse<number>> {
    try {
        const applications = await prisma.applications.count({
            where: {
                admin_id: adminId,
            },
        });

        return {
            success: true,
            message: 'Successful query',
            data: applications,
        };
    } catch (error) {
        console.error('An error occured: ', error);
        return {
            success: false,
            message: 'Failed to query applications count',
            error: 'Database error',
        };
    }
}

export async function getAllPendingApplicationsCount(adminId: number): Promise<ModelResponse<number>> {
    try {
        const pendingApplications = await prisma.applications.count({
            where: {
                admin_id: adminId,
                application_status: 'pending',
            },
        });

        return {
            success: true,
            message: 'Successful query',
            data: pendingApplications,
        };
    } catch (error) {
        console.error('An error occured: ', error);
        return {
            success: false,
            message: 'Failed to query pending applications count',
            error: 'Database error',
        };
    }
}

export async function getAllApprovedApplications(adminId: number): Promise<ModelResponse<number>> {
    try {
        const pendingApplications = await prisma.applications.count({
            where: {
                admin_id: adminId,
                application_status: 'approved',
            },
        });

        return {
            success: true,
            message: 'Successful query',
            data: pendingApplications,
        };
    } catch (error) {
        console.error('An error occured: ', error);
        return {
            success: false,
            message: 'Failed to query pending applications count',
            error: 'Database error',
        };
    }
}
