'use client';

import { admins } from '@/app/generated/prisma';
import { Form, FormError } from '@/components/Form';
import { Input } from '@/components/ui/input';
import { fetchAdminInfo, updateAdmin } from '@/server/admin';
import { ActionResponse } from '@/server/response';
import { useQuery } from '@tanstack/react-query';
import { Loader2Icon } from 'lucide-react';
import Image from 'next/image';
import { useActionState, useState } from 'react';
import { toast } from 'sonner';

const initialState: ActionResponse = {
    success: false,
    message: '',
    error: '',
};
export default function AdminProfilePage() {
    const [open, setOpen] = useState(true);
    const [userInfo, setUserInfo] = useState<admins>();

    const { data } = useQuery({
        queryKey: ['admin-profile'],
        queryFn: () =>
            fetchAdminInfo().then((response) => {
                if (!response.data == undefined || !response.data === null) {
                    setUserInfo(response.data);
                }

                return response.data;
            }),
    });
    const handleSubmit = async (prevState: ActionResponse, form: FormData): Promise<ActionResponse> => {
        try {
            const result = await updateAdmin(form);

            if (result.success) {
                toast('Updated successfully!');
            }

            return result;
        } catch (error) {
            console.error('An error occurred:', error);
            return {
                success: false,
                message: 'Failed to authenticate',
                error: 'An error occurred while authenticating',
            };
        }
    };

    const [state, formAction, isPending] = useActionState<ActionResponse, FormData>(handleSubmit, initialState);

    return (
        <div className="h-screen w-full bg-[#fffce8] flex flex-col items-center p-6 font-poppins ">
            <div className="mb-6 flex flex-col items-center">
                <Image src="/images/fur_legged_logo.png" alt="Fur Legged" height={50} width={50} />
            </div>
            <FormError>{state.message}</FormError>

            <Form
                className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl p-8 flex flex-col md:flex-row gap-6"
                action={formAction}
            >
                <div className="md:w-1/3 flex flex-col items-center border-r border-gray-200 pr-6">
                    <h2 className="text-lg font-semibold mb-4">Account Management</h2>

                    <div className="relative mb-4">
                        <Image
                            src="/images/admin_avatar.png"
                            alt="User avatar"
                            height={60}
                            width={60}
                            className="w-32 h-32 rounded-full object-cover"
                        />
                    </div>
                </div>

                <div className="md:w-2/3">
                    <h2 className="text-lg font-semibold mb-4">Profile Information</h2>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm mb-1">First Name:</label>
                            <Input
                                id="adminName"
                                name="adminName"
                                type="text"
                                required
                                placeholder="Enter organization name"
                                disabled={open}
                                className="w-full px-3 py-2 border rounded-lg"
                                defaultValue={data?.admin_name ?? ''}
                            />
                        </div>
                        <div>
                            <label className="block text-sm mb-1">Username:</label>
                            <Input
                                id="username"
                                name="username"
                                type="text"
                                required
                                disabled={open}
                                placeholder="Enter username"
                                className="w-full px-3 py-2 border rounded-lg"
                                defaultValue={data?.username ?? ''}
                            />
                        </div>

                        <div>
                            <label className="block text-sm mb-1">Email:</label>
                            <Input
                                id="email"
                                type="email"
                                name="email"
                                disabled={open}
                                placeholder="Enter New Email"
                                className="w-full px-3 py-2 border rounded-lg"
                                defaultValue={data?.email ?? ''}
                            />
                        </div>
                    </div>

                    <div className="mt-6 flex gap-4 justify-end">
                        <button
                            type="submit"
                            disabled={isPending}
                            className="bg-yellow-400 hover:bg-yellow-500 text-white px-6 py-2 rounded-lg font-medium"
                        >
                            {isPending ? <Loader2Icon className="animate-spin" /> : 'Save'}
                        </button>
                        <button
                            type="button"
                            disabled={isPending}
                            onClick={() => setOpen(!open)}
                            className="bg-blue-400 hover:bg-blue-500 text-white px-6 py-2 rounded-lg font-medium"
                        >
                            {isPending ? <Loader2Icon className="animate-spin" /> : 'Edit'}
                        </button>
                    </div>
                </div>
            </Form>
        </div>
    );
}
