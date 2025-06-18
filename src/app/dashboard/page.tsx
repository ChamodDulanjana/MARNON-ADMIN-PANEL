import LoadingAnimation from "@/components/loading-animation/page";
import {Button} from "@/components/ui/button.tsx";
import NotFound from "@/pages/notFound.tsx";
import {useQuery} from "@tanstack/react-query";
import {getMonthlyRevenue, getMonthlySales, getSalesCountByDate} from "@/services/userProductService.ts";
import {getAllCustomersCount} from "@/services/userService.ts";

const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth() + 1; // Months are 0-indexed in JavaScript, so we add 1

const Dashboard = () => {const getAllInfoCardsData = async () => {
    const [totalCustomers, todayOrders, monthlySales, monthlyRevenue] = await Promise.all([
        getAllCustomersCount(),
        getSalesCountByDate(today),
        getMonthlySales(currentYear, currentMonth),
        getMonthlyRevenue(currentYear, currentMonth),
    ]);

    return {
        totalCustomers,
        todayOrders,
        monthlySales,
        monthlyRevenue,
    };
}

    // Use react-query to fetch Total Customers
    const {
        isLoading,
        isError,
        data: infoCardsData,
    } = useQuery({
        queryKey: ['info-cards'],
        queryFn: () => getAllInfoCardsData(),
    });

    if (isLoading) return <LoadingAnimation />;
    if (isError)   return <NotFound />;

    return (
        <div>
            <Button>
                Admin Dashboard
            </Button>
        </div>
    );
};

export default Dashboard;