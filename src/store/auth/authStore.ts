import { create } from "zustand";
import { AuthState } from "./shared/authStore.interface";

export const useAuthStore = create<AuthState>()((set) => ({
  isLoggedIn: false,
  isGettingMe: false,
  user_id: "",
  token: "",
  isLoading: false,
  setStateOnLoginSuccess: (payload) => {
    return set(() => ({
      ...{
        token: payload.access_token,
        isGettingMe: payload.isGettingMe,
        isLoggedIn: payload.isLoggedIn,
      },
    }));
  },
}));

export const isGettingMeSelector = (state: AuthState) => state.isGettingMe;
export const userIdSelector = (state: AuthState) => state.user_id;
export const isLoadingSelector = (state: AuthState) => state.isLoading;
export const tokenSelector = (state: AuthState) => state.token;
export const isLoggedInSelector = (state: AuthState) => state.isLoggedIn;
