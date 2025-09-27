'use client';
import { signIn } from '@/server/auth';
import { ActionResponse } from '@/server/response';
import { useActionState } from 'react';
import { useRouter } from 'next/navigation';
import { Form, FormError, FormGroup, FormLabel } from '@/components/Form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

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
                router.push('/dashboard/user');
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
        <div className="bg-mute h-screen p-6 grid justify-center items-center">
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
                <FormGroup className="flex flex-col gap-2 items-center">
                    <Button
                        disabled={isPending}
                        className="w-full font-poppins font-medium text-md py-5"
                    >
                        Log in
                    </Button>
                    <div>
                        <p>
                            Don&apos;t have an account?{' '}
                            <Link
                                href={'/user/signup'}
                                className="text-primary"
                            >
                                Sign up
                            </Link>{' '}
                            instead
                        </p>
                    </div>
                </FormGroup>
            </Form>
        </div>
    );
}
