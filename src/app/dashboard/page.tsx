import LoadingAnimation from "@/components/loading-animation/page";
import NotFound from "@/pages/notFound.tsx";
import {useQuery} from "@tanstack/react-query";
import {getMonthlyRevenue, getMonthlySales, getSalesCountByDate} from "@/services/orderService.ts";
import {getAllCustomersCount} from "@/services/userService.ts";
import AreaChart from "@/components/area-chart/page.tsx";
import BarChart from "@/components/bar-chart/page.tsx";
import PieChart from "@/components/pie-chart/page.tsx";
import TablePopularProducts from "@/components/table-popular-products/page";
import {Tooltip} from "@heroui/react";
import {HiMiniUsers} from "react-icons/hi2";
import {BsFillHandbagFill} from "react-icons/bs";
import {AiFillDollarCircle} from "react-icons/ai";
import {FaHandHoldingDollar} from "react-icons/fa6";
import {formatNumber} from "@/util/formatNumber.ts";

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
        <div className="w-full flex-1 flex flex-col gap-4">

            {/* First Information cards */}
            <div className="bg-white flex flex-wrap font-poppins   gap-4">

                {/*1st card*/}
                <div className="min-w-60 p-4  rounded-lg shadow-md bg-blue-100 border border-gray-200">
                    <h2 className="text-[13px] font-normal mb-2 text-gray-600 flex gap-1">
                        <HiMiniUsers className='mt-[2px]'/>
                        Total Customers
                    </h2>
                    <Tooltip content={Intl.NumberFormat().format(infoCardsData?.totalCustomers)} placement={'bottom-start'}>
                        <p className='text-lg font-bold text-blue-600'>{formatNumber(infoCardsData?.totalCustomers)}</p>
                    </Tooltip>
                </div>

                {/*2st card*/}
                <div className="min-w-60 p-4  rounded-lg shadow-md bg-yellow-100 border border-gray-200">
                    <h2 className="text-[13px] font-normal mb-2 text-gray-600 flex gap-1">
                        <BsFillHandbagFill className='mt-[2px]'/>
                        Today Orders
                    </h2>
                    <Tooltip content={Intl.NumberFormat().format(infoCardsData?.todayOrders)} placement={'bottom-start'}>
                        <p className='text-lg font-bold text-yellow-600'>{formatNumber(infoCardsData?.todayOrders)}</p>
                    </Tooltip>
                </div>

                {/*3st card*/}
                <div className="min-w-60 p-4  rounded-lg shadow-md bg-red-100 border border-gray-200">
                    <h2 className="text-[13px] font-normal mb-2 text-gray-600 flex gap-1">
                        <AiFillDollarCircle className='mt-[2px]'/>
                        Monthly sales
                    </h2>
                    <Tooltip content={Intl.NumberFormat().format(infoCardsData?.monthlySales)} placement={'bottom-start'}>
                        <p className='text-lg font-bold text-red-600'><span className='mr-2'>LKR</span>{formatNumber(infoCardsData?.monthlySales)}</p>
                    </Tooltip>
                </div>

                {/*4st card*/}
                <div className="min-w-60 p-4  rounded-lg shadow-md bg-green-100 border border-gray-200">
                    <h2 className="text-[13px] font-normal mb-2 text-gray-600 flex gap-1">
                        <FaHandHoldingDollar className='mt-[2px]'/>
                        Monthly Revenue
                    </h2>
                    <Tooltip content={Intl.NumberFormat().format(infoCardsData?.monthlyRevenue)} placement={'bottom-start'}>
                        <p className='text-lg font-bold text-green-600'><span className='mr-2'>LKR</span>{formatNumber(infoCardsData?.monthlyRevenue)}</p>
                    </Tooltip>
                </div>

            </div>

            {/*Area Chart*/}
            <AreaChart />

            {/*Bar chart*/}
            <BarChart />

            {/*Pie Chart & Popular-products-table*/}
            <div className="w-full flex flex-col min-[1260px]:flex-row gap-6 mt-6">
                <PieChart />
                <TablePopularProducts />
            </div>
        </div>
    );
};

export default Dashboard;