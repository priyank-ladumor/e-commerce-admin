/* eslint-disable perfectionist/sort-named-imports */
/* eslint-disable perfectionist/sort-imports */
// eslint-disable-next-line import/no-extraneous-dependencies
import { createSlice } from "@reduxjs/toolkit";
import { deleteSizesAction, getSizesAction } from "../action/sizeAction";


const initialState = {
    getSizesPENDING: false,
    getSizesDATA: null,
    deleteSizesMSG: null,
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
    }
});

export default sizeSlice.reducer;
