import { API_PATH } from "src/constants/api_path";
import api from "../api";

export const getAllChangeLogsApi = async (id: string) =>
  await api.get(API_PATH.debt.getAll + `/${id}?page_number=1&page_size=200`);
