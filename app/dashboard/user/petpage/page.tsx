'use client';

import UserNavigation from '@/components/Navigation';
import Image from 'next/image';

export default function PetPage() {
    return (
        <div className="min-h-screen bg-[#fffce8] flex flex-col items-center font-poppins">
            <main className="flex flex-col md:flex-row items-center justify-center gap-12 px-10 py-12 w-full max-w-6xl">
                <div className="w-full md:w-1/2 flex justify-center">
                    <Image
                        src="/images/sample_dog.jpg"
                        alt="Pet"
                        width={350}
                        height={350}
                        className="w-[350px] h-[350px] rounded-xl object-cover shadow-[0_4px_20px_rgba(0,0,0,0.25)]"
                    />
                </div>
                <div className="w-full md:w-1/2 text-gray-700">
                    <h1 className="text-5xl font-extrabold text-yellow-500 tracking-wide">
                        BINGO
                    </h1>
                    <h2 className="text-xl font-semibold text-gray-500">
                        LABRADOR RETRIEVER
                    </h2>

                    <hr className="border-t-2 border-gray-200 my-4 w-3/4" />

                    <div className="space-y-3">
                        <p className="font-semibold text-gray-600">
                            AGE:{' '}
                            <span className="ml-2 font-normal text-gray-700">
                                1 YEAR OLD
                            </span>
                        </p>
                        <p className="font-semibold text-gray-600">
                            GENDER:{' '}
                            <span className="ml-2 font-normal text-gray-700">
                                FEMALE
                            </span>
                        </p>

                        <p className="font-semibold text-gray-600 mt-6">
                            BINGO’S BACKGROUND:
                        </p>

                        <p className="text-sm leading-relaxed text-gray-700">
                            WHEN BINGO WAS RESCUED FROM THE ABANDONED ILLEGAL
                            POGO HUB, SHE WAS JUST A SCARED LITTLE PUPPY AT ONLY
                            A FEW MONTHS OLD. BEING THE YOUNGEST OF THE POGO
                            DOGS, SHE’S HAD TO SLOWLY LEARN THE ROPES OF LOVE
                            AND TRUST A DAY AT A TIME.
                        </p>

                        <p className="text-sm leading-relaxed text-gray-700">
                            BINGO FINDS COMFORT IN THE COMPANY OF OTHER DOGS.
                            SHE HAS A RESERVED NATURE AND PREFERS MORE RELAXING
                            ACTIVITIES. DESPITE HER UNFORTUNATE BEGINNING, SHE
                            IS A GORGEOUS AND SWEET DOG JUST WAITING FOR THE
                            RIGHT PERSON TO HELP HER BLOSSOM WITH PATIENCE AND
                            LOVE.
                        </p>
                    </div>

                    <div className="mt-8 flex justify-start">
                        <a
                            href="/dashboard/user/adoptionreqform"
                            className="bg-[#FED200] hover:bg-[#e3ba00] text-white font-semibold px-40 py-2 rounded-full shadow-md transition-all"
                        >
                            Adopt Now!
                        </a>
                    </div>
                </div>
            </main>
        </div>
    );
}
