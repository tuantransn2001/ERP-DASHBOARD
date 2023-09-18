import { PaginationPayload } from "../common/common";

export interface GetAllCustomerPayload extends PaginationPayload {}
export interface ICustomer {
  id: string;
  user_name: string;
  user_code: string;
  user_phone: string;
  user_type: string;
  createdAt: string;
  CustSupp: {
    id: string;
    status: string;
    createdAt: string;
  };
}
