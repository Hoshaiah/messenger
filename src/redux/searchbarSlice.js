// src/redux/counterSlice.js
import { createSlice } from "@reduxjs/toolkit";

const currentuserSlice = createSlice({
  name: "searchbar",
  initialState: {
    onFocus: true
  },
  reducers: {
    toggleFocus: (state, action) => {
        state.onFocus = action.payload;
    },
  },
});

export const { setAuthorization } = currentuserSlice.actions;
export default currentuserSlice.reducer;
