// eslint-disable-next-line import/no-extraneous-dependencies
import { createSlice } from "@reduxjs/toolkit";

import { adminLogin, adminLoginData } from "../action/authAction";


const initialState = {
    adminLoginSuccess: false,
    adminLoginRole: null,
    adminLoginError: null,
    adminLoginPending: false,
    adminLoginDatas: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        Logout: (state) => {
            state.adminLogout = true;
            localStorage.clear();
        },
    },
    extraReducers: (builder) => {

        builder.addCase(adminLogin.pending, (state, { payload }) => {
            state.adminLoginSuccess = false;
            state.adminLoginError = null;
            state.adminLoginPending = true;
            state.adminLoginRole = null;
            state.adminLogout = false;
        })

        builder.addCase(adminLogin.fulfilled, (state, { payload }) => {
            state.adminLoginSuccess = payload;
            state.adminLoginError = null;
            state.adminLoginPending = false;
            state.adminLoginRole = payload.role;
            state.adminLogout = false;
        })

        builder.addCase(adminLogin.rejected, (state, { payload }) => {
            state.adminLoginSuccess = false;
            state.adminLoginError = payload;
            state.adminLoginPending = false;
            state.adminLoginRole = null;
            state.adminLogout = true;
        })

        builder.addCase(adminLoginData.pending, (state, { payload }) => {
            state.adminLoginDatas = null;
        })

        builder.addCase(adminLoginData.fulfilled, (state, { payload }) => {
            state.adminLoginDatas = payload;
        })

        builder.addCase(adminLoginData.rejected, (state, { payload }) => {
            state.adminLoginDatas = null;
        })
    }
});

export default authSlice.reducer;
export const { Logout } = authSlice.actions;
