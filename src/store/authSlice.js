import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userAuthToken: null,
  bookingData: null ,
  hotelSearchData: null
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
    }
  },
});

export const { setToken, setBookData,setHotelSearchData } = authSlice.actions;

export default authSlice.reducer;
