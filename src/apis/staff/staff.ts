import { API_PATH } from "src/constants/api_path";
import { GetAllStaffPayload } from "src/domain/staff/staff";
import api from "../api";

export const getAllStaffApi = async (payload: GetAllStaffPayload) =>
  await api.get(API_PATH.staff.getAll, {
    params: payload,
  });
