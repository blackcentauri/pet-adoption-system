'use client';

import AdminSectionCards from '@/components/Admin-Section-Cards';
import { ChartAreaInteractive } from '@/components/Analytics-Chart';

export default function AdminHomePage() {
    return (
        <div className='grid gap-8'>
            <AdminSectionCards />
            <ChartAreaInteractive />
        </div>
    );
}
