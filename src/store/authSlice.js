import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userAuthToken: null,
  bookingData: null ,
  hotelSearchData: null,
  theme: null
};
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.userAuthToken = action.payload;
    },
    setBookData: (state,action) => {
      state.bookingData = action.payload
    },
    setHotelSearchData: (state,action) => {
      state.hotelSearchData = action.payload;
    },
    setTheme: (state,action) => {
      state.theme = action.payload;
    }
  },
});

export const { setToken, setBookData,setHotelSearchData, setTheme } = authSlice.actions;

export default authSlice.reducer;
