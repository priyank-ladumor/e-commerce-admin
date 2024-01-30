// eslint-disable-next-line import/no-extraneous-dependencies
import { createSlice } from "@reduxjs/toolkit";

import { getColorAction } from "../action/colorAction";


const initialState = {
    colorData: null,
};

const colorSlice = createSlice({
    name: "color",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {

        builder.addCase(getColorAction.pending, (state, { payload }) => {
            state.colorData = null;
        })

        builder.addCase(getColorAction.fulfilled, (state, { payload }) => {
            state.colorData = payload;
        })

        builder.addCase(getColorAction.rejected, (state, { payload }) => {
            state.colorData = null;
        })
    }
});

export default colorSlice.reducer;
