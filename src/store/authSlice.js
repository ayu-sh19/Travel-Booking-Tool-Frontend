import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bookingData: null,
  hotelSearchData: null,
  theme: null,
  userData: null,
  status: false,
};
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.status = true;
      state.userData = action.payload;
    },
    logout: (state, action) => {
      state.status = false;
      state.userData = null;
    },
    setBookData: (state, action) => {
      state.bookingData = action.payload;
    },
    setHotelSearchData: (state, action) => {
      state.hotelSearchData = action.payload;
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
  },
});

export const { login, logout, setBookData, setHotelSearchData, setTheme } =
  authSlice.actions;

export default authSlice.reducer;
