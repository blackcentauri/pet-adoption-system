'use client';
import { Form, FormError, FormGroup, FormLabel } from '@/components/Form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { adminSignUp } from '@/server/auth';
import { ActionResponse } from '@/server/response';
import { Loader2Icon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useActionState } from 'react';

const initialState: ActionResponse = {
    success: false,
    message: '',
    error: '',
};

export default function OrganizationSignUp() {
    const router = useRouter();

    const handleSubmit = async (
        prevState: ActionResponse,
        formData: FormData
    ) => {
        try {
            const result = await adminSignUp(formData);

            if (result.success) {
                router.push('/dashboard/admin');
            }

            return result;
        } catch (error) {
            console.error('An error occured', error);
            return {
                success: false,
                message: 'Failed to authenticate',
                error: 'An error occured while authenticating',
            };
        }
    };
    const [state, formAction, isPending] = useActionState<
        ActionResponse,
        FormData
    >(handleSubmit, initialState);
    return (
        <div className="bg-mute h-screen p-6 grid justify-center items-center">
            <main className=" bg-background grid grid-cols-2 p-3 rounded-md shadow-md max-w-[800px] w-[70vw]">
                <div className="bg-background grid justify-center items-center p-5">
                    <Image
                        src={'/favicon.png'}
                        alt="Fur legged logo"
                        width={250}
                        height={250}
                    />
                </div>
                <div className=" bg-background grid  p-5">
                    <Form action={formAction} className="flex flex-col gap-3">
                        <h1 className="font-poppins font-medium text-xl text-center py-2 border-2 border-white border-b-primary ">
                            Create your account
                        </h1>
                        <FormError className="text-red-600">
                            {state.errors ? state.errors[0] : ''}
                            {state.message}
                        </FormError>
                        <FormGroup className="flex flex-col gap-2 w-full">
                            <FormLabel className="text-[0.9rem]">
                                Organization name
                            </FormLabel>
                            <Input
                                id="organizationName"
                                name="organizationName"
                                type="text"
                                placeholder="Enter organization name"
                                required
                            />
                        </FormGroup>
                        <FormGroup className="flex flex-col gap-2">
                            <FormLabel className="text-[0.9rem]">
                                Organization username
                            </FormLabel>
                            <Input
                                id="username"
                                name="username"
                                type="text"
                                placeholder="Enter username"
                                required
                            />
                        </FormGroup>
                        <FormGroup className="flex flex-col gap-2">
                            <FormLabel className="text-[0.9rem]">
                                Email
                            </FormLabel>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="Enter email"
                                required
                            />
                        </FormGroup>
                        <FormGroup className="flex flex-col gap-2">
                            <FormLabel className="text-[0.9rem]">
                                Password
                            </FormLabel>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                placeholder="Enter password"
                                required
                            />
                        </FormGroup>
                        <FormGroup className="flex flex-col gap-2">
                            <FormLabel className="text-[0.9rem]">
                                Confirm Password
                            </FormLabel>
                            <Input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                placeholder="Confirm password"
                                required
                            />
                        </FormGroup>
                        <FormGroup className="flex flex-col gap-2 justify-center">
                            <Button
                                disabled={isPending}
                                className="w-full font-poppins font-medium text-md py-5"
                            >
                                {isPending ? (
                                    <Loader2Icon className="animate-spin" />
                                ) : (
                                    <>Sign up</>
                                )}
                            </Button>
                            <div>
                                <p className="text-[0.9rem] text-center">
                                    Already have an account?{' '}
                                    <Link
                                        href={'/signin'}
                                        className="text-primary"
                                    >
                                        Sign in
                                    </Link>{' '}
                                    instead
                                </p>
                            </div>
                        </FormGroup>
                    </Form>
                </div>
            </main>
        </div>
    );
}
