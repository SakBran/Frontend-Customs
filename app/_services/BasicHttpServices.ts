import { PaginationType } from '../_models/PaginationType';
import axiosInstance from './AxiosInstance';


export const Get = async (url: string): Promise<PaginationType> => {
  const resp = await axiosInstance.get(url);
  const data = await resp.data;
  const responseData: PaginationType = JSON.parse(JSON.stringify(data));
  return responseData;
};

export const GetSingle = async (url: string): Promise<any> => {
  const resp = await axiosInstance.get(url);
  const data = await resp.data;
  const responseData: PaginationType = JSON.parse(JSON.stringify(data));
  return responseData;
};

export const Post = async (url: string, data: unknown): Promise<any> => {
  const resp = await axiosInstance.post(url, data);
  const temp = await resp.data;
  const responseData: PaginationType = JSON.parse(JSON.stringify(temp));
  return responseData;
};

export const Put = async (
  url: string,
  id: string,
  data: unknown
): Promise<any> => {
  const jsonObject = data as { [key: string]: unknown };
  jsonObject.id = id;
  const resp = await axiosInstance.put(url + '/' + id, jsonObject);
  const temp = await resp.data;
  const responseData: PaginationType = JSON.parse(JSON.stringify(temp));
  return responseData;
};

export const Delete = async (url: string, id: string): Promise<any> => {
  const resp = await axiosInstance.delete(url + '/' + id);
  const temp = await resp.data;
  const responseData: PaginationType = JSON.parse(JSON.stringify(temp));
  return responseData;
};

export const CheckExistingRegistration = async (): Promise<boolean> => {
  const resp = await axiosInstance.get("Common/CheckExistingRegistration");
  const data = await resp.data;
  const responseData: boolean = JSON.parse(JSON.stringify(data));
  return responseData;
};

export const GetIdForExtenstion = async (): Promise<string> => {
  const resp = await axiosInstance.get("Common/GetIdForExtenstion");
  const data = await resp.data;
  const responseData: string = JSON.parse(JSON.stringify(data));
  return responseData;
};

export const CheckValidDateForExtension = async (id: string): Promise<boolean> => {
  const resp = await axiosInstance.get("Common/CheckValidDateForExtension?id=" + id);
  const data = await resp.data;
  const responseData: boolean = JSON.parse(JSON.stringify(data));
  return responseData;
};

export const CheckValidDateForAmend = async (id: string): Promise<boolean> => {
  const resp = await axiosInstance.get("Common/CheckValidDateForAmend?id=" + id);
  const data = await resp.data;
  const responseData: boolean = JSON.parse(JSON.stringify(data));
  return responseData;
};

