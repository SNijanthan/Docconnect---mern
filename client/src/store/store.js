import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice.js";
import doctorsReducer from "./slices/doctorsSlice.js";

const store = configureStore({
  reducer: {
    auth: authReducer,
    doctors: doctorsReducer,
  },
});

export default store;
