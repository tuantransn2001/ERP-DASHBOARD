import { API_PATH } from "src/constants/api_path";
import { GetAllCustomerPayload } from "src/domain/customer/customer";
import { CreateCustomerDTO } from "src/utils/postApiBodyCheck/customer/shared/customer.interface";
import api from "../api";

export const getAllCustomerApi = async (payload: GetAllCustomerPayload) =>
  await api.get(API_PATH.customer.getAll, {
    params: payload,
  });

export const createCustomerApi = async (payload: CreateCustomerDTO) =>
  await api.post(API_PATH.customer.create, payload);

export const getCustomerByIdApi = async (id: string) =>
  await api.get(API_PATH.customer.getById + `/${id}`);
