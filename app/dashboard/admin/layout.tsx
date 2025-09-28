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
            <main className="h-full w-full">
                <SidebarTrigger />
                {children}
            </main>
        </SidebarProvider>
    );
}
