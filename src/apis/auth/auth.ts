import { API_PATH } from "src/constants/api_path";
import { LoginPayload } from "src/domain/auth/auth";
import api from "../api";

export const loginApi = async (payload: LoginPayload) =>
  await api.post(API_PATH.auth.login, payload);
