import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
    return (
        <div className="flex flex-col min-h-screen items-center bg-white font-poppins bg-[url('/images/bg1.svg')] bg-cover">
            <nav className="w-full bg-white flex justify-between items-center px-10 py-4 shadow-[0_2px_10px_rgba(0,0,0,0.1)]">
                <Image
                    src="/images/fur_legged_logo.png"
                    alt="Fur Legged Logo"
                    className="w-12 h-12"
                    width={50}
                    height={50}
                />

                <nav className="flex items-center gap-8 text-[1rem] font-semibold text-[#FED200]">
                    <Link href="/" className="hover:text-gray-500 transition">
                        Home
                    </Link>
                    <a href="#" className="hover:text-gray-500 transition">
                        About Us
                    </a>
                    <a href="#" className="hover:text-gray-500 transition">
                        Contact Us
                    </a>
                </nav>

                <div className="flex gap-5">
                    <Link href={'/signin'}>
                        <Button
                            size={'lg'}
                            variant={'secondary'}
                            className="bg-primary font-poppins text-white font-medium"
                        >
                            Sign in
                        </Button>
                    </Link>
                    <Link href={'/user/signup'}>
                        <Button
                            size={'lg'}
                            variant={'ghost'}
                            className="font-poppins font-medium"
                        >
                            Sign up
                        </Button>
                    </Link>
                </div>
            </nav>

            <main className="flex items-center justify-between w-full px-8 lg:px-20 py-10 max-w-7xl">
                <div className="flex flex-col gap-4 max-w-sm">
                    <h1 className="text-5xl font-extrabold text-[#333333] leading-tight">
                        Welcome to <br /> your new <br /> beginning
                    </h1>

                    <p className="text-xl font-medium text-[#5B5B5B] mt-2">
                        Where wagging tails, gentle purrs, and unconditional
                        love awaits.
                    </p>
                </div>

                <div className="relative flex justify-center items-center w-full lg:w-1/2 mt-10 lg:mt-0 h-[350px]">
                    <Image
                        src="/images/Welcome!.svg"
                        alt="Welcome with pets and paw prints"
                        width={350}
                        height={350}
                        priority
                        className="max-w-[90%] h-auto object-contain"
                    />

                    <div className="absolute top-[110%] left-[50%] transform -translate-x-1/2 flex flex-col items-center">
                        <Link href="#">
                            <Button
                                size="lg"
                                className="bg-[#FEC84B] text-white font-poppins font-bold text-xl w-40 h-10 rounded-full shadow-lg hover:bg-[#EAA937]"
                            >
                                Adopt Now!
                            </Button>
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
}
