import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice.js";
import doctorsReducer from "./doctorsSlice.js";

const store = configureStore({
  reducer: {
    auth: authReducer,
    doctors: doctorsReducer,
  },
});

export default store;
