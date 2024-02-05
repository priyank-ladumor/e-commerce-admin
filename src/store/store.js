// eslint-disable-next-line import/no-extraneous-dependencies
import { configureStore } from "@reduxjs/toolkit";

import authSlice from "./slice/authSlice";
import productSlice from "./slice/productSlice";


const store = configureStore({
  reducer: {
    auth: authSlice,
    product: productSlice,
  },
});

export default store;
