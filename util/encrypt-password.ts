import { hash } from "bcryptjs";

export async function encryptPassword(password: string) {
    const hashedPassword = await hash(password, 10);

    return hashedPassword as string;
}