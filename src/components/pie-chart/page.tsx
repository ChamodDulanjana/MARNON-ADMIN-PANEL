import {Pie, PieChart, Sector} from "recharts"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import {
    type ChartConfig,
    ChartContainer, ChartLegend, ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from '@/components/ui/chart'
import type {PieSectorDataItem} from "recharts/types/polar/Pie";
import {useState} from "react";
import {getSalesCountByMonthAndYear} from "@/services/orderService.ts";
import {useQuery} from "@tanstack/react-query";
import LoadingAnimation from "@/components/loading-animation/page.tsx";
import NotFound from "@/pages/notFound.tsx";

type DateType = {
    monthNumber: number;
    monthName: string;
    year: number;
}

type ChartDataType = {
    category: string;
    sales: number;
    fill: string;
}

const chartConfig = {
    men: {
        label: "Men",
        color: "var(color-men-pieChart)",
    },
    women: {
        label: "Women",
        color: "var(color-women-pieChart)",
    },
    kid: {
        label: "Kid",
        color: "var(color-kid-pieChart)",
    },
} satisfies ChartConfig

const PieChartByCategory = () => {
    const now = new Date();
    const [date] = useState<DateType>({
        monthNumber: now.getMonth() + 1, // Months are 0-indexed in JavaScript
        monthName: now.toLocaleString('default', { month: 'long' }),
        year: now.getFullYear(),
    })

    const fetchData = async () => {
        const response = await getSalesCountByMonthAndYear(date.monthNumber, date.year);
        if (response.statusCode === 200) {
            const data: ChartDataType[] = response.data.map((item: {category: string, sales: number}) => ({
                category: item.category.toLowerCase(),
                sales: item.sales,
                fill: setFillColor(item.category), // Set fill color based on category
            }));
            return data;
        }
        throw new Error('Failed to fetch sales data');
    }

    // Use react-query to fetch sales
    const {
        isLoading,
        isError,
        data: chartData = []  // Default values to avoid undefined errors
    } = useQuery<ChartDataType[]>({
        queryKey: ['sales-pie-chart', date.monthNumber, date.year],
        queryFn: () => fetchData(),
    });

    // Function to set fill color based on category
    const setFillColor = (category: string): string =>  {
        switch (category) {
            case "Men":
                return "var(--color-men-pieChart)";
            case "Women":
                return "var(--color-women-pieChart)";
            case "Kid":
                return "var(--color-kid-pieChart)";
            default:
                return "var(--color-default-pieChart)"; // Fallback color
        }
    }

    if (isLoading) return <LoadingAnimation />;
    if (isError)   return <NotFound />;

    return (
        <div className="w-1/3 max-[1260px]:w-full">
            <Card className="flex flex-col shadow-md">
                <CardHeader className="items-center pb-1">
                    <CardTitle>Sales by Product Category</CardTitle>
                    <CardDescription>{`${date.monthName} - ${date.year}`}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 pb-0">
                    {chartData.length === 0 ? (
                        <div className='my-24'>
                            <p className="text-center text-sm text-gray-500">No sales available for this month.</p>
                        </div>
                    ) : (
                        <ChartContainer
                            config={chartConfig}
                            className="mx-auto aspect-square min-[460px]:h-[280px] min-[1260px]:w-full"
                        >
                            <PieChart>
                                <ChartTooltip
                                    cursor={false}
                                    content={<ChartTooltipContent hideLabel />}
                                />
                                <Pie
                                    data={chartData}
                                    dataKey="sales"
                                    nameKey="category"
                                    innerRadius={60}
                                    strokeWidth={5}
                                    activeIndex={0}
                                    activeShape={({
                                                      outerRadius = 0,
                                                      ...props
                                                  }: PieSectorDataItem) => (
                                        <Sector {...props} outerRadius={outerRadius + 10} />
                                    )}
                                />
                                <ChartLegend content={<ChartLegendContent />} />
                            </PieChart>
                        </ChartContainer>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default PieChartByCategory;