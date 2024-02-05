// eslint-disable-next-line import/no-extraneous-dependencies
import { configureStore } from "@reduxjs/toolkit";

import authSlice from "./slice/authSlice";
import productSlice from "./slice/productSlice";
import categoriesSlice from "./slice/categoriesSlice";


const store = configureStore({
  reducer: {
    auth: authSlice,
    product: productSlice,
    categories: categoriesSlice,
  },
});

export default store;
