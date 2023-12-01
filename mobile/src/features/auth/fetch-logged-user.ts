import { ActionReducerMapBuilder, createAsyncThunk } from "@reduxjs/toolkit";
import EncryptedStorage from "react-native-encrypted-storage";
import { ClientsApi } from "../../api";
import { AuthState, JWT_KEY } from "./shared";

async function fetchLoggedUserFn() {
  const jwt = await EncryptedStorage.getItem(JWT_KEY);

  if (jwt === null) {
    return null;
  }

  const res = await new ClientsApi({ accessToken: jwt }).getMe();

  return { ...res.data, jwt };
}

export const fetchLoggedUser = createAsyncThunk(
  "auth/checkForLoggedUser",
  fetchLoggedUserFn,
);

export function fetchLoggedUserAddCases(
  builder: ActionReducerMapBuilder<AuthState>,
) {
  builder.addCase(fetchLoggedUser.pending, state => {
    state.status = "pending";
    state.user = null;
  });

  builder.addCase(fetchLoggedUser.rejected, state => {
    state.status = "disconnected";
    state.user = null;
  });

  builder.addCase(fetchLoggedUser.fulfilled, (state, action) => {
    if (action.payload === null) {
      state.status = "disconnected";
      state.user = null;
    } else {
      state.status = "authenticated";
      state.user = action.payload;
    }
  });
}
