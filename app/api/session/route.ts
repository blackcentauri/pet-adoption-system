import { getSession } from '@/lib/session';
import { NextResponse } from 'next/server';

export async function POST() {
    try {
        const session = await getSession();

        if (!session || session.role === null) {
            return NextResponse.json(
                { success: false, message: 'No session found!' },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { success: true, message: 'Successful session!', data: session },
            { status: 200 }
        );
    } catch (error) {
        console.error('Server side error: ', error);
        return NextResponse.json(
            {
                success: false,
                message: 'An error occured while fetching data',
            },
            { status: 500 }
        );
    }
}
