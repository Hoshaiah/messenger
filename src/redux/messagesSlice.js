// src/redux/counterSlice.js
import { createSlice } from "@reduxjs/toolkit";

const messagesSlice = createSlice({
  name: "messages",
  initialState: {
    messageGroup: {},
    currentMessageView: '',
  },
  reducers: {
    updateMessage: (state, action) => {
      // state.messageGroup[action.payload.name] = [...state.messageGroup[action.payload.name], action.payload.message]
      let group = state.messageGroup[action.payload.name]
      if (!group) {
        state.messageGroup[action.payload.name] = [action.payload.message]
      } else {
        state.messageGroup[action.payload.name]= [...group, action.payload.message]
      }
    },
    updateCurrentMessageView: (state, action) => {
      state.currentMessageView = action.payload
    }
}})

export const { updateMessage, updateCurrentMessageView } = messagesSlice.actions;
export default messagesSlice.reducer;
