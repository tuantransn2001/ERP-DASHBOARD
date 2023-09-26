export interface AuthState {
  isLoggedIn: boolean;
  isGettingMe: boolean;
  user_id: string;
  token: string;
  isLoading: false;
  setStateOnLoginSuccess: (payload: SetStateOnLoginSuccessPayload) => void;
}
export interface SetStateOnLoginSuccessPayload
  extends Partial<Omit<AuthState, "setStateOnLoginSuccess">> {
  access_token: string;
}
