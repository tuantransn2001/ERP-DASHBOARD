import { API_PATH } from "src/constants/api_path";
import { GetAllTagPayload } from "src/domain/tag/tag";
import api from "../api";

export const getAllTagApi = async (payload: GetAllTagPayload) =>
  await api.get(API_PATH.tag.getAll, {
    params: payload,
  });
