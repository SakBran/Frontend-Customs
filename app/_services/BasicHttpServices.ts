import Swal from 'sweetalert2';
import { PaginationType } from '../_models/PaginationType';
import axiosInstance from './AxiosInstance';

export const Get = async (url: string): Promise<PaginationType> => {
    const resp = await axiosInstance.get(url);
    if (resp.status < 200 || resp.status >= 300) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!'
        });
    }
    const data = await resp.data;
    const responseData: PaginationType = JSON.parse(JSON.stringify(data));
    return responseData;
};

export const GetSingle = async (url: string): Promise<any> => {
    const resp = await axiosInstance.get(url);
    if (resp.status < 200 || resp.status >= 300) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!'
        });
    }
    const data = await resp.data;
    const responseData: PaginationType = JSON.parse(JSON.stringify(data));
    return responseData;
};

export const Post = async (url: string, data: unknown): Promise<any> => {
    const resp = await axiosInstance.post(url, data);
    if (resp.status < 200 || resp.status >= 300) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!'
        });
    }
    const temp = await resp.data;
    const responseData: PaginationType = JSON.parse(JSON.stringify(temp));
    return responseData;
};

export const Put = async (url: string, id: string, data: unknown): Promise<any> => {
    const jsonObject = data as { [key: string]: unknown };
    jsonObject.id = id;
    const resp = await axiosInstance.put(url + '/' + id, jsonObject);
    if (resp.status < 200 || resp.status >= 300) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!'
        });
    }
    const temp = await resp.data;
    const responseData: PaginationType = JSON.parse(JSON.stringify(temp));
    return responseData;
};

export const Delete = async (url: string, id: string): Promise<any> => {
    const resp = await axiosInstance.delete(url + '/' + id);
    if (resp.status < 200 || resp.status >= 300) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!'
        });
    } else {
        Swal.fire({
            icon: 'success',
            title: 'Deleted',
            text: 'Successfully Deleted!'
        });
    }
    const temp = await resp.data;
    const responseData: PaginationType = JSON.parse(JSON.stringify(temp));
    return responseData;
};
