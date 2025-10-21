import {axiosInstanceWithCredentials} from "../api/axiosInstance.ts";
import type {PaginationDTO} from "@/models/PaginationDTO.ts";

const SUB_URL: string = '/category';

export const searchCategoryByPagination = async (
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

export const changeCategoryStatus = async (id: number, isActive: 0 | 1) => {
    const response = await axiosInstanceWithCredentials.patch(`${SUB_URL}/status/change/${id}/${isActive}`);
    return response.data;
}