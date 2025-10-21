import {axiosInstanceWithCredentials} from "../api/axiosInstance.ts";

const SUB_URL: string = '/user';

export const getUserById = async (userId: number) => {
    const response = await axiosInstanceWithCredentials.get(SUB_URL + '/' + userId);
    return response.data;
}

export const updateByRegularUser = async (id: number, userDTO: any) => {
    const response = await axiosInstanceWithCredentials.patch(SUB_URL + '/regular/' + id, userDTO);
    return response.data;
}

export const getAllCustomersCount = async () => {
    const response = await axiosInstanceWithCredentials.get(SUB_URL + '/all/customers/count');
    return response.data.data;
}