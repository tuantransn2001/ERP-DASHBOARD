import { API_PATH } from "src/constants/api_path";
import { GetAllCustomerPayload } from "src/domain/customer/customer";
import api from "../api";

export const getAllCustomer = async (payload: GetAllCustomerPayload) =>
  await api.get(API_PATH.customer.getAll, {
    params: payload,
  });

export const createCustomer = async () => {};
