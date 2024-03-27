/* eslint-disable perfectionist/sort-imports */
// eslint-disable-next-line import/no-extraneous-dependencies
import { configureStore } from "@reduxjs/toolkit";

import authSlice from "./slice/authSlice";
import productSlice from "./slice/productSlice";
import categoriesSlice from "./slice/categoriesSlice";
import userSlice from "./slice/userSlice";
import sizeSlice from "./slice/sizeSlice";
import orderSlice from "./slice/orderSlice";
import bannerLogoSlice from "./slice/bannerLogoSlice";


const store = configureStore({
  reducer: {
    auth: authSlice,
    product: productSlice,
    categories: categoriesSlice,
    user: userSlice,
    size: sizeSlice,
    order: orderSlice,
    bannerLogo: bannerLogoSlice,
  },
});

export default store;
