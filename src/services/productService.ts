import {axiosInstanceWithCredentials} from '../api/axiosInstance.ts';
import type {PaginationDTO} from "@/models/PaginationDTO.ts";

const SUB_URL: string = '/product';

export const getPopularProductsForAdmin = async (paginationDTO: PaginationDTO) => {
    const response = await axiosInstanceWithCredentials.post(SUB_URL + '/all/admin/popular-products', paginationDTO);
    return response.data.data;
}