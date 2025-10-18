'use server';
import { ActionResponse } from './response';
import { inserUserApplication, queryUserInfo, queryUserValidId, updateUserInfo } from '@/model/user';
import { pets, users } from '@/app/generated/prisma';
import { getSession } from '@/lib/session';
import { UpdateUserSchema } from '@/lib/auth';
import fs from 'fs';
import path from 'path';

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

export async function getUserValidID(): Promise<ActionResponse> {
    try {
        const userId = await getSession();

        if (!userId || userId.userId === null || userId.userId === undefined) {
            return {
                success: false,
                message: 'No user found',
                error: 'Unauthorized user',
            };
        }

        const validID = await queryUserValidId(userId.userId);

        if (!validID || validID.data === null || validID.data === undefined) {
            return {
                success: false,
                message: 'NO ID found',
            };
        }

        return {
            success: true,
            message: 'Valid ID fetched!',
        };
    } catch (error) {
        console.error('An error occured: ', error);
        return {
            success: false,
            message: 'Failed to fetch user valid ID',
            error: 'Server error',
        };
    }
}

export async function updateUser(formData: FormData): Promise<ActionResponse> {
    try {
        const userId = await getSession();

        if (!userId || userId.userId == null || userId.userId === undefined) {
            return {
                success: false,
                message: 'No user found',
            };
        }
        const imageFile = formData.get('validID') as File | null;
        const data = {
            validID: imageFile,
            firstName: formData.get('firstName') as string,
            lastName: formData.get('lastName') as string,
            username: formData.get('username') as string,
            email: formData.get('email') as string,
            contact: formData.get('contact') as string,
            address: formData.get('address') as string,
            birthday: formData.get('birthday') ? new Date(formData.get('birthday') as string) : null,
        };

        const Validation = UpdateUserSchema.safeParse(data);

        if (!Validation.success) {
            return {
                success: false,
                message: 'Failed to update user',
            };
        }

        if (!imageFile) {
            return {
                success: false,
                message: 'Image is required',
                error: 'No image found',
            };
        }

        const bytes = await imageFile.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const uploadDirectory = process.env.PET_UPLOAD_DIR
            ? path.resolve(process.env.PET_UPLOAD_DIR)
            : path.join(process.cwd(), 'public', 'pets');
        if (!fs.existsSync(uploadDirectory)) fs.mkdirSync(uploadDirectory, { recursive: true });

        const ext = path.extname(imageFile.name);
        const base = path
            .basename(imageFile.name, ext)
            .replace(/[^a-z0-9-_]/gi, '_')
            .toLowerCase();
        const filename = `${base}-${Date.now()}${ext}`;
        const filePath = path.join(uploadDirectory, filename);

        fs.writeFileSync(filePath, buffer);

        const imageURL = uploadDirectory.includes(path.join('public')) ? `/pets/${filename}` : filePath;

        const user = await updateUserInfo({
            userID: userId.userId,
            validID: imageURL,
            firstName: data.firstName,
            lastName: data.lastName,
            username: data.username,
            email: data.email,
            contact: data.contact,
            address: data.address,
            birthday: data.birthday,
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

export async function fetchUserInfo(): Promise<ActionResponse<users>> {
    try {
        const session = await getSession();

        if (!session || session.userId === null || session.userId === undefined) {
            return {
                success: false,
                message: 'No user found',
                error: 'Unauthorized access',
            };
        }

        const userInfo = await queryUserInfo(session.userId);

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
