import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  role: "",
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload.user;
      state.role = action.payload.role;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.role = "";
      state.isAuthenticated = false;
    },
  },
});

export const { login, logout } = authSlice.reducer;
export default authSlice.actions;
