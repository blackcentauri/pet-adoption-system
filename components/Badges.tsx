import { application_status } from '@/app/generated/prisma';
import { Badge } from './ui/badge';

export function BadgeColor({ status }: { status: application_status }) {
    switch (status) {
        case 'applied':
            return <Badge variant={'default'}>{status}</Badge>;
        case 'rejected':
            return <Badge variant={'destructive'}>{status}</Badge>;
        case 'approved':
            return <Badge variant={'outline'}>{status}</Badge>;
        default:
            return <Badge variant={'secondary'}>{status}</Badge>;
    }
}
