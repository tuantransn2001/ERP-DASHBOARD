import { PaginationPayload } from "../common/common";

export interface GetAllTagPayload extends PaginationPayload {}
export interface ITag {
  id: string;
  tag_title: string;
  tag_description: string;
  isDelete?: string;
  createdAt?: string;
  updatedAt?: string;
}
