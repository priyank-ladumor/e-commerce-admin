// eslint-disable-next-line import/no-extraneous-dependencies
import { createSlice } from "@reduxjs/toolkit";

import { createProductAction } from "../action/productAction";


const initialState = {
    createProductData: null,
    createProductMSG: null,
    createProductPending: false,
};

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {

        builder.addCase(createProductAction.pending, (state, { payload }) => {
            state.createProductData = null;
            state.createProductMSG = null;
            state.createProductPending = true;
        })

        builder.addCase(createProductAction.fulfilled, (state, { payload }) => {
            state.createProductData = payload;
            state.createProductMSG = null;
            state.createProductPending = false;
        })

        builder.addCase(createProductAction.rejected, (state, { payload }) => {
            state.createProductData = null;
            state.createProductMSG = payload;
            state.createProductPending = false;
        })
    }
});

export default productSlice.reducer;
