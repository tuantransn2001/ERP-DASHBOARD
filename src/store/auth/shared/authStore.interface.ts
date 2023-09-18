export interface SetStateOnLoginSuccessPayload {
  access_token: string;
}

export interface AuthState {
  isLoggedIn: boolean;
  isGettingMe: boolean;
  user_id: string;
  token: string;
  isLoading: false;
  setStateOnLoginSuccess: (payload: SetStateOnLoginSuccessPayload) => void;
}
