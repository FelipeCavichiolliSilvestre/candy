import { ActionReducerMapBuilder, createAsyncThunk } from "@reduxjs/toolkit";
import { AuthApi, ClientLoginBodyDTO } from "../../api";
import { AuthState, JWT_KEY } from "./shared";
import EncryptedStorage from "react-native-encrypted-storage";

async function loginFn(data: ClientLoginBodyDTO) {
  const res = await new AuthApi().clientLogin(data, { timeout: 1000 });

  const user = res.data;
  await EncryptedStorage.setItem(JWT_KEY, user.jwt);

  return user;
}

export const login = createAsyncThunk("auth/login", loginFn);

export function loginAddCases(builder: ActionReducerMapBuilder<AuthState>) {
  builder.addCase(login.pending, state => {
    state.status = "authenticating";
    state.user = null;
  });

  builder.addCase(login.rejected, state => {
    state.status = "disconnected";
    state.user = null;
  });

  builder.addCase(login.fulfilled, (state, action) => {
    state.status = "authenticated";
    state.user = action.payload;
  });
}
