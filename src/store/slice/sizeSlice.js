/* eslint-disable perfectionist/sort-named-imports */
/* eslint-disable perfectionist/sort-imports */
// eslint-disable-next-line import/no-extraneous-dependencies
import { createSlice } from "@reduxjs/toolkit";
import { deleteSizesAction, getSizesAction, updateSizeAction, createLabelAction, createOptionAction, deleteSizeTableAction } from "../action/sizeAction";


const initialState = {
    getSizesPENDING: false,
    getSizesDATA: null,
    deleteSizesMSG: null,
    updateSizeMSG: null,
    createLabelMSG: null,
    createLabelERR: null,
    createOptionMSG: null,
    createOptionERR: null,
    deleteSizeTableMSG: null,
};

const sizeSlice = createSlice({
    name: "size",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {

        builder.addCase(getSizesAction.pending, (state, { payload }) => {
            state.getSizesDATA = null;
            state.getSizesPENDING = true;
        })

        builder.addCase(getSizesAction.fulfilled, (state, { payload }) => {
            state.getSizesDATA = payload;
            state.getSizesPENDING = false;
        })

        builder.addCase(getSizesAction.rejected, (state, { payload }) => {
            state.getSizesDATA = null;
            state.getSizesPENDING = false;
        })

        builder.addCase(deleteSizesAction.pending, (state, { payload }) => {
            state.deleteSizesMSG = null;
        })

        builder.addCase(deleteSizesAction.fulfilled, (state, { payload }) => {
            state.deleteSizesMSG = payload;
        })

        builder.addCase(deleteSizesAction.rejected, (state, { payload }) => {
            state.deleteSizesMSG = null;
        })

        builder.addCase(updateSizeAction.pending, (state, { payload }) => {
            state.updateSizeMSG = null;
        })

        builder.addCase(updateSizeAction.fulfilled, (state, { payload }) => {
            state.updateSizeMSG = payload;
        })

        builder.addCase(updateSizeAction.rejected, (state, { payload }) => {
            state.updateSizeMSG = null;
        })

        builder.addCase(deleteSizeTableAction.pending, (state, { payload }) => {
            state.deleteSizeTableMSG = null;
        })

        builder.addCase(deleteSizeTableAction.fulfilled, (state, { payload }) => {
            state.deleteSizeTableMSG = payload;
        })

        builder.addCase(deleteSizeTableAction.rejected, (state, { payload }) => {
            state.deleteSizeTableMSG = null;
        })

        builder.addCase(createLabelAction.pending, (state, { payload }) => {
            state.createLabelMSG = null;
            state.createLabelERR = null;
        })

        builder.addCase(createLabelAction.fulfilled, (state, { payload }) => {
            state.createLabelMSG = payload;
            state.createLabelERR = null;
        })

        builder.addCase(createLabelAction.rejected, (state, { payload }) => {
            state.createLabelMSG = null;
            state.createLabelERR = payload;
        })

        builder.addCase(createOptionAction.pending, (state, { payload }) => {
            state.createOptionMSG = null;
            state.createOptionERR = null;
        })

        builder.addCase(createOptionAction.fulfilled, (state, { payload }) => {
            state.createOptionMSG = payload;
            state.createOptionERR = null;
        })

        builder.addCase(createOptionAction.rejected, (state, { payload }) => {
            state.createOptionMSG = null;
            state.createOptionERR = payload;
        })
    }
});

export default sizeSlice.reducer;
