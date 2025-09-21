import { organizations, PrismaClient } from "@/app/generated/prisma";
import { ModelResponse } from "./response";
import { encryptPassword } from "@/util/encrypt-password";

const prisma = new PrismaClient();

type OrganizationProps = {
    organizationName: string;
    organizationUsername: string;
    orgaanizationEmail: string;
    organizationPassword: string;
}

// Get organization info
export async function getOrganizationInfo(id: number): Promise<ModelResponse<organizations>> {
    try {
        const organizationInfo = await prisma.organizations.findUnique({
            where: {
                organization_id: id
            }
        });

        if (!organizationInfo) {
            return {
                success: false,
                message: 'No organization found'
            }
        }

        return {
            success: true,
            message: 'Query successful!',
            data: organizationInfo
        }
    } catch (error) {
        console.error(error);
        return {
            success: false,
            message: 'Query failed! An error occured while querying',
            error: `${error}`
        }
    }
}

// Insert organization info
export async function insertOrganization({organizationName, organizationUsername, orgaanizationEmail, organizationPassword}: OrganizationProps): Promise<ModelResponse> {
    try {
        const hashedPassword = await encryptPassword(organizationPassword);
        const organization = await prisma.organizations.create({
            data: {
                organization_name: organizationName,
                organization_username: organizationUsername,
                organization_email: orgaanizationEmail,
                organization_password: hashedPassword
            }
        });

        if (!organization) {
            return {
                success: false,
                message: 'Insertion failed!',
            }
        }
        return {
            success: true,
            message: 'Inserted successfully!'
        }
    } catch (error) {
        console.error(error);
        return {
            success: false,
            message: 'Insertion failed! An error occured',
            error: `${error}`
        }
    }
}