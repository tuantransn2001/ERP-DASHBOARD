import { ITag } from "../tag/tag";

export interface PaginationPayload {
  page_number: number;
  page_size: number;
  search?: string;
}
export interface IUserAddress {
  id: string;
  user_province: string;
  user_district: string;
  user_specific_address: string;
  updatedAt: string;
  createdAt: string;
}

export interface IUser {
  id: string;
  user_name: string;
  user_phone: string;
  user_email: string;
  user_code: string;
  user_type: string;
  createdAt: string;
  updatedAt: string;
}

export interface IJunctionTag {
  id: string;
  tag_id: string;
  Tag: Partial<ITag>;
}
