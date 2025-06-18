import {Bar, BarChart, CartesianGrid, XAxis} from "recharts"

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
import {getSalesCountOfAllMonths} from "@/services/userProductService.ts";
import {useQuery} from "@tanstack/react-query";
import LoadingAnimation from "@/components/loading-animation/page.tsx";
import NotFound from "@/pages/notFound.tsx";

type ChartDataType = {
    month: string;
    men: number;
    women: number;
    kid: number;
}

const chartConfig = {
    men: {
        label: "Men",
        color: "var(color-men-barChart)",
    },
    women: {
        label: "Women",
        color: "var(color-women-barChart)",
    },
    kid: {
        label: "Kid",
        color: "var(color-kid-barChart)",
    },
} satisfies ChartConfig

const BarChartForProduct = () => {

    // Use react-query to fetch sales
    const {
        isLoading,
        isError,
        data: chartData = []  // Default values to avoid undefined errors
    } = useQuery<ChartDataType[]>({
        queryKey: ['sales-bar-chart'],
        queryFn: () => getSalesCountOfAllMonths(),
    });


    if (isLoading) return <LoadingAnimation />;
    if (isError)   return <NotFound />;

    return (
        <div className="w-full mt-4">
            <Card>
                <CardHeader>
                    <CardTitle>Sales by Month</CardTitle>
                    <CardDescription>January - June 2024</CardDescription>
                </CardHeader>
                <CardContent>
                    <ChartContainer config={chartConfig} className="h-[250px] lg:h-[350px] xl:h-[400px] min-[2000px]:h-[500px] w-full">
                        <BarChart accessibilityLayer data={chartData}>
                            <CartesianGrid vertical={false} />
                            <XAxis
                                dataKey="month"
                                tickLine={false}
                                tickMargin={10}
                                axisLine={false}
                                tickFormatter={(value) => value.slice(0, 3)}
                            />
                            <ChartTooltip
                                cursor={false}
                                content={<ChartTooltipContent indicator="dashed" />}
                            />
                            <Bar dataKey="men" fill="var(--color-men-barChart)" radius={4} />
                            <Bar dataKey="women" fill="var(--color-women-barChart)" radius={4} />
                            <Bar dataKey="kid" fill="var(--color-kid-barChart)" radius={4} />

                            <ChartLegend content={<ChartLegendContent />} />
                        </BarChart>
                    </ChartContainer>
                </CardContent>
            </Card>
        </div>
    );
};

export default BarChartForProduct;