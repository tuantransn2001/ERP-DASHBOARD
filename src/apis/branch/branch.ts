import { API_PATH } from "src/constants/api_path";
import { GetAllBranchPayload } from "src/domain/branch/branch";

import api from "../api";

export const getAllBranchApi = async (payload: GetAllBranchPayload) =>
  await api.get(API_PATH.branch.getAll, {
    params: payload,
  });
