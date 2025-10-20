import {axiosInstanceWithCredentials} from "../api/axiosInstance.ts";
import type {PaginationDTO} from "@/models/PaginationDTO.ts";
import type {SizeSaveDTO} from "@/models/size/SizeSaveDTO.ts";

const SUB_URL: string = '/size';

export const getAllSizes = async () => {
    const response = await axiosInstanceWithCredentials.get(SUB_URL + '/all/sizes');
    return response.data.data;
}

export const changeSizeStatus = async (id: number, isActive: 0 | 1) => {
    const response = await axiosInstanceWithCredentials.patch(`${SUB_URL}/status/change/${id}/${isActive}`);
    return response.data;
}

export const getAllSizesByPagination = async (paginationDTO: PaginationDTO) => {
    const response = await axiosInstanceWithCredentials.post(SUB_URL + '/all/sizes/by/pagination', paginationDTO);
    return response.data.data;
}

export const searchSizesByPagination = async (
    searchTerm: string,
    status: 'active' | 'inactive' | 'all',
    paginationDTO: PaginationDTO,
    ) => {
    const response = await axiosInstanceWithCredentials.post(`${SUB_URL}/search/sizes/by/pagination`,
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

export const getSizesByStatusAndPagination = async (isActive: 0 | 1, paginationDTO: PaginationDTO) => {
    const response = await axiosInstanceWithCredentials.post(`${SUB_URL}/by/status/and/pagination/${isActive}`, paginationDTO);
    return response.data.data;
}

export const saveSize = async (sizeDTO: SizeSaveDTO) => {
    const response = await axiosInstanceWithCredentials.post(SUB_URL, sizeDTO);
    return response.data;
}
