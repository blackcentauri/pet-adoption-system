import UserNavigation from '@/components/Navigation';
export default async function UserDashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            {' '}
            <UserNavigation /> <main className="h-full w-full">{children}</main>
        </>
    );
}
