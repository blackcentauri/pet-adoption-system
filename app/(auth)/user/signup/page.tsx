'use client';

import { useActionState } from 'react';
import { useRouter } from 'next/navigation';
import { userSignUp } from '@/server/auth';
import { ActionResponse } from '@/server/response';
import { Loader2Icon } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const initialState: ActionResponse = {
    success: false,
    message: '',
    error: '',
};

export default function SignupPage() {
    const router = useRouter();

    // handle form input changes

    // async submit handler using useActionState
    const handleSubmit = async (prevState: ActionResponse, form: FormData): Promise<ActionResponse> => {
        try {
            const result = await userSignUp(form);

            if (result.success) {
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

    const [state, formAction, isPending] = useActionState<ActionResponse, FormData>(handleSubmit, initialState);

    return (
        <div
            className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center font-poppins"
            style={{ backgroundImage: "url('/images/signup_bg.jpg')" }}
        >
            <div className="mb-6 flex flex-col items-center">
                <Image
                    src="/images/fur_legged_logo.png"
                    alt="Fur Legged"
                    className="w-20 h-20"
                    width={48}
                    height={48}
                />
            </div>

            {/* Card */}
            <div className="bg-white rounded-2xl shadow-md w-full max-w-md p-8">
                <h1 className="text-2xl font-semibold text-center mb-6">Create an account</h1>

                {/* Error Display */}
                {state.error && <p className="text-red-600 text-center mb-4">{state.error}</p>}
                {state.message && !state.success && <p className="text-red-600 text-center mb-4">{state.message}</p>}

                {/* Form */}
                <form action={formAction} className="space-y-4">
                    <input
                        id="firstName"
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        required
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    />
                    <input
                        id="lastName"
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        required
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    />
                    <input
                        id="username"
                        type="text"
                        name="username"
                        placeholder="Username"
                        required
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    />
                    <input
                        id="email"
                        type="email"
                        name="email"
                        placeholder="Email"
                        required
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    />
                    <input
                        id="password"
                        type="password"
                        name="password"
                        placeholder="Password"
                        required
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    />
                    <input
                        id="confirmPassword"
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        required
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    />

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isPending}
                        className="w-full py-3 bg-yellow-400 text-white font-medium rounded-lg hover:bg-yellow-500 transition flex justify-center items-center"
                    >
                        {isPending ? <Loader2Icon className="animate-spin" /> : 'Create account'}
                    </button>

                    {/* Sign in redirect */}
                    <p className="text-sm text-center mt-3">
                        Are you an organization?{' '}
                        <Link href="/dashboard/signup" className="text-yellow-500">
                            Sign up {' '}
                        </Link>
                        here instead
                    </p>
                </form>
            </div>
        </div>
    );
}
