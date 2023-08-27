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
      let group = state.messageGroup[action.payload.id]
      if (!group) {
        state.messageGroup[action.payload.id] = [action.payload.message]
      } else {
        state.messageGroup[action.payload.id]= [...group, action.payload.message]
      }
    },
    updateCurrentMessageView: (state, action) => {
      state.currentMessageView = action.payload
    },
    loadMessages: (state, action) => {
      let group = state.messageGroup[action.payload.id]
      state.messageGroup[action.payload.id] = action.payload.messages
    }
}})

export const { updateMessage, updateCurrentMessageView, loadMessages } = messagesSlice.actions;
export default messagesSlice.reducer;
