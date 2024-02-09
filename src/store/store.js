/* eslint-disable perfectionist/sort-imports */
// eslint-disable-next-line import/no-extraneous-dependencies
import { configureStore } from "@reduxjs/toolkit";

import authSlice from "./slice/authSlice";
import productSlice from "./slice/productSlice";
import categoriesSlice from "./slice/categoriesSlice";
import userSlice from "./slice/userSlice";
import sizeSlice from "./slice/sizeSlice";


const store = configureStore({
  reducer: {
    auth: authSlice,
    product: productSlice,
    categories: categoriesSlice,
    user: userSlice,
    size: sizeSlice,
  },
});

export default store;
