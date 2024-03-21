/* eslint-disable perfectionist/sort-named-imports */
/* eslint-disable perfectionist/sort-imports */
// eslint-disable-next-line import/no-extraneous-dependencies
import { createSlice } from "@reduxjs/toolkit";
import { CancelOrderAction, getAllOrderAction } from "../action/orderAction";



const initialState = {
    getAllOrderPENDING: false,
    getAllOrderDATA: null,
    CancelOrderMSG: null,
};

const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {

        builder.addCase(getAllOrderAction.pending, (state, { payload }) => {
            state.getAllOrderDATA = null;
            state.getAllOrderPENDING = true;
        })

        builder.addCase(getAllOrderAction.fulfilled, (state, { payload }) => {
            state.getAllOrderDATA = payload;
            state.getAllOrderPENDING = false;
        })

        builder.addCase(getAllOrderAction.rejected, (state, { payload }) => {
            state.getAllOrderDATA = null;
            state.getAllOrderPENDING = false;
        })

        builder.addCase(CancelOrderAction.pending, (state, { payload }) => {
            state.CancelOrderMSG = null;
        })

        builder.addCase(CancelOrderAction.fulfilled, (state, { payload }) => {
            state.CancelOrderMSG = payload;
        })

        builder.addCase(CancelOrderAction.rejected, (state, { payload }) => {
            state.CancelOrderMSG = null;
        })
    }
});

export default orderSlice.reducer;
