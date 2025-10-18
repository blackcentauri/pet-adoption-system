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
            <div className="min-h-screen bg-[#FFF9D9] overflow-y-auto py-10 px-6">
                <section className="bg-white rounded-2xl shadow-md p-10 mb-10 text-center max-w-5xl mx-auto">
                    <h2 className="text-[#FFC800] text-3xl font-bold font-fredoka mb-4">About Us</h2>
                    <p className="text-[#8B5E00] text-base leading-relaxed font-poppins">
                        Welcome to Fur-Legged, the place where compassion meets commitment. We are more than just an
                        adoption center. We are a dedicated non-profit organization focused on being a bridge to a
                        better life for animals in need and the families who are waiting to open their hearts.
                    </p>
                    <p className="text-[#8B5E00] text-base leading-relaxed mt-4 font-poppins">
                        Our journey is rooted in the simple yet profound belief that every companion deserves a loving,
                        forever home, and that the bond we share with our pets makes us better people.
                    </p>
                </section>

                <section className="bg-white rounded-2xl shadow-md p-10 mb-10 text-center max-w-5xl mx-auto">
                    <h2 className="text-[#FFC800] text-3xl font-bold font-fredoka mb-8">Our Values</h2>
                    <div className="flex flex-wrap justify-center gap-6">
                        {['Compassion', 'Commitment', 'Integrity', 'Community'].map((value) => (
                            <button
                                key={value}
                                className="bg-[#FFC800] text-white font-bold py-3 px-15 rounded-full shadow-md hover:shadow-lg transition"
                            >
                                {value}
                            </button>
                        ))}
                    </div>
                </section>

                <section className="bg-white rounded-2xl shadow-md p-10 max-w-5xl mx-auto">
                    <h2 className="text-[#FFC800] text-3xl font-bold font-fredoka mb-8 text-center">Our Commitment</h2>
                    <div className="space-y-10">
                        {[
                            {
                                title: 'Saving Lives',
                                text: 'Every pet in our care receives complete medical attention. We ensure every animal is healthy, vaccinated, and spayed/neutered before adoption.',
                                img: '/images/saving_lives.jpg',
                            },
                            {
                                title: 'Creating Bonds',
                                text: 'Our thoughtful adoption process ensures a wonderful, lifelong connection between the pet and their new family.',
                                img: '/images/creating_bonds.jpg',
                            },
                            {
                                title: 'Continuous Improvement',
                                text: 'We hold ourselves to the highest standards of animal welfare and ethical practice. Your adoption supports an organization dedicated to continuous improvement in saving and rehoming pets.',
                                img: '/images/continious_improvement.jpg',
                            },
                        ].map((item, index) => (
                            <div key={index} className="flex flex-col md:flex-row items-center md:items-start gap-8">
                                <div className="flex-shrink-0">
                                    <img
                                        src={item.img}
                                        alt={item.title}
                                        className="w-[200px] h-[150px] object-cover rounded-xl shadow-md"
                                    />
                                </div>
                                <div className="text-center md:text-left">
                                    <h3 className="text-[#FFC800] text-xl font-semibold font-poppins mb-2">
                                        {item.title}
                                    </h3>
                                    <p className="text-[#8B5E00] text-base font-poppins">{item.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}
