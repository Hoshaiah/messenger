// src/redux/counterSlice.js
import { createSlice } from "@reduxjs/toolkit";

const currentuserSlice = createSlice({
  name: "currentuser",
  initialState: {
    authorization: '',
    userInfo: {},
  },
  reducers: {
    setAuthorization: (state, action) => {
      state.authorization = action.payload;
    },
    setCurrentUserInfo: (state, action) => {
      state.userInfo = action.payload
    },
  },
});

export const { setAuthorization, setCurrentUserInfo} = currentuserSlice.actions;
export default currentuserSlice.reducer;
