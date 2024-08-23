import { configureStore } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import authReducer, { AuthState } from "./features/authSlice";
import userReducer, { User } from "./features/userSlice";

const getInitialAuthState = (): AuthState => {
  if (typeof window !== "undefined") {
    const accessToken = Cookies.get("accessToken");
    const refreshToken = Cookies.get("refreshToken");
    if (accessToken && refreshToken) {
      const isAuthenticated = true;
      return { accessToken, refreshToken, isAuthenticated };
    }
  }
  return { accessToken: null, refreshToken: null, isAuthenticated: false };
};

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
      user: userReducer,
      // ... other reducers
    },
    preloadedState: {
      auth: getInitialAuthState(),
      // ... other initial states if needed
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
