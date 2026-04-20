import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import appointmentReducer from "./slices/appointmentSlice";
import doctorsReducer from "./slices/doctorsSlice";

const saveAuthToStorage = (authState) => {
  const serialized = JSON.stringify(authState);
  localStorage.setItem("docconnect_auth", serialized);
};

const clearAuthFromStorage = () => {
  localStorage.removeItem("docconnect_auth");
};

const store = configureStore({
  reducer: {
    auth: authReducer,
    appointments: appointmentReducer,
    doctors: doctorsReducer,
  },
});

let previousAuth = store.getState().auth;

store.subscribe(() => {
  const currentAuth = store.getState().auth;

  if (currentAuth === previousAuth) return;
  previousAuth = currentAuth;

  if (currentAuth.isAuthenticated) {
    saveAuthToStorage(currentAuth);
  } else {
    clearAuthFromStorage();
  }
});

export default store;
