import {
  IJunctionTag,
  IUser,
  IUserAddress,
  PaginationPayload,
} from "../common/common";

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

export interface ICustomerDetail extends IUser {
  UserAddresses: IUserAddress[];
  CustSupp: {
    id: string;
    staff_in_charge_note: string;
    status: string;
    Staff: {
      id: string;
      User: Partial<IUser>;
    };
    CustSuppTags: IJunctionTag[];
  };
}

export interface CreateCustomerPayload {
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
