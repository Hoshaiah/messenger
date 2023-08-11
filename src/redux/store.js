import { configureStore } from '@reduxjs/toolkit';
import counterReducer from "./counterSlice";
import currentuserReducer from "./currentuserSlice";


const store = configureStore({
  reducer: {
    counter: counterReducer,
    currentuser: currentuserReducer
  },
});

export default store;