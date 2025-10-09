'use client';

import { UploadIcon } from 'lucide-react';

export default function EditProfilePage() {
    return (
        <div className="h-screen w-full bg-[#fffce8] flex flex-col items-center p-6 font-poppins ">
            <div className="mb-6 flex flex-col items-center">
                <img
                    src="/images/fur_legged_logo.png"
                    alt="Fur Legged"
                    className="w-15 h-15"
                />
            </div>

            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl p-8 flex flex-col md:flex-row gap-6">
                <div className="md:w-1/3 flex flex-col items-center border-r border-gray-200 pr-6">
                    <h2 className="text-lg font-semibold mb-4">
                        Account Management
                    </h2>

                    <div className="relative mb-4">
                        <img
                            src="/images/sample_profile.jpg"
                            alt="Profile"
                            className="w-32 h-32 rounded-full object-cover"
                        />
                    </div>

                    <button
                        type="button"
                        className="flex items-center gap-2 border rounded-full px-4 py-2 text-sm hover:bg-gray-50"
                    >
                        <UploadIcon size={16} />
                        Upload Image
                    </button>

                    <div className="w-full mt-6">
                        <label className="block text-sm mb-1">Password:</label>
                        <input
                            id="password"
                            type="password"
                            placeholder="Enter Password"
                            className="w-full px-3 py-2 border rounded-lg"
                        />

                        <label className="block text-sm mt-3 mb-1">
                            New Password:
                        </label>
                        <input
                            id="password"
                            type="password"
                            placeholder="Enter New Password"
                            className="w-full px-3 py-2 border rounded-lg"
                        />

                        <button
                            type="button"
                            className="w-full mt-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition"
                        >
                            Change Password
                        </button>
                    </div>
                </div>

                <div className="md:w-2/3">
                    <h2 className="text-lg font-semibold mb-4">
                        Profile Information
                    </h2>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm mb-1">
                                First Name:
                            </label>
                            <input
                                id="firstName"
                                type="text"
                                placeholder="Enter First Name"
                                className="w-full px-3 py-2 border rounded-lg"
                            />
                        </div>
                        <div>
                            <label className="block text-sm mb-1">
                                Last Name:
                            </label>
                            <input
                                id="lastName"
                                type="text"
                                placeholder="Enter Last Name"
                                className="w-full px-3 py-2 border rounded-lg"
                            />
                        </div>
                        <div>
                            <label className="block text-sm mb-1">
                                Username:
                            </label>
                            <input
                                id="username"
                                type="text"
                                placeholder="Enter New Username"
                                className="w-full px-3 py-2 border rounded-lg"
                            />
                        </div>
                        <div>
                            <label className="block text-sm mb-1">Email:</label>
                            <input
                                id="email"
                                type="email"
                                placeholder="Enter New Email"
                                className="w-full px-3 py-2 border rounded-lg"
                            />
                        </div>
                        <div className="col-span-2">
                            <label className="block text-sm mb-1">
                                Contact Number:
                            </label>
                            <input
                                type="text"
                                placeholder="Enter New Contact Number"
                                className="w-full px-3 py-2 border rounded-lg"
                            />
                        </div>
                    </div>

                    <div className="mt-6 flex justify-end">
                        <button
                            type="button"
                            className="bg-yellow-400 hover:bg-yellow-500 text-white px-6 py-2 rounded-lg font-medium"
                        >
                            Save changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
