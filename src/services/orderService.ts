import {axiosInstanceWithCredentials} from "@/api/axiosInstance.ts";

const SUB_URL: string = '/order';

export const getSalesCountByMonthAndYear = async (month: number, year: number) => {
    const response = await axiosInstanceWithCredentials.get(SUB_URL + '/all/sales-count/by-month-year', {
        params: {
            month: month,
            year: year
        }
    });
    return response.data;
}

export const getSalesCountOfAllMonths = async () => {
    const response = await axiosInstanceWithCredentials.get(SUB_URL + '/sales-count/of/all-months');
    return response.data.data;
}

export const getSalesCountOfDayRange = async (numberOfDays: number) => {
    const response = await axiosInstanceWithCredentials.get(SUB_URL + '/sales-count/of/day-range/' + numberOfDays);
    return response.data.data;
}

export const getSalesCountByDate = async (date: string) => {
    const response = await axiosInstanceWithCredentials.get(SUB_URL + '/sales-count/' + date);
    return response.data.data;
}

export const getMonthlySales = async (year: number, month: number) => {
    const response = await axiosInstanceWithCredentials.get(SUB_URL + '/monthly-sales', {
        params: {
            year: year,
            month: month
        }
    });
    return response.data.data;
}

export const getMonthlyRevenue = async (year: number, month: number) => {
    const response = await axiosInstanceWithCredentials.get(SUB_URL + '/monthly-revenue', {
        params: {
            year: year,
            month: month
        }
    });
    return response.data.data;
}