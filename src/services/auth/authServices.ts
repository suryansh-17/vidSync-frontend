import { AppDispatch } from "@/lib/store/store";
import Cookies from "js-cookie";
import {
  loginSuccess,
  logout as logoutAction,
} from "@/lib/store/features/authSlice";

export const login = async (
  dispatch: AppDispatch,
  payload: { username?: string; email?: string; password: string }
): Promise<boolean> => {
  try {
    const response = await fetch(
      "https://elwi9xjnlh.execute-api.ap-south-1.amazonaws.com/api/v1/users/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    const data = await response.json();

    if (response.ok) {
      // Store tokens in cookies
      Cookies.set("accessToken", data.data.accessToken, {
        secure: true,
        sameSite: "strict",
      });
      Cookies.set("refreshToken", data.data.refreshToken, {
        secure: true,
        sameSite: "strict",
      });

      dispatch(
        loginSuccess({
          accessToken: data.data.accessToken,
          refreshToken: data.data.refreshToken,
        })
      );
      return true; // Return true for successful login
    } else {
      console.error("Login failed", data.message);
      return false; // Return false for failed login
    }
  } catch (error) {
    console.error("Login failed", error);
    return false; // Return false in case of an error
  }
};

export const logout = async (dispatch: AppDispatch): Promise<boolean> => {
  try {
    const accessToken = Cookies.get("accessToken");

    const response = await fetch(
      "https://elwi9xjnlh.execute-api.ap-south-1.amazonaws.com/api/v1/users/logout",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (response.ok) {
      // Dispatch logout action to clear auth state
      dispatch(logoutAction());

      // Clear stored tokens from cookies
      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");

      return true; // Return true for successful logout
    } else {
      const data = await response.json();
      console.error("Logout failed", data.message);
      return false; // Return false for failed logout
    }
  } catch (error) {
    console.error("Logout failed", error);
    return false; // Return false in case of an error
  }
};
