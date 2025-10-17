'use client';
import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { TrendingUp } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { fetchAllApplicationsCount } from '@/server/admin';
import { Skeleton } from './ui/skeleton';

export default function AdminSectionCards() {
    const { data, isPending } = useQuery({
        queryKey: ['application-count'],
        queryFn: () => fetchAllApplicationsCount().then((count) => count.data),
    });

    return (
        <section className="grid grid-cols-3 gap-4">
            {isPending ? (
                <Skeleton className="h-full w-full" />
            ) : (
                <Card>
                    <CardHeader>
                        <CardDescription>Applications</CardDescription>
                        <CardTitle className="text-3xl font-semibold tabular-nums">
                            {data?.appliedCounts ?? 0}
                        </CardTitle>
                        <CardAction>
                            <Badge variant={'outline'}>
                                <TrendingUp className="text-green-500" />
                                +33.3%
                            </Badge>
                        </CardAction>
                    </CardHeader>
                    <CardFooter className="flex-col items-start gap-1.5 text-sm">
                        <div className="line-clamp-1 flex gap-2 font-medium">
                            Applications surging <TrendingUp className="size-4" />
                        </div>
                        <div className="text-muted-foreground">Number of applications this day</div>
                    </CardFooter>
                </Card>
            )}
            {isPending ? (
                <Skeleton className="h-full w-full" />
            ) : (
                <Card>
                    <CardHeader>
                        <CardDescription>Rejected</CardDescription>
                        <CardTitle className="text-3xl font-semibold tabular-nums">
                            {data?.rejectedCounts ?? 0}
                        </CardTitle>
                        <CardAction>
                            <Badge variant={'outline'}>
                                <TrendingUp className="text-green-500" />+ 19.6%
                            </Badge>
                        </CardAction>
                    </CardHeader>
                    <CardFooter className="flex-col items-start gap-1.5 text-sm">
                        <div className="line-clamp-1 flex gap-2 font-medium">
                            Rejected <TrendingUp className="size-4" />
                        </div>
                        <div className="text-muted-foreground">Number of rejected applications this day</div>
                    </CardFooter>
                </Card>
            )}

            <Card>
                <CardHeader>
                    <CardDescription>Approved</CardDescription>
                    <CardTitle className="text-3xl font-semibold tabular-nums">{data?.approvedCounts ?? 0}</CardTitle>
                    <CardAction>
                        <Badge variant={'outline'}>
                            <TrendingUp className="text-green-500" />+ 89.6%
                        </Badge>
                    </CardAction>
                </CardHeader>
                <CardFooter className="flex-col items-start gap-1.5 text-sm">
                    <div className="line-clamp-1 flex gap-2 font-medium">
                        Approved <TrendingUp className="size-4" />
                    </div>
                    <div className="text-muted-foreground">Number of approved applications this day</div>
                </CardFooter>
            </Card>
        </section>
    );
}
