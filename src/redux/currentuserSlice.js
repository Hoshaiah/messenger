// src/redux/counterSlice.js
import { createSlice } from "@reduxjs/toolkit";

const currentuserSlice = createSlice({
  name: "currentuser",
  initialState: {
    authorization: '',
    id: '',
  },
  reducers: {
    setAuthorization: (state, action) => {
        state.authorization = action.payload;
    },
  },
});

export const { setAuthorization } = currentuserSlice.actions;
export default currentuserSlice.reducer;
