'use client';
import Link from 'next/link';
import { useState } from 'react';

export default function AdoptionRequestForm() {
    const [showPopup, setShowPopup] = useState(false);

    return (
        <div className="min-h-screen bg-[#fffce8] flex flex-col items-center font-poppins relative">
            <main className="flex justify-center items-center flex-grow px-4 py-10">
                <div className="bg-white shadow-[0_4px_20px_rgba(0,0,0,0.2)] rounded-xl p-10 w-200">
                    <h1 className="text-2xl font-extrabold text-center mb-8">ADOPTION REQUEST FORM</h1>

                    <form className="flex flex-col gap-5">
                        <input
                            type="text"
                            value="BINGO (AUTO-FILLED. NOT EDITABLE)"
                            disabled
                            className="w-full px-4 py-3 border border-gray-300 rounded-md text-gray-500 bg-gray-100 cursor-not-allowed"
                        />
                        <input
                            type="text"
                            placeholder="Foster’s name"
                            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        />
                        <input
                            type="text"
                            placeholder="Contact Number"
                            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        />
                        <input
                            type="date"
                            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        />

                        <button
                            type="submit"
                            className="bg-black text-white text-center font-semibold py-3 rounded-full hover:opacity-90 transition"
                        >
                            Submit
                        </button>
                        <Link
                            href="/dashboard/user/petpage"
                            className="border border-black text-center text-black font-semibold py-3 rounded-full hover:bg-gray-100 transition"
                        >
                            Cancel
                        </Link>
                    </form>
                </div>
            </main>

            {showPopup && (
                <div className="fixed inset-0 bg-[#fffce8]/60 flex justify-center items-center z-50">
                    <div className="bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.15)] p-10 text-center w-[90%] max-w-md relative">
                        <button
                            className="absolute top-3 right-4 text-gray-500 hover:text-black text-xl"
                            onClick={() => setShowPopup(false)}
                        >
                            ×
                        </button>
                        <h2 className="text-3xl font-extrabold text-[#FED200] mb-4">THANK YOU!</h2>
                        <p className="text-gray-600 font-medium">
                            YOUR ADOPTION REQUEST HAS BEEN RECEIVED.
                            <br />
                            WE’LL GET IN TOUCH WITH YOU SOON.
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}
