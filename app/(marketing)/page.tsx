'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Home() {
    const images = [
        
        '/images/cat-bg.jpg',
        '/images/cat-dog.jpg',
        '/images/cat-dog2.jpg',
        '/images/cat-dog3.jpg',
        '/images/cat-dog.jpg', //eto gagalawin mo para mag add/remove ng slider doon
    ];

    const [current, setCurrent] = useState(0);

    
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % images.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [images.length]);

    return (
        <div className="flex flex-col min-h-screen font-poppins relative">
            <nav className="w-full bg-white flex justify-between items-center px-10 py-4 shadow-[0_2px_10px_rgba(0,0,0,0.1)] z-20">
                <Image
                    src="/images/fur_legged_logo.png"
                    alt="Fur Legged Logo"
                    className="w-12 h-12"
                    width={50}
                    height={50}
                />

                <nav className="flex items-center gap-8 text-[1rem] font-semibold text-[##1E293B]">
                    <Link href="/" className="hover:text-yellow-500 transition">
                        Home
                    </Link>
                    <Link href="#" className="hover:text-yellow-500 transition">
                        About Us
                    </Link>
                    <Link href="#" className="hover:text-yellow-500 transition">
                        Contact Us
                    </Link>
                </nav>

                <div className="flex gap-5">
                    <Link href={'/user/signin'}>
                        <Button
                            size={'lg'}
                            variant={'secondary'}
                            className="bg-primary font-poppins text-white font-medium rounded-full shadow-md hover:shadow-lg hover:scale-105 transition"
                        >
                            Sign in
                        </Button>
                    </Link>
                    <Link href={'/user/signup'}>
                        <Button
                            size={'lg'}
                            variant={'ghost'}
                            className="font-poppins font-medium rounded-full shadow-md hover:shadow-lg hover:scale-105 transition"
                        >
                            Sign up
                        </Button>
                    </Link>
                </div>
            </nav>

            <div className="relative h-[85vh] w-full flex items-center justify-center overflow-hidden">
                {images.map((img, index) => (
                    <Image
                        key={index}
                        src={img}
                        alt={`Slide ${index + 1}`}
                        fill
                        priority={index === 0}
                        className={`object-cover absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                            index === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
                        }`}
                    />
                ))}

                <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/40 z-20"></div>

                <div className="relative z-30 text-center text-white px-4">
                    <h1 className="text-4xl md:text-6xl font-fredoka font-bold mb-4 leading-snug">
                        WELCOME TO YOUR <br /> NEW BEGINNING!
                    </h1>

                    <p className="text-base md:text-lg mb-8 max-w-2xl mx-auto">
                        WHERE WAGGING TAILS, GENTLE PURRS, AND UNCONDITIONAL LOVE AWAIT. FIND YOUR FOREVER FRIEND TODAY.
                    </p>

                    <Link href="#">
                        <Button
                            size="lg"
                            className="bg-[#FFC800] text-white font-fredoka text-lg px-15 py-3 rounded-full shadow-lg hover:shadow-2xl hover:scale-105 transition"
                        >
                            ADOPT NOW!
                        </Button>
                    </Link>
                </div>

                <div className="absolute bottom-6 flex gap-3 z-30">
                    {images.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrent(index)}
                            className={`w-3 h-3 rounded-full transition-all ${
                                index === current ? 'bg-[#1E293B] scale-125' : 'bg-white opacity-70 hover:opacity-100'
                            }`}
                        />
                    ))}
                </div>
            </div>

            <section className="bg-white py-16 px-6 md:px-20">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-fredoka font-bold text-[#1E293B] mb-2 text-left">
                        LOOKING FOR A HOME
                    </h2>
                    <p className="text-gray-500 text-left mb-10 whitespace-nowrap overflow-hidden text-ellipsis">
                        These wonderful cats and dogs are currently under our loving care—each one hoping to find their
                        forever family.
                    </p>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
                        {[
                            { name: 'THORMUND', img: '/images/dog1.jpg' },
                            { name: 'BINGO', img: '/images/dog2.jpg' },
                            { name: 'EZRA', img: '/images/dog3.jpg' },
                            { name: 'LORNA', img: '/images/cat1.jpg' },
                            { name: 'MILO', img: '/images/dog4.jpg' },
                            { name: 'BELLA', img: '/images/dog5.jpg' },
                            { name: 'ROCKY', img: '/images/dog6.jpg' },
                            { name: 'LUNA', img: '/images/dog7.jpg' },
                        ].map((pet, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all overflow-hidden"
                            >
                                <Image
                                    src={pet.img}
                                    alt={pet.name}
                                    width={300}
                                    height={300}
                                    className="w-full h-60 object-cover"
                                />
                                <h3 className="text-center py-4 font-semibold text-[#1E293B]">{pet.name}</h3>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
