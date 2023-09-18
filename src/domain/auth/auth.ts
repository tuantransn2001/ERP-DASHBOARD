export interface LoginPayload {
  phone: string;
  password: string;
}
export interface LoginResponse {
  expiredIn: string;
  access_token: string;
}
