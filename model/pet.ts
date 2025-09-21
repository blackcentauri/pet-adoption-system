import { pets, PrismaClient } from "@/app/generated/prisma";
import { ModelResponse } from "./response";
const prisma = new PrismaClient();


// Get all not adopted pets
export async function getAllAvailablePets(): Promise<ModelResponse<pets[]>> {
    try {
        const pets = await prisma.pets.findMany({
            where: {
                pet_status: 'not_adopted'
            }
        })

        if (!pets || pets === null) {
            return {
                success: false,
                message: 'No pets found'
            }
        }
        return {
            success: true,
            message: 'Query successful!',
            data: pets
        }
    } catch (error) {
        console.error(error);
        return {
            success: false,
            message: 'Query failed! An error occured',
            error: `${error}`
        }
    }
}