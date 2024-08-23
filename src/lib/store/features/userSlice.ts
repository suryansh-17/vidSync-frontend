import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User {
  id: string;
  username: string;
  email: string;
  fullName: string;
  avatar: string;
  coverImage?: string;
  watchHistory: string[];
  createdAt: string;
  updatedAt: string;
}

const initialState: User = {
  id: "",
  username: "",
  email: "",
  fullName: "",
  avatar: "",
  watchHistory: [],
  createdAt: "",
  updatedAt: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.id = action.payload.id;
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.fullName = action.payload.fullName;
      state.avatar = action.payload.avatar;
      state.coverImage = action.payload.coverImage;
      state.watchHistory = action.payload.watchHistory;
      state.createdAt = action.payload.createdAt;
      state.updatedAt = action.payload.updatedAt;
    },
    clearUser: (state) => {
      state.id = "";
      state.username = "";
      state.email = "";
      state.fullName = "";
      state.avatar = "";
      state.coverImage = "";
      state.watchHistory = [];
      state.createdAt = "";
      state.updatedAt = "";
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
