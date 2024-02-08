/* eslint-disable perfectionist/sort-imports */
// eslint-disable-next-line import/no-extraneous-dependencies
import { createSlice } from "@reduxjs/toolkit";
import { getAllUserDetailsAction } from "../action/userAction";



const initialState = {
    getAllUserDetailsPENDING: false,
    getAllUserDetailsDATA: null
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {

        builder.addCase(getAllUserDetailsAction.pending, (state, { payload }) => {
            state.getAllUserDetailsDATA = null;
            state.getAllUserDetailsPENDING = true;
        })

        builder.addCase(getAllUserDetailsAction.fulfilled, (state, { payload }) => {
            state.getAllUserDetailsDATA = payload;
            state.getAllUserDetailsPENDING = false;
        })

        builder.addCase(getAllUserDetailsAction.rejected, (state, { payload }) => {
            state.getAllUserDetailsDATA = null;
            state.getAllUserDetailsPENDING = false;
        })
    }
});

export default userSlice.reducer;
