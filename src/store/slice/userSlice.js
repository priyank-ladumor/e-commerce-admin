/* eslint-disable perfectionist/sort-named-imports */
/* eslint-disable perfectionist/sort-imports */
// eslint-disable-next-line import/no-extraneous-dependencies
import { createSlice } from "@reduxjs/toolkit";
import { getAllUserDetailsAction, userDeleteAction, userBannedAction, userUnBannedAction } from "../action/userAction";



const initialState = {
    getAllUserDetailsPENDING: false,
    getAllUserDetailsDATA: null,
    userDeleteMSG: null,
    userBannedMSG: null,
    userUnBannedMSG: null,
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

        builder.addCase(userDeleteAction.pending, (state, { payload }) => {
            state.userDeleteMSG = null;
        })

        builder.addCase(userDeleteAction.fulfilled, (state, { payload }) => {
            state.userDeleteMSG = payload;
        })

        builder.addCase(userDeleteAction.rejected, (state, { payload }) => {
            state.userDeleteMSG = null;
        })

        builder.addCase(userBannedAction.pending, (state, { payload }) => {
            state.userBannedMSG = null;
        })

        builder.addCase(userBannedAction.fulfilled, (state, { payload }) => {
            state.userBannedMSG = payload;
        })

        builder.addCase(userBannedAction.rejected, (state, { payload }) => {
            state.userBannedMSG = null;
        })

        builder.addCase(userUnBannedAction.pending, (state, { payload }) => {
            state.userUnBannedMSG = null;
        })

        builder.addCase(userUnBannedAction.fulfilled, (state, { payload }) => {
            state.userUnBannedMSG = payload;
        })

        builder.addCase(userUnBannedAction.rejected, (state, { payload }) => {
            state.userUnBannedMSG = null;
        })
    }
});

export default userSlice.reducer;
