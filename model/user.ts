import { PrismaClient, users } from '@/app/generated/prisma';
import { ModelResponse } from './response';
import { compare } from 'bcryptjs';
import { encryptPassword } from '@/util/encrypt-password';

const prisma = new PrismaClient();

// Query user info fromm database
export async function getUserInfo(email: string): Promise<ModelResponse<users>> {
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

export async function getUsername(username: string): Promise<ModelResponse<users>> {
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
export async function verifyPassword(password: string, recordedPassword: string): Promise<ModelResponse> {
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
type FosterApplicationProps = {
    userId: number;
    adminId: number;
    petId: number;
    applicationDate: Date;
};

export async function inserUserApplication({
    userId,
    adminId,
    petId,
    applicationDate,
}: FosterApplicationProps): Promise<ModelResponse> {
    try {
        const insertRequest = await prisma.applications.create({
            data: {
                application_date: applicationDate,
                user_id: userId,
                admin_id: adminId,
                pet_id: petId,
            },
        });

        if (!insertRequest) {
            return {
                success: false,
                message: 'Failed to create application',
            };
        }

        return {
            success: true,
            message: 'Created successfully!',
        };
    } catch (error) {
        console.error('An error occured: ', error);
        return {
            success: false,
            message: 'Insertion failed, An error occured',
            error: 'Database error',
        };
    }
}

export async function queryUserValidId(userId: number): Promise<ModelResponse<string>> {
    try {
        const userValidId = await prisma.users.findUnique({
            where: {
                user_id: userId,
            },
        });

        if (!userValidId?.valid_id || userValidId.valid_id === null || userValidId.valid_id === undefined) {
            return {
                success: false,
                message: 'No valid ID',
            };
        }

        return {
            success: true,
            message: 'Query successful',
            data: userValidId.valid_id,
        };
    } catch (error) {
        console.error('An error occured: ', error);
        return {
            success: false,
            message: 'An error occured',
            error: 'Database error',
        };
    }
}

type UserInfo = {
    userID: number;
    validID: string;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    contact: string;
    address: string;
    birthday: Date | null;
};

export async function updateUserInfo(data: UserInfo): Promise<ModelResponse> {
    try {
        const user = await prisma.users.update({
            where: {
                user_id: data.userID,
            },
            data: {
                valid_id: data.validID,
                first_name: data.firstName,
                last_name: data.lastName,
                username: data.username,
                email: data.email,
                contact_number: data.contact,
                address: data.address,
                birthday: data.birthday,
            },
        });

        if (!user) {
            return {
                success: false,
                message: 'Failed to update user data',
            };
        }

        return {
            success: true,
            message: 'Successful update',
        };
    } catch (error) {
        console.error('An error occured', error);
        return {
            success: false,
            message: 'Failed to query',
            error: 'Database error',
        };
    }
}

// Query user info fromm database
export async function queryUserInfo(userId: number): Promise<ModelResponse<users>> {
    try {
        const userInfo = await prisma.users.findUnique({
            where: {
                user_id: userId,
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
