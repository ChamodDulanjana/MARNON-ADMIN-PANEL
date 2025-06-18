import {axiosInstanceWithCredentials} from "@/api/axiosInstance.ts";

const SUB_URL: string = '/auth';

export const logout = async () => {
    const response = await axiosInstanceWithCredentials.patch(SUB_URL + '/logout');
    return response.data;
}