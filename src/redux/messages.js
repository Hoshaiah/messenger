// src/redux/counterSlice.js
import { createSlice } from "@reduxjs/toolkit";

const messagesSlice = createSlice({
  name: "messages",
  initialState: {
    messageGroup: {},
  },
  reducers: {
    updateMessage: (state, action) => {
        state.messageGroup[action.payload.name] = [...state.messageGroup[action.payload.name], action.payload.message]
    },
}})

export const { updateMessage } = messagesSlice.actions;
export default messagesSlice.reducer;
