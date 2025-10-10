import { admins, PrismaClient } from '@/app/generated/prisma';
import { ModelResponse } from './response';
import { encryptPassword } from '@/util/encrypt-password';

const prisma = new PrismaClient();

export async function getOrganizationInfo(
    email: string
): Promise<ModelResponse<admins>> {
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

export async function getAdminInfo(
    email: string
): Promise<ModelResponse<admins>> {
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

export async function getUsername(
    username: string
): Promise<ModelResponse<admins>> {
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
