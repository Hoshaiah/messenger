import { configureStore } from '@reduxjs/toolkit';
import counterReducer from "./counterSlice";
import currentuserReducer from "./currentuserSlice";
import messagesReducer from "./messagesSlice"


const store = configureStore({
  reducer: {
    counter: counterReducer,
    currentuser: currentuserReducer,
    messages: messagesReducer,
  },
});

export default store;