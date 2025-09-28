'use client';
import Link from 'next/link';
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from './ui/sidebar';
import { Home, Dog, PawPrint } from 'lucide-react';

const adminRoutes = [
    {
        title: 'Home',
        url: '/dashboard/admin/',
        icon: Home,
    },
    {
        title: 'Pet lists',
        url: '/dashboard/admin/pets',
        icon: Dog,
    },
    {
        title: 'Add pet',
        url: '/dashboard/admin/add',
        icon: PawPrint,
    },
];

export default function LeftSidebar() {
    return (
        <Sidebar>
            <SidebarHeader>Fur Legged</SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
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
        </Sidebar>
    );
}
