import { createSlice } from "@reduxjs/toolkit";

const doctorsSlice = createSlice({
  name: "doctors",
  initialState: [],
  reducers: {
    allDoctors: (state, action) => {
      return action.payload;
    },
    addDoctor: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { allDoctors, addDoctor } = doctorsSlice.actions;
export default doctorsSlice.reducer;
