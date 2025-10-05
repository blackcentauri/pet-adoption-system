import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
    return (
        
        <div
            className="flex flex-col min-h-screen items-center bg-white font-poppins"
            style={{
                backgroundImage: "url('/images/bg1.svg')",
                backgroundSize: 'cover',
            }}
        >
            
            <nav className="flex items-center justify-between w-full h-[80px] px-8 lg:px-20 bg-white shadow-sm">
                
                <div className="flex items-center gap-2">
                    <Image
                        src={'/images/fur_legged_logo.png'} 
                        alt="fur legged logo"
                        height={40}
                        width={40}
                    />
                </div>

                <ul className="hidden md:flex items-center gap-8">
                    <li className="cursor-pointer font-medium text-gray-800 transition">
                        Home
                    </li>
                    <li className="cursor-pointer font-medium text-gray-800 transition">
                        About
                    </li>
                    <li className="cursor-pointer font-medium text-gray-800 transition">
                        Contact Us
                    </li>
                </ul>

             
                <div className="flex gap-3">
                    <Link href={'/signin'}>
                        
                        <Button
                            size={'sm'}
                            className="bg-[#FEC84B] text-white font-poppins font-medium px-5 h-10 hover:bg-[#EAA937]"
                        >
                            Sign in
                        </Button>
                    </Link>
                    <Link href={'/user/signup'}>
                        
                        <Button
                            size={'sm'}
                            variant={'ghost'}
                            className="font-poppins font-medium px-5 h-10 text-gray-800 hover:bg-gray-100"
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
        src={'/images/Welcome!.svg'}
        alt="Welcome with pets and paw prints"
        width={350}
        height={350}
        priority
        className="absolute max-w-[90%] top-1/2 left-1/14 -translate-x-1/2 -translate-y-1/2"  
    />


                    <div className="absolute top-[110%] left-[1%] transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">

                        <Link href={'#'}>
                            <Button
                                size={'lg'}
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
