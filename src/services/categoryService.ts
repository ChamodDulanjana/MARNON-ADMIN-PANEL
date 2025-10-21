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