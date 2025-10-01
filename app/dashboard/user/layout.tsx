import { getSession } from '@/lib/session';

export default async function UserDashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await getSession();
    return <main className="h-full w-full">{children}</main>;
}
