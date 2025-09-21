import { PrismaClient, users } from "@/app/generated/prisma";
import { ModelResponse } from "./response";
import { compare } from "bcryptjs";
import { cache } from "react";
import { encryptPassword } from "@/util/encrypt-password";

const prisma = new PrismaClient();

// Query user info fromm database
export async function getUserInfo(email: string): Promise<ModelResponse<users>> {
    try {
        const userInfo = await prisma.users.findUnique({
            where: {
                email
            }
        });

        if (!userInfo || userInfo === null) {
            return {
                success: false,
                message: 'User info does not exists'
            }
        }

        return {
            success: true,
            message: 'Successful query!',
            data: userInfo
        }
    } catch (error) {
        console.error(error);
        return {
            success: false,
            message: 'An error occured while querying user email',
            error: `${error}`
        }
    }
}

// Inser user info to database
export async function insertUser(firstName: string, lastName: string, username: string, email: string, password: string): Promise<ModelResponse> {{
    try {
        const hashedPassword = await encryptPassword(password);
        const user = await prisma.users.create({
            data: {
                first_name: firstName,
                last_name: lastName,
                username: username,
                email: email,
                password: hashedPassword
            }
        });

        if (!user) {
            return {
                success: false,
                message: 'Failed to insert user',
            }
        }

        return {
            success: true,
            message: 'User inserted successfully!'
        }
    } catch (error) {
        console.error(error);
        return {
            success: false,
            message: 'An error occured while inserting user data'
        }
    }
}}


// Verifiy password
export async function verifyPassword(password: string, recordedPassword: string): Promise<ModelResponse> {
    try {
        const isPasswordValid = await compare(password, recordedPassword);

        if (!isPasswordValid) {
            return {
                success: false,
                message: 'Invalid password'
            }
        }

        return {
            success: true,
            message: 'Password verified!'
        }
    } catch (error) {
        console.error(error);
        return {
            success: false,
            message: 'Verification failed! An error occured',
            error: `${error}`
        }
    }
}