/* eslint-disable perfectionist/sort-named-imports */
/* eslint-disable perfectionist/sort-imports */
// eslint-disable-next-line import/no-extraneous-dependencies
import { createSlice } from "@reduxjs/toolkit";
import { CancelOrderAction, DeleteOrderAction, confirmOrderAction, deliveredOrderAction, getAllOrderAction, packedOrderAction, shippedOrderAction } from "../action/orderAction";



const initialState = {
    getAllOrderPENDING: false,
    getAllOrderDATA: null,
    CancelOrderMSG: null,
    DeleteOrderMSG: null,
    confirmOrderMSG: null,
    packedOrderMSG: null,
    shippedOrderMSG: null,
    deliveredOrderMSG: null,
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

        builder.addCase(DeleteOrderAction.pending, (state, { payload }) => {
            state.DeleteOrderMSG = null;
        })

        builder.addCase(DeleteOrderAction.fulfilled, (state, { payload }) => {
            state.DeleteOrderMSG = payload;
        })

        builder.addCase(DeleteOrderAction.rejected, (state, { payload }) => {
            state.DeleteOrderMSG = null;
        })

        builder.addCase(confirmOrderAction.pending, (state, { payload }) => {
            state.confirmOrderMSG = null;
        })

        builder.addCase(confirmOrderAction.fulfilled, (state, { payload }) => {
            state.confirmOrderMSG = payload;
        })

        builder.addCase(confirmOrderAction.rejected, (state, { payload }) => {
            state.confirmOrderMSG = null;
        })

        builder.addCase(packedOrderAction.pending, (state, { payload }) => {
            state.packedOrderMSG = null;
        })

        builder.addCase(packedOrderAction.fulfilled, (state, { payload }) => {
            state.packedOrderMSG = payload;
        })

        builder.addCase(packedOrderAction.rejected, (state, { payload }) => {
            state.packedOrderMSG = null;
        })

        builder.addCase(shippedOrderAction.pending, (state, { payload }) => {
            state.shippedOrderMSG = null;
        })

        builder.addCase(shippedOrderAction.fulfilled, (state, { payload }) => {
            state.shippedOrderMSG = payload;
        })

        builder.addCase(shippedOrderAction.rejected, (state, { payload }) => {
            state.shippedOrderMSG = null;
        })

        builder.addCase(deliveredOrderAction.pending, (state, { payload }) => {
            state.deliveredOrderMSG = null;
        })

        builder.addCase(deliveredOrderAction.fulfilled, (state, { payload }) => {
            state.deliveredOrderMSG = payload;
        })

        builder.addCase(deliveredOrderAction.rejected, (state, { payload }) => {
            state.deliveredOrderMSG = null;
        })
    }
});

export default orderSlice.reducer;
