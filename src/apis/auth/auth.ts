import api from "../api";
import { API_PATH } from "src/constants/api_path";
import { LoginPayload } from "src/domain/auth/auth";
export const loginApi = async (payload: LoginPayload) => {
  console.log({ object: payload });
  console.log({ json: JSON.stringify(payload) });
  return await api.post(API_PATH.auth.login, payload);
};
