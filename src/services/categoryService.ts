import {axiosInstanceWithCredentials} from "../api/axiosInstance.ts";
import type {PaginationDTO} from "@/models/PaginationDTO.ts";
import type {CategorySaveDTO} from "@/models/CategorySaveDTO.ts";

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

export const getById = async (id: number) => {
    const response = await axiosInstanceWithCredentials.get(`${SUB_URL}/${id}`);
    return response.data;
}

export const saveCategory = async (categoryDTO: CategorySaveDTO) => {
    const response = await axiosInstanceWithCredentials.post(SUB_URL, categoryDTO);
    return response.data;
}

export const updateCategory = async (id: number, categoryDTO: CategorySaveDTO) => {
    const response = await axiosInstanceWithCredentials.patch(`${SUB_URL}/${id}`, categoryDTO);
    return response.data;
}