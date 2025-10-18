import * as z from 'zod';
import { deleteSession } from './session';
export const SignInSchema = z.object({
    email: z.string().min(1, 'Username or email is required').email('Invalid email address'),
    password: z.string().min(1, 'Password is required'),
});

export const UserSignUpSchema = z
    .object({
        firstName: z.string().min(1, 'First name is required'),
        lastName: z.string().min(1, 'Last name is required'),
        username: z.string().min(1, 'Username is required'),
        email: z.string().min(1, 'Email is required').check(z.email('Invalid email address')),
        password: z.string().min(8, 'Password is required. Minimum of 8 characters'),
        confirmPassword: z.string().min(1, 'Please confirm your password'),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Password do not match',
        path: ['confirmPassword'],
    });

export const AdminSignUpSchema = z
    .object({
        organizationName: z.string().min(1, 'Organization name is required'),
        username: z.string().min(1, 'Organization username is required'),
        email: z.string().min(1, 'Email is required').email('Invalid email address'),
        password: z.string().min(8, 'Password should be at least 8 characters'),
        confirmPassword: z.string().min(1, 'Please confirm your password'),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Password do not match',
    });

export const UpdateUserSchema = z.object({
    validID: z.file(),
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    username: z.string().min(1, 'Username is required'),
    email: z.string().min(1, 'Email is required').email('Invalid email'),
    contact: z.string(),
    address: z.string(),
    birthday: z.date(),
});

export const UpdateAdminSchema = z.object({
    adminName: z.string().min(1, 'Last name is required'),
    username: z.string().min(1, 'Username is required'),
    email: z.string().min(1, 'Email is required').email('Invalid email'),
});

export const logOutSession = async () => {
    try {
        const session = await deleteSession();

        if (!session) {
            return false;
        }

        return true;
    } catch (error) {
        console.error('An error occured: ', error);
    }
};
export type SignInValidation = z.infer<typeof SignInSchema>;
export type UserSignUpValidation = z.infer<typeof UserSignUpSchema>;
export type AdminSignUpValidation = z.infer<typeof AdminSignUpSchema>;
export type UserUpdateValidation = z.infer<typeof UserSignUpSchema>;
export type AdminUpdateValidation = z.infer<typeof UpdateAdminSchema>;
