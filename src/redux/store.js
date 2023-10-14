import { configureStore } from '@reduxjs/toolkit';
import currentuserReducer from "./currentuserSlice";
import messagesReducer from "./messagesSlice"


const store = configureStore({
  reducer: {
    currentuser: currentuserReducer,
    messages: messagesReducer,
  },
});

export default store;