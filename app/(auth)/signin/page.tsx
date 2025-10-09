'use client';
import { signIn } from '@/server/auth';
import { ActionResponse } from '@/server/response';
import { useActionState } from 'react';
import { redirect, useRouter } from 'next/navigation';
import { Form, FormError, FormGroup, FormLabel } from '@/components/Form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { Loader2Icon } from 'lucide-react';

const initialState: ActionResponse = {
    success: false,
    message: '',
    error: '',
};

export default function SignInPage() {
    const router = useRouter();
    const handleSubmit = async (
        prevState: ActionResponse,
        formData: FormData
    ) => {
        try {
            const result = await signIn(formData);

            if (result.success) {
                const response = await fetch('/api/session', {
                    method: 'POST',
                });

                if (!response.ok) {
                    return {
                        success: false,
                        message: 'No session found',
                    };
                }

                const data = await response.json();

                if (data.data === null) {
                    redirect('/signin');
                }

                if (data.data.role === 'admin') {
                    router.push('/dashboard/admin');
                }

                if (data.data.role === 'user') {
                    router.push('/dashboard/user');
                }
            }

            return result;
        } catch (error) {
            console.error('An error occured:', error);
            return {
                success: false,
                message: 'Failed to sign in',
                error: 'An error occured while sigining you in',
            };
        }
    };
    const [state, formAction, isPending] = useActionState<
        ActionResponse,
        FormData
    >(handleSubmit, initialState);
    return (
        <div
            className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center font-poppins"
            style={{ backgroundImage: "url('/images/signup_bg.jpg')" }}
        >
            <Form
                action={formAction}
                className="bg-card rounded-2xl p-[2rem] w-md h-fit shadow-md grid gap-5"
            >
                <Image
                    src={'/favicon.png'}
                    width={80}
                    height={80}
                    alt="Fur legged logo"
                    className="justify-self-center"
                />
                <h1 className="font-poppins text-xl text-center">
                    Log in to your account
                </h1>
                <FormError className="text-red-600">
                    {state.errors ? state.errors[0] : ''} {state.message}
                </FormError>
                <FormGroup className="flex flex-col gap-2">
                    <FormLabel>Email</FormLabel>
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Enter email"
                        className="rounded-md px-4 py-3 font-poppins"
                        required
                    />
                </FormGroup>
                <FormGroup className="flex flex-col gap-2">
                    <FormLabel>Password</FormLabel>
                    <Input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Enter password"
                        className="rounded-md px-4 py-3 font-poppins"
                        required
                    />
                </FormGroup>
                <FormGroup className="flex flex-col gap-3 items-center">
                    <Button
                        disabled={isPending}
                        className="w-full font-poppins font-medium text-md py-5"
                    >
                        {isPending ? (
                            <Loader2Icon className="animate-spin" />
                        ) : (
                            <>Log in</>
                        )}
                    </Button>
                    <div>
                        <p className="text-[0.9rem]">
                            Don&apos;t have an account?{' '}
                            <Link
                                href={'/user/signup'}
                                className="text-primary font-medium"
                            >
                                Sign up
                            </Link>{' '}
                            instead
                        </p>
                    </div>
                    <div>or</div>
                    <div>
                        <p className="text-[0.9rem]">
                            Are you an organization?{' '}
                            <Link
                                href={'/organization/signup'}
                                className="text-primary font-medium"
                            >
                                Sign up
                            </Link>{' '}
                            here
                        </p>
                    </div>
                </FormGroup>
            </Form>
        </div>
    );
}
