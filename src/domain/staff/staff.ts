import { PaginationPayload } from "../common/common";

export interface GetAllStaffPayload extends PaginationPayload {}
export interface IStaff {
  id: string;
  user_name: string;
  user_phone: string;
  createdAt: string;
  Staff: {
    id: string;
    staff_status: string;
  };
}
