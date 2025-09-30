import { PrismaClient, users } from '@/app/generated/prisma';
import { ModelResponse } from './response';
import { compare, hash } from 'bcryptjs';
import { encryptPassword } from '@/util/encrypt-password';

const prisma = new PrismaClient();

// Query user info fromm database
export async function getUserInfo(
    email: string
): Promise<ModelResponse<users>> {
    try {
        const userInfo = await prisma.users.findUnique({
            where: {
                email: email,
            },
        });

        if (!userInfo || userInfo === undefined) {
            return {
                success: false,
                message: 'User info does not exists',
            };
        }

        return {
            success: true,
            message: 'Successful query!',
            data: userInfo,
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
): Promise<ModelResponse<users>> {
    try {
        const isUsernameExists = await prisma.users.findUnique({
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

// Inser user info to database
export async function insertUser(
    firstName: string,
    lastName: string,
    username: string,
    email: string,
    password: string
): Promise<ModelResponse<users>> {
    {
        try {
            const hashedPassword = await encryptPassword(password);
            const accountCreated = new Date();
            const USER_ROLE = 'user';
            const user = await prisma.users.create({
                data: {
                    first_name: firstName,
                    last_name: lastName,
                    username: username,
                    email: email,
                    password: hashedPassword,
                    created_at: accountCreated,
                    role: USER_ROLE,
                },
            });

            if (!user) {
                return {
                    success: false,
                    message: 'Failed to insert user',
                };
            }

            return {
                success: true,
                message: 'User inserted successfully!',
                data: user,
            };
        } catch (error) {
            console.error(error);
            return {
                success: false,
                message: 'An error occured while inserting user data',
            };
        }
    }
}

// Verifiy password
export async function verifyPassword(
    password: string,
    recordedPassword: string
): Promise<ModelResponse> {
    try {
        const isPasswordValid = await compare(password, recordedPassword);

        if (!isPasswordValid) {
            return {
                success: false,
                message: 'Invalid password',
            };
        }

        return {
            success: true,
            message: 'Password verified!',
        };
    } catch (error) {
        console.error(error);
        return {
            success: false,
            message: 'Verification failed! An error occured',
            error: `${error}`,
        };
    }
}

export async function getOrganizationInfo(
    email: string
): Promise<ModelResponse<users>> {
    try {
        const organizationInfo = await prisma.users.findUnique({
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
}: OrganizationProps): Promise<ModelResponse<users>> {
    try {
        const hashedPassword = await encryptPassword(password);
        const createdAt = new Date();
        const USER_ROLE = 'admin';
        const organization = await prisma.users.create({
            data: {
                organization_name: organizationName,
                username: username,
                email: email,
                password: hashedPassword,
                role: USER_ROLE,
                created_at: createdAt,
            },
        });

        if (!organization || organization === undefined) {
            return {
                success: false,
                message: 'Failed to insert organization info',
                error: 'Database error! Failed to insert organization info',
            };
        }

        return {
            success: true,
            message: 'Insertion successful!',
            data: organization,
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
