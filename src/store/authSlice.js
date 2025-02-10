import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userAuthToken: null,
  bookingData: null 
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
    }
  },
});

export const { setToken, setBookData } = authSlice.actions;

export default authSlice.reducer;
