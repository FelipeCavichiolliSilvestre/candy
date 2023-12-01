import { ActionReducerMapBuilder, createAsyncThunk } from "@reduxjs/toolkit";
import { AuthState, JWT_KEY } from "./shared";
import EncryptedStorage from "react-native-encrypted-storage";

async function logoutFn() {
  await EncryptedStorage.removeItem(JWT_KEY);
}

export const logout = createAsyncThunk("auth/logout", logoutFn);

export function logoutAddCases(builder: ActionReducerMapBuilder<AuthState>) {
  builder.addCase(logout.pending, state => {
    state.status = "disconnecting";
  });

  builder.addCase(logout.rejected, state => {
    state.status = "authenticated";
  });

  builder.addCase(logout.fulfilled, state => {
    state.status = "disconnected";
    state.user = null;
  });
}
