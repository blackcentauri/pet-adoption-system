'use client';

import Image from 'next/image';


const samplePets = [
    {
        pet_id: 1,
        pet_name: 'THORMUND',
        pet_species: 'DOG',
        pet_age: '4 MONTHS',
        pet_breed: 'ASPIN (ASONG PINOY)',
        pet_status: 'AVAILABLE',
        pet_image: '/images/pet1.jpg',
    },
    {
        pet_id: 2,
        pet_name: 'LORNA',
        pet_species: 'CAT',
        pet_age: '2 YEARS OLD',
        pet_breed: 'DOMESTIC SHORTHAIR',
        pet_status: 'AVAILABLE',
        pet_image: '/images/pet2.jpg',
    },
    {
        pet_id: 3,
        pet_name: 'BINGO',
        pet_species: 'DOG',
        pet_age: '1 YEAR OLD',
        pet_breed: 'LABRADOR RETRIEVER',
        pet_status: 'AVAILABLE',
        pet_image: '/images/pet3.jpg',
    },
    {
        pet_id: 4,
        pet_name: 'AGIE',
        pet_species: 'DOG',
        pet_age: '2 MONTHS OLD',
        pet_breed: 'ASPIN (ASONG PINOY)',
        pet_status: 'AVAILABLE',
        pet_image: '/images/pet4.jpg',
    },
];

export default function AvailablePetsPage() {
    return (
        <div
            className="min-h-screen bg-[#FFFCEB] flex flex-col items-center font-poppins 
"
        >
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
                        href="/dashboard/availablepets"
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

            <h1 className="text-2xl font-semibold text-[#F7B500] mt-10 mb-10 text-left w-full max-w-6xl font-poppins">
                START YOUR ADOPTION JOURNEY
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 justify-items-center max-w-6xl w-full mb-20">
                {samplePets.map((pet) => (
                    <div
                        key={pet.pet_id}
                        className="bg-white rounded-2xl shadow-lg overflow-hidden w-64 transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl"
                    >
                        <div className="relative w-full h-56">
                            <Image
                                src={pet.pet_image}
                                alt={pet.pet_name}
                                fill
                                className="object-cover"
                            />
                        </div>

                        <div className="p-5 text-center">
                            <h2 className="font-bold text-[#F7B500] text-lg mb-1 font-poppins">
                                {pet.pet_name}
                            </h2>
                            <p className="uppercase text-sm text-gray-500 font-poppins">
                                {pet.pet_species}
                            </p>

                            <hr className="my-3 border-gray-300" />

                            <div className="text-left text-sm text-gray-600 space-y-1 font-poppins">
                                <p>
                                    <strong>Age:</strong> {pet.pet_age}
                                </p>
                                <p>
                                    <strong>Breed:</strong> {pet.pet_breed}
                                </p>
                                <p>
                                    <strong>Status:</strong> {pet.pet_status}
                                </p>
                            </div>
                            <div className="mt-8 flex justify-center">
                                <a
                                    href="/dashboard/user/adoptionreqform"
                                    className="bg-[#FED200] hover:bg-[#e3ba00] text-white font-semibold px-15 py-2 rounded-full font-medium rounded-full shadow-md transition-all"
                                >
                                    Adopt
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
