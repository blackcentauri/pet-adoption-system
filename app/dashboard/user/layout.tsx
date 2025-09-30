import { getSession } from '@/lib/session';

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await getSession();
    return <main className="h-full w-full">{children}</main>;
}
