'use client';
import Link from 'next/link';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from './ui/sidebar';
import { Home, PawPrint, UsersRound } from 'lucide-react';
import { UserNavigation } from './Nav-User';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import { getCurrentAdmin } from '@/server/admin';

const adminRoutes = [
    {
        title: 'Home',
        url: '/dashboard/admin/',
        icon: Home,
    },
    {
        title: 'Pet lists',
        url: '/dashboard/admin/pets',
        icon: PawPrint,
    },
    {
        title: 'Manage adoptions',
        url: '/dashboard/admin/manage-applications',
        icon: UsersRound,
    },
];

export default function LeftSidebar() {
    const { data } = useQuery({
        queryKey: ['admin-info'],
        queryFn: () => getCurrentAdmin().then((admin) => admin.data),
    });

    const user = {
        name: data?.username ? data.username : '',
        email: data?.email ? data.email : '',
        avatar: '/images/admin_avatar.png',
    };
    return (
        <Sidebar>
            <SidebarHeader className="flex justify-start items-center">
                <Image src={'/favicon.png'} alt="Fur Legged Logo" width={38} height={38} />
                <span className="font-poppins font-semibold">Fur Legged</span>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Main </SidebarGroupLabel>
                    <SidebarMenu>
                        {adminRoutes.map((route) => (
                            <SidebarMenuItem key={route.title}>
                                <SidebarMenuButton asChild>
                                    <Link href={route.url}>
                                        <route.icon />
                                        <span>{route.title}</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <UserNavigation user={user} />
            </SidebarFooter>
        </Sidebar>
    );
}
