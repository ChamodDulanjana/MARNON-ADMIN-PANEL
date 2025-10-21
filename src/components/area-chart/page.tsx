import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import {
    type ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from '@/components/ui/chart'
import {useState} from "react";
import {getSalesCountOfDayRange} from "@/services/orderService.ts";
import {useQuery} from "@tanstack/react-query";
import LoadingAnimation from "@/pages/loading.tsx";
import NotFound from "@/pages/notFound.tsx";

type ChartDataType = {
    date: string; // ISO date string
    men: number;
    women: number;
    kid: number;
}

const chartConfig = {
    men: {
        label: "Men",
        color: "var(color-men)",
    },
    women: {
        label: "Women",
        color: "var(color-women)",
    },
    kid: {
        label: "Kid",
        color: "var(color-kid)",
    },
} satisfies ChartConfig

const daysToSubtract = 90 // Default to 90 days

const AreaChartForSales = () => {
    // Use react-query to fetch sales
    const {
        isLoading,
        isError,
        data: chartData = []  // Default values to avoid undefined errors
    } = useQuery<ChartDataType[]>({
        queryKey: ['sales-area-chart'],
        queryFn: () => getSalesCountOfDayRange(daysToSubtract),
    });

    const [activeChart, setActiveChart] = useState<keyof typeof chartConfig>("men")

    const filteredData = chartData.filter((item) => {
        const date = new Date(item.date)
        const referenceDate = new Date().toISOString().split('T')[0];
        const startDate = new Date(referenceDate)
        startDate.setDate(startDate.getDate() - daysToSubtract)
        return date >= startDate
    })

    if (isLoading) return <LoadingAnimation />;
    if (isError)   return <NotFound />;

    return (
        <div className='w-full mt-2'>
            <Card>
                <CardHeader className="flex flex-col sm:flex-row items-center gap-2 border-b ">
                    <div className="grid flex-1 gap-1 text-center sm:text-left">
                        <CardTitle>Product Sales</CardTitle>
                        <CardDescription>
                            Showing total sales for the last 3 months
                        </CardDescription>
                    </div>

                    <div className="flex">
                        {["men", "women", "kid"].map((key) => {
                            const chart = key as keyof typeof chartConfig
                            return (
                                <button
                                    key={chart}
                                    data-active={activeChart === chart}
                                    className="relative flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                                    onClick={() => setActiveChart(chart)}
                                >
                                    <span className="text-sm text-muted-foreground">
                                      {chartConfig[chart].label}
                                    </span>
                                </button>
                            )
                        })}
                    </div>
                </CardHeader>
                <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
                    <ChartContainer
                        config={chartConfig}
                        className="aspect-auto h-[300px] w-full"
                    >
                        <AreaChart data={filteredData}>
                            <defs>
                                <linearGradient id="fillmen" x1="0" y1="0" x2="0" y2="1">
                                    <stop
                                        offset="5%"
                                        stopColor="var(--color-men)"
                                        stopOpacity={0.8}
                                    />
                                    <stop
                                        offset="95%"
                                        stopColor="var(--color-men)"
                                        stopOpacity={0.1}
                                    />
                                </linearGradient>
                                <linearGradient id="fillwomen" x1="0" y1="0" x2="0" y2="1">
                                    <stop
                                        offset="5%"
                                        stopColor="var(--color-women)"
                                        stopOpacity={0.8}
                                    />
                                    <stop
                                        offset="95%"
                                        stopColor="var(--color-women)"
                                        stopOpacity={0.1}
                                    />
                                </linearGradient>
                                <linearGradient id="fillkid" x1="0" y1="0" x2="0" y2="1">
                                    <stop
                                        offset="5%"
                                        stopColor="var(--color-kid)"
                                        stopOpacity={0.8}
                                    />
                                    <stop
                                        offset="95%"
                                        stopColor="var(--color-kid)"
                                        stopOpacity={0.1}
                                    />
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
                                    const date = new Date(value)
                                    return date.toLocaleDateString("en-US", {
                                        month: "short",
                                        day: "numeric",
                                    })
                                }}
                            />
                            <ChartTooltip
                                cursor={false}
                                content={
                                    <ChartTooltipContent
                                        labelFormatter={(value) => {
                                            return new Date(value).toLocaleDateString("en-US", {
                                                month: "short",
                                                day: "numeric",
                                            })
                                        }}
                                        indicator="dot"
                                    />
                                }
                            />

                            <Area
                                dataKey={activeChart}
                                type="natural"
                                fill={`url(#fill${activeChart})`}
                                stroke={`var(--color-${activeChart})`}
                            />
                            <ChartLegend content={<ChartLegendContent />} />
                        </AreaChart>
                    </ChartContainer>
                </CardContent>
            </Card>
        </div>
    );
};

export default AreaChartForSales;