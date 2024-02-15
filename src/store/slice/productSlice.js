// eslint-disable-next-line import/no-extraneous-dependencies
import { createSlice } from "@reduxjs/toolkit";

import { createProductAction, deleteProductAction, getFilterProductAction } from "../action/productAction";


const initialState = {
    createProductData: null,
    createProductMSG: null,
    createProductPending: false,
    getFilterProductDATA: null,
    getFilterProductPENDING: false,
    deleteProductMSG: false,
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

        builder.addCase(getFilterProductAction.pending, (state, { payload }) => {
            state.getFilterProductDATA = null;
            state.getFilterProductPENDING = true;
        })

        builder.addCase(getFilterProductAction.fulfilled, (state, { payload }) => {
            state.getFilterProductDATA = payload;
            state.getFilterProductPENDING = false;
        })

        builder.addCase(getFilterProductAction.rejected, (state, { payload }) => {
            state.getFilterProductDATA = null;
            state.getFilterProductPENDING = false;
        })

        builder.addCase(deleteProductAction.pending, (state, { payload }) => {
            state.deleteProductMSG = null;
        })

        builder.addCase(deleteProductAction.fulfilled, (state, { payload }) => {
            state.deleteProductMSG = payload;
        })

        builder.addCase(deleteProductAction.rejected, (state, { payload }) => {
            state.deleteProductMSG = null;
        })
    }
});

export default productSlice.reducer;
