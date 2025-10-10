import Image from 'next/image';
import Link from 'next/link';

export default function UserNavigation() {
    return (
        <nav className="w-full bg-white flex justify-between items-center px-10 py-4 shadow-[0_2px_10px_rgba(0,0,0,0.1)] sticky top-0">
            <div className="flex items-center gap-2">
                <Image
                    src="/images/fur_legged_logo.png"
                    alt="Fur Legged Logo"
                    width={48}
                    height={48}
                    className="w-12 h-12"
                />
            </div>
            <nav className="flex items-center gap-8 text-[1rem] font-semibold text-[#FED200]">
                <Link
                    href="/dashboard/user"
                    className="hover:text-gray-500 transition"
                >
                    Home
                </Link>
                <Link
                    href="/dashboard/user/about-us"
                    className="hover:text-gray-500 transition"
                >
                    About Us
                </Link>
                <Link
                    href="/dashboard/user/contact-us"
                    className="hover:text-gray-500 transition"
                >
                    Contact Us
                </Link>
            </nav>
            <div>
                <Link href={'/dashboard/user/profile'}>
                    <Image
                        src="/images/.jpg"
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
