import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userAppointments: [],
  doctorAppointments: [],
};

const appointmentsSlice = createSlice({
  name: "appointments",
  initialState,
  reducers: {
    // set all user appointments
    setUserAppointments: (state, action) => {
      state.userAppointments = action.payload;
    },
    // set all received doctor appointments
    setDoctorAppointments: (state, action) => {
      state.doctorAppointments = action.payload;
    },
    // User books appointment
    addAppointment: (state, action) => {
      state.userAppointments.push(action.payload);
    },
    // Clear on logout
    clearAppointments: (state) => {
      state.userAppointments = [];
      state.doctorAppointments = [];
    },
  },
});

export const {
  setUserAppointments,
  setDoctorAppointments,
  addAppointment,
  clearAppointments,
} = appointmentsSlice.actions;

export default appointmentsSlice.reducer;
