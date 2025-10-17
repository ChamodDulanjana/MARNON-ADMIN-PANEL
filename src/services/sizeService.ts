import {axiosInstanceWithCredentials} from "../api/axiosInstance.ts";

const SUB_URL: string = '/size';

export const getAllSizes = async () => {
    const response = await axiosInstanceWithCredentials.get(SUB_URL + '/all/sizes');
    return response.data.data;
}

/*
export const addSize = async (sizeDTO: any) => {
    const response = await axiosInstanceWithCredentials.post(SUB_URL + '/add', sizeDTO);
    return response.data;
}*/
