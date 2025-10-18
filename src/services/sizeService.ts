import {axiosInstanceWithCredentials} from "../api/axiosInstance.ts";

const SUB_URL: string = '/size';

export const getAllSizes = async () => {
    const response = await axiosInstanceWithCredentials.get(SUB_URL + '/all/sizes');
    return response.data.data;
}

export const changeSizeStatus = async (id: number, isActive: 0 | 1) => {
    const response = await axiosInstanceWithCredentials.patch(`${SUB_URL}/status/change/${id}/${isActive}`);
    return response.data;
}

/*
export const addSize = async (sizeDTO: any) => {
    const response = await axiosInstanceWithCredentials.post(SUB_URL + '/add', sizeDTO);
    return response.data;
}*/
