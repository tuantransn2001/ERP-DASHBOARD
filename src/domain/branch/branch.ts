import { PaginationPayload } from "../common/common";

export interface GetAllBranchPayload extends PaginationPayload {}
export interface IBranch {
  id: string;
  agency_branch_name: string;
  agency_branch_phone: string;
  agency_branch_code: string;
  agency_branch_address: string;
  agency_branch_area: string;
  agency_branch_expiration_date: string;
  agency_branch_status: string;
  createdAt: string;
  updatedAt: string;
  isDefaultCN: boolean;
  isDelete: boolean;
}
