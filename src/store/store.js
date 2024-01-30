// eslint-disable-next-line import/no-extraneous-dependencies
import { configureStore } from "@reduxjs/toolkit";

import authSlice from "./slice/authSlice";
import colorSlice from "./slice/colorSlice";


const store = configureStore({
  reducer: {
    auth: authSlice,
    color: colorSlice,
  },
});

export default store;
