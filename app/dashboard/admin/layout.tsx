import LeftSidebar from '@/components/LeftSideBar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';

export default function AdminDashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <SidebarProvider>
            <LeftSidebar />
            <SidebarTrigger />
            <main className="h-full w-full px-4 py-5">{children}</main>
        </SidebarProvider>
    );
}
