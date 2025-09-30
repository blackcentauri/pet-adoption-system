import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

export default function AdminPage() {
    return (
        <div className="grid grid-rows-[90px_1fr]">
            <h1 className="font-poppins font-semibold text-4xl">Foster pets</h1>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Avatar</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Foster Request</TableHead>
                        <TableHead>Application Date</TableHead>
                        <TableHead>Adoption Date</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody></TableBody>
            </Table>
        </div>
    );
}
