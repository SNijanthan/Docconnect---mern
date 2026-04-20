import { createSlice } from "@reduxjs/toolkit";

// ── Load persisted auth from localStorage on app start ──────────────────────
const loadAuthFromStorage = () => {
  try {
    const serialized = localStorage.getItem("docconnect_auth");
    if (!serialized) return null;
    return JSON.parse(serialized);
  } catch {
    return null;
  }
};

const persisted = loadAuthFromStorage();

const initialState = {
  isAuthenticated: persisted?.isAuthenticated ?? false,
  user: persisted?.user ?? null,
  role: persisted?.role ?? null,
};

// ── Slice ────────────────────────────────────────────────────────────────────
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.role = action.payload.role;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.role = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
