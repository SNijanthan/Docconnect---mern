import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userAppointments: [],
  doctorAppointments: [],
};

const appointmentsSlice = createSlice({
  name: "appointments",
  initialState,
  reducers: {
    setUserAppointments: (state, action) => {
      state.userAppointments = action.payload;
    },
    setDoctorAppointments: (state, action) => {
      state.doctorAppointments = action.payload;
    },
    addAppointment: (state, action) => {
      state.userAppointments.push(action.payload);
    },
    updateAppointmentStatus: (state, action) => {
      const { id, status } = action.payload;
      const appointment = state.userAppointments.find((a) => a._id === id);
      if (appointment) appointment.bookingStatus = status;
    },
    updateDoctorAppointmentStatus: (state, action) => {
      const { id, status } = action.payload;
      const appointment = state.doctorAppointments.find((a) => a._id === id);
      if (appointment) appointment.bookingStatus = status;
    },
    removeAppointment: (state, action) => {
      state.userAppointments = state.userAppointments.filter(
        (appointment) => appointment._id !== action.payload,
      );
    },
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
  updateAppointmentStatus,
  updateDoctorAppointmentStatus,
  removeAppointment,
  clearAppointments,
} = appointmentsSlice.actions;

export default appointmentsSlice.reducer;
