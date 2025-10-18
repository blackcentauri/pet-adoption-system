import { Dog, Home, PawPrint } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function UserNavigation() {
    return (
        <nav className="w-full bg-white flex justify-between items-center px-10 py-4 shadow-[0_2px_10px_rgba(0,0,0,0.1)] sticky top-0">
            <nav className="flex items-center gap-8 text-[1rem] font-semibold text-[#FED200]">
                <Link href="/dashboard/user" className="hover:text-gray-500 transition">
                    <Home className="size-8" />
                </Link>
                <Link href="/dashboard/user/applications" className="hover:text-gray-500 transition">
                    <PawPrint className="size-8" />
                </Link>

                <Link href={'/dashboard/user/adopted'} className="hover:text-gray-500 transition">
                    <Dog className="size-8" />
                </Link>
            </nav>
            <div>
                <Link href={'/dashboard/user/profile'}>
                    <Image
                        src="/images/user_avatar.png"
                        alt="User"
                        width={48}
                        height={48}
                        className="w-10 h-10 rounded-full border border-gray-300"
                    />
                </Link>
            </div>
        </nav>
    );
}
