import QueryProvider from './provider';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <QueryProvider>
            <main className="h-full w-full">{children}</main>
        </QueryProvider>
    );
}
