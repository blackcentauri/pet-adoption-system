'use client';

import * as React from 'react';
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
    ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from '@/components/ui/chart';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export const description = 'Adopted pets analytics';

const chartData = [
    { date: '2024-04-01', dogs: 222, cats: 150 },
    { date: '2024-04-02', dogs: 97, cats: 180 },
    { date: '2024-04-03', dogs: 167, cats: 120 },
    { date: '2024-04-04', dogs: 242, cats: 260 },
    { date: '2024-04-05', dogs: 373, cats: 290 },
    { date: '2024-04-06', dogs: 301, cats: 340 },
    { date: '2024-04-07', dogs: 245, cats: 180 },
    { date: '2024-04-08', dogs: 409, cats: 320 },
    { date: '2024-04-09', dogs: 59, cats: 110 },
    { date: '2024-04-10', dogs: 261, cats: 190 },
    { date: '2024-04-11', dogs: 327, cats: 350 },
    { date: '2024-04-12', dogs: 292, cats: 210 },
    { date: '2024-04-13', dogs: 342, cats: 380 },
    { date: '2024-04-14', dogs: 137, cats: 220 },
    { date: '2024-04-15', dogs: 120, cats: 170 },
    { date: '2024-04-16', dogs: 138, cats: 190 },
    { date: '2024-04-17', dogs: 446, cats: 360 },
    { date: '2024-04-18', dogs: 364, cats: 410 },
    { date: '2024-04-19', dogs: 243, cats: 180 },
    { date: '2024-04-20', dogs: 89, cats: 150 },
    { date: '2024-04-21', dogs: 137, cats: 200 },
    { date: '2024-04-22', dogs: 224, cats: 170 },
    { date: '2024-04-23', dogs: 138, cats: 230 },
    { date: '2024-04-24', dogs: 387, cats: 290 },
    { date: '2024-04-25', dogs: 215, cats: 250 },
    { date: '2024-04-26', dogs: 75, cats: 130 },
    { date: '2024-04-27', dogs: 383, cats: 420 },
    { date: '2024-04-28', dogs: 122, cats: 180 },
    { date: '2024-04-29', dogs: 315, cats: 240 },
    { date: '2024-04-30', dogs: 454, cats: 380 },
    { date: '2024-05-01', dogs: 165, cats: 220 },
    { date: '2024-05-02', dogs: 293, cats: 310 },
    { date: '2024-05-03', dogs: 247, cats: 190 },
    { date: '2024-05-04', dogs: 385, cats: 420 },
    { date: '2024-05-05', dogs: 481, cats: 390 },
    { date: '2024-05-06', dogs: 498, cats: 520 },
    { date: '2024-05-07', dogs: 388, cats: 300 },
    { date: '2024-05-08', dogs: 149, cats: 210 },
    { date: '2024-05-09', dogs: 227, cats: 180 },
    { date: '2024-05-10', dogs: 293, cats: 330 },
    { date: '2024-05-11', dogs: 335, cats: 270 },
    { date: '2024-05-12', dogs: 197, cats: 240 },
    { date: '2024-05-13', dogs: 197, cats: 160 },
    { date: '2024-05-14', dogs: 448, cats: 490 },
    { date: '2024-05-15', dogs: 473, cats: 380 },
    { date: '2024-05-16', dogs: 338, cats: 400 },
    { date: '2024-05-17', dogs: 499, cats: 420 },
    { date: '2024-05-18', dogs: 315, cats: 350 },
    { date: '2024-05-19', dogs: 235, cats: 180 },
    { date: '2024-05-20', dogs: 177, cats: 230 },
    { date: '2024-05-21', dogs: 82, cats: 140 },
    { date: '2024-05-22', dogs: 81, cats: 120 },
    { date: '2024-05-23', dogs: 252, cats: 290 },
    { date: '2024-05-24', dogs: 294, cats: 220 },
    { date: '2024-05-25', dogs: 201, cats: 250 },
    { date: '2024-05-26', dogs: 213, cats: 170 },
    { date: '2024-05-27', dogs: 420, cats: 460 },
    { date: '2024-05-28', dogs: 233, cats: 190 },
    { date: '2024-05-29', dogs: 78, cats: 130 },
    { date: '2024-05-30', dogs: 340, cats: 280 },
    { date: '2024-05-31', dogs: 178, cats: 230 },
    { date: '2024-06-01', dogs: 178, cats: 200 },
    { date: '2024-06-02', dogs: 470, cats: 410 },
    { date: '2024-06-03', dogs: 103, cats: 160 },
    { date: '2024-06-04', dogs: 439, cats: 380 },
    { date: '2024-06-05', dogs: 88, cats: 140 },
    { date: '2024-06-06', dogs: 294, cats: 250 },
    { date: '2024-06-07', dogs: 323, cats: 370 },
    { date: '2024-06-08', dogs: 385, cats: 320 },
    { date: '2024-06-09', dogs: 438, cats: 480 },
    { date: '2024-06-10', dogs: 155, cats: 200 },
    { date: '2024-06-11', dogs: 92, cats: 150 },
    { date: '2024-06-12', dogs: 492, cats: 420 },
    { date: '2024-06-13', dogs: 81, cats: 130 },
    { date: '2024-06-14', dogs: 426, cats: 380 },
    { date: '2024-06-15', dogs: 307, cats: 350 },
    { date: '2024-06-16', dogs: 371, cats: 310 },
    { date: '2024-06-17', dogs: 475, cats: 520 },
    { date: '2024-06-18', dogs: 107, cats: 170 },
    { date: '2024-06-19', dogs: 341, cats: 290 },
    { date: '2024-06-20', dogs: 408, cats: 450 },
    { date: '2024-06-21', dogs: 169, cats: 210 },
    { date: '2024-06-22', dogs: 317, cats: 270 },
    { date: '2024-06-23', dogs: 480, cats: 530 },
    { date: '2024-06-24', dogs: 132, cats: 180 },
    { date: '2024-06-25', dogs: 141, cats: 190 },
    { date: '2024-06-26', dogs: 434, cats: 380 },
    { date: '2024-06-27', dogs: 448, cats: 490 },
    { date: '2024-06-28', dogs: 149, cats: 200 },
    { date: '2024-06-29', dogs: 103, cats: 160 },
    { date: '2024-06-30', dogs: 446, cats: 400 },
];

