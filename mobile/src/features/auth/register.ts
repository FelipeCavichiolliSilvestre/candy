import { ActionReducerMapBuilder, createAsyncThunk } from "@reduxjs/toolkit";
import { ClientsApi, CreateClientBodyDTO } from "../../api";
import { AuthState, JWT_KEY } from "./shared";
import EncryptedStorage from "react-native-encrypted-storage";

async function registerFn(data: CreateClientBodyDTO) {
  const response = await new ClientsApi().create(data);
  const user = response.data;
  await EncryptedStorage.setItem(JWT_KEY, user.jwt);

  return user;
}

export const register = createAsyncThunk("auth/register", registerFn);

export function registerAddCases(builder: ActionReducerMapBuilder<AuthState>) {
  builder.addCase(register.pending, state => {
    state.status = "authenticating";
    state.user = null;
  });

  builder.addCase(register.rejected, state => {
    state.status = "disconnected";
    state.user = null;
  });

  builder.addCase(register.fulfilled, (state, action) => {
    state.status = "authenticated";
    state.user = action.payload;
  });
}
