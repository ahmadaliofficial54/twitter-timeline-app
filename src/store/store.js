import { configureStore } from "@reduxjs/toolkit";
import twitterSlice from "./twitterSlice";
const store = configureStore({
  reducer: {
    twitterStore: twitterSlice,
  },
});
export default store;
