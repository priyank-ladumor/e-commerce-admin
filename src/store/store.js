// eslint-disable-next-line import/no-extraneous-dependencies
import { configureStore } from "@reduxjs/toolkit";

import authSlice from "./slice/authSlice";


const store = configureStore({
  reducer: {
    auth: authSlice,
  },
});

export default store;