const chartConfig = {
    dogs: {
        label: 'Cats',
        color: 'var(--chart-1)',
    },
    cats: {
        label: 'Dogs',
        color: 'var(--chart-2)',
    },
    others: {
        label: 'Others',
        color: 'var(--chart-3)',
    },
} satisfies ChartConfig;

export function ChartAreaInteractive() {
    const [timeRange, setTimeRange] = React.useState('90d');

    const filteredData = chartData.filter((item) => {
        const date = new Date(item.date);
        const referenceDate = new Date('2024-06-30');
        let daysToSubtract = 90;
        if (timeRange === '30d') {
            daysToSubtract = 30;
        } else if (timeRange === '7d') {
            daysToSubtract = 7;
        }
        const startDate = new Date(referenceDate);
        startDate.setDate(startDate.getDate() - daysToSubtract);
        return date >= startDate;
    });

    return (
        <Card className="pt-0">
            <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
                <div className="grid flex-1 gap-1">
                    <CardTitle>Adopted Pets Chart</CardTitle>
                    <CardDescription>Showing adopted pets by species</CardDescription>
                </div>
                <Select value={timeRange} onValueChange={setTimeRange}>
                    <SelectTrigger
                        className="hidden w-[160px] rounded-lg sm:ml-auto sm:flex"
                        aria-label="Select a value"
                    >
                        <SelectValue placeholder="Last 3 months" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                        <SelectItem value="90d" className="rounded-lg">
                            Last 3 months
                        </SelectItem>
                        <SelectItem value="30d" className="rounded-lg">
                            Last 30 days
                        </SelectItem>
                        <SelectItem value="7d" className="rounded-lg">
                            Last 7 days
                        </SelectItem>
                    </SelectContent>
                </Select>
            </CardHeader>
            <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
                <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
                    <AreaChart data={filteredData}>
                        <defs>
                            <linearGradient id="filldogs" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="var(--color-dogs)" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="var(--color-dogs)" stopOpacity={0.1} />
                            </linearGradient>
                            <linearGradient id="fillcats" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="var(--color-cats)" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="var(--color-cats)" stopOpacity={0.1} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="date"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            minTickGap={32}
                            tickFormatter={(value) => {
                                const date = new Date(value);
                                return date.toLocaleDateString('en-US', {
                                    month: 'short',
                                    day: 'numeric',
                                });
                            }}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={
                                <ChartTooltipContent
                                    labelFormatter={(value) => {
                                        return new Date(value).toLocaleDateString('en-US', {
                                            month: 'short',
                                            day: 'numeric',
                                        });
                                    }}
                                    indicator="dot"
                                />
                            }
                        />
                        <Area
                            dataKey="cats"
                            type="natural"
                            fill="url(#fillcats)"
                            stroke="var(--color-cats)"
                            stackId="a"
                        />
                        <Area
                            dataKey="dogs"
                            type="natural"
                            fill="url(#filldogs)"
                            stroke="var(--color-dogs)"
                            stackId="a"
                        />
                        <ChartLegend content={<ChartLegendContent />} />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
