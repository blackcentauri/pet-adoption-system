'use client';

import { users } from '@/app/generated/prisma';
import { Form, FormError, FormGroup, FormLabel } from '@/components/Form';
import { Input } from '@/components/ui/input';
import { deleteCurrentSession } from '@/server/admin';
import { ActionResponse } from '@/server/response';
import { fetchUserInfo, updateUser } from '@/server/user';
import { useQuery } from '@tanstack/react-query';
import { Ban, CircleCheck, Loader2Icon } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useActionState, useState } from 'react';
import { toast } from 'sonner';

const initialState: ActionResponse = {
    success: false,
    message: '',
    error: '',
};
export default function EditProfilePage() {
    const [open, setOpen] = useState(true);
    const [userInfo, setUserInfo] = useState<users>();
    const router = useRouter();

    const { data } = useQuery({
        queryKey: ['user-profile'],
        queryFn: () =>
            fetchUserInfo().then((response) => {
                if (!response.data == undefined || !response.data === null) {
                    setUserInfo(response.data);
                }

                return response.data;
            }),
    });
    const handleSubmit = async (prevState: ActionResponse, form: FormData): Promise<ActionResponse> => {
        try {
            const result = await updateUser(form);

            if (result.success) {
                toast('Updated successfully!');
                router.push('/dashboard/user');
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
    const birthdayValue = data?.birthday != null ? new Date(data.birthday).toISOString().split('T')[0] : '';

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
                            src="/images/user_avatar.png"
                            alt="User avatar"
                            height={60}
                            width={60}
                            className="w-32 h-32 rounded-full object-cover"
                        />
                    </div>

                    <FormGroup className="grid gap-3">
                        <FormLabel className="text-center flex items-center gap-3">
                            <span>VALID ID</span>
                            {data?.valid_id ? (
                                <CircleCheck className="text-green-400" />
                            ) : (
                                <Ban className="text-red-500" />
                            )}
                        </FormLabel>
                        <Input
                            id="validID"
                            name="validID"
                            type="file"
                            accept="image/*"
                            disabled={data?.valid_id ? true : false}
                            className="w-full px-3 py-2 border rounded-lg"
                            placeholder={data?.valid_id ?? ''}
                        />
                    </FormGroup>
                </div>

                <div className="md:w-2/3">
                    <h2 className="text-lg font-semibold mb-4">Profile Information</h2>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm mb-1">First Name:</label>
                            <Input
                                id="firstName"
                                name="firstName"
                                type="text"
                                required
                                placeholder="Enter First Name"
                                disabled={open}
                                className="w-full px-3 py-2 border rounded-lg"
                                defaultValue={data?.first_name ?? ''}
                            />
                        </div>
                        <div>
                            <label className="block text-sm mb-1">Last Name:</label>
                            <Input
                                id="lastName"
                                name="lastName"
                                type="text"
                                required
                                disabled={open}
                                placeholder="Enter Last Name"
                                className="w-full px-3 py-2 border rounded-lg"
                                defaultValue={data?.last_name ?? ''}
                            />
                        </div>
                        <div>
                            <label className="block text-sm mb-1">Username:</label>
                            <Input
                                id="username"
                                name="username"
                                type="text"
                                disabled={open}
                                placeholder="Enter New Username"
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
                        <FormGroup>
                            <FormLabel className="block text-sm mb-1">Contact No.</FormLabel>
                            <Input
                                id="contact"
                                name="contact"
                                type="text"
                                disabled={open}
                                placeholder="Contact Number"
                                defaultValue={data?.contact_number ?? ''}
                            />
                        </FormGroup>
                        <FormGroup>
                            <FormLabel className="block text-sm mb-1">Address</FormLabel>
                            <Input
                                id="address"
                                name="address"
                                type="text"
                                disabled={open}
                                placeholder="Address"
                                defaultValue={data?.address ?? ''}
                            />
                        </FormGroup>
                        <FormGroup>
                            <FormLabel className="block text-sm mb-1">Birthday</FormLabel>
                            <Input
                                id="birthday"
                                name="birthday"
                                type="date"
                                disabled={open}
                                placeholder="Birthday"
                                defaultValue={birthdayValue}
                            />
                        </FormGroup>
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
                        <button
                            type="button"
                            disabled={isPending}
                            onClick={async () => {
                                const session = await deleteCurrentSession();

                                if (session.success) {
                                    router.replace('/');
                                }

                                router.replace('/');
                            }}
                            className="bg-red-400 hover:bg-red-500 text-white px-6 py-2 rounded-lg font-medium"
                        >
                            {isPending ? <Loader2Icon className="animate-spin" /> : 'Log Out'}
                        </button>
                    </div>
                </div>
            </Form>
        </div>
    );
}
