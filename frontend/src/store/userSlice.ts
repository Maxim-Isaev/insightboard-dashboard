import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  token: string | null;
  email: string | null;
  id: number | null;
}

const initialState: UserState = {
  token: localStorage.getItem("token"),
  email: null,
  id: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ token: string; email: string; id: number }>,
    ) => {
      state.token = action.payload.token;
      state.email = action.payload.email;
      state.id = action.payload.id;
      localStorage.setItem("token", action.payload.token);
    },
    logout: (state) => {
      state.token = null;
      state.email = null;
      state.id = null;
      localStorage.removeItem("token");
    },
  },
});

export const { setCredentials, logout } = userSlice.actions;
export default userSlice.reducer;
