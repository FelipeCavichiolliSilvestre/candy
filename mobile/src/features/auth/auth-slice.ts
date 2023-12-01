import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { AuthState } from "./shared";
import { fetchLoggedUser, fetchLoggedUserAddCases } from "./fetch-logged-user";
import { login, loginAddCases } from "./login";
import { logout, logoutAddCases } from "./logout";
import { register, registerAddCases } from "./register";

const initialState: AuthState = {
  status: "pending",
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers(builder) {
    fetchLoggedUserAddCases(builder);
    loginAddCases(builder);
    logoutAddCases(builder);
    registerAddCases(builder);
  },
});

const selectAuthStatus = (state: RootState) => state.auth.status;

export { selectAuthStatus };
export { fetchLoggedUser, login, logout, register };

export default authSlice.reducer;
