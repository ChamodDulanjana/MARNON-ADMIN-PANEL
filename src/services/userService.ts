import {axiosInstanceWithCredentials} from "../api/axiosInstance.ts";
import type {PaginationDTO} from "@/models/PaginationDTO.ts";

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

export const searchUserByPagination = async (
    searchTerm: string,
    status: 'active' | 'inactive' | 'all',
    paginationDTO: PaginationDTO,
) => {
    const response = await axiosInstanceWithCredentials.post(`${SUB_URL}/search/by/pagination`,
        paginationDTO,
        {
            params: {
                searchTerm: searchTerm,
                status: status,
            }
        }
    );
    return response.data.data;
}

export const changeUserStatus = async (id: number, isActive: 0 | 1) => {
    const response = await axiosInstanceWithCredentials.patch(`${SUB_URL}/status/change/${id}/${isActive}`);
    return response.data;
}