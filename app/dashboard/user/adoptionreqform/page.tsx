'use client';
import { useState } from 'react';

export default function AdoptionRequestForm() {
    const [showPopup, setShowPopup] = useState(false);

   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
       e.preventDefault();
       setShowPopup(true);


   };

    return (
        <div className="min-h-screen bg-[#fffce8] flex flex-col items-center font-poppins relative">
            <header className="w-full bg-white flex justify-between items-center px-10 py-4 shadow-[0_2px_10px_rgba(0,0,0,0.1)]">
                <div className="flex items-center gap-2">
                    <img
                        src="/images/fur_legged_logo.png"
                        alt="Fur Legged Logo"
                        className="w-12 h-12"
                    />
                </div>
                <nav className="flex items-center gap-8 text-[1rem] font-semibold text-[#FED200]">
                    <a href="/" className="hover:text-gray-500 transition">
                        Home
                    </a>
                    <a href="#" className="hover:text-gray-500 transition">
                        About Us
                    </a>
                    <a href="#" className="hover:text-gray-500 transition">
                        Contact Us
                    </a>
                    <a
                        href="/dashboard/user/availablepets"
                        className="hover:text-gray-500 transition"
                    >
                        Available Pets
                    </a>
                    <a href="#" className="hover:text-gray-500 transition">
                        All Pets
                    </a>
                </nav>
                <div>
                    <img
                        src="/images/sample_profile.jpg"
                        alt="User"
                        className="w-10 h-10 rounded-full border border-gray-300"
                    />
                </div>
            </header>

            <main className="flex justify-center items-center flex-grow px-4 py-10">
                <div className="bg-white shadow-[0_4px_20px_rgba(0,0,0,0.2)] rounded-xl p-10 w-200">
                    <h1 className="text-2xl font-extrabold text-center mb-8">
                        ADOPTION REQUEST FORM
                    </h1>

                    <form
                        className="flex flex-col gap-5"
                        onSubmit={handleSubmit}
                    >
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
                        <a
                            href="/dashboard/user/petpage"
                            className="border border-black text-center text-black font-semibold py-3 rounded-full hover:bg-gray-100 transition"
                        >
                            Cancel
                        </a>
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
                        <h2 className="text-3xl font-extrabold text-[#FED200] mb-4">
                            THANK YOU!
                        </h2>
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
