/* eslint-disable perfectionist/sort-named-imports */
/* eslint-disable perfectionist/sort-imports */
// eslint-disable-next-line import/no-extraneous-dependencies
import { createSlice } from "@reduxjs/toolkit";
import { addBannerAction, deleteBannerAction, getBannerAction } from "../action/bannerLogoAction";



const initialState = {
    getBannerPENDING: false,
    getBannerMSG: null,
    deleteBannerPENDING: false,
    deleteBannerMSG: null,
    addBannerPENDING: false,
    addBannerMSG: null,
    addBannerERROR: null,
};

const bannerLogoSlice = createSlice({
    name: "bannerLogo",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {

        builder.addCase(addBannerAction.pending, (state, { payload }) => {
            state.addBannerMSG = null;
            state.addBannerPENDING = true;
            state.addBannerERROR = null;
        })

        builder.addCase(addBannerAction.fulfilled, (state, { payload }) => {
            state.addBannerMSG = payload;
            state.addBannerPENDING = false;
            state.addBannerERROR = null;
        })

        builder.addCase(addBannerAction.rejected, (state, { payload }) => {
            state.addBannerMSG = null;
            state.addBannerPENDING = false;
            state.addBannerERROR = payload;
        })

        builder.addCase(getBannerAction.pending, (state, { payload }) => {
            state.getBannerMSG = null;
            state.getBannerPENDING = true;
        })

        builder.addCase(getBannerAction.fulfilled, (state, { payload }) => {
            state.getBannerMSG = payload;
            state.getBannerPENDING = false;
        })

        builder.addCase(getBannerAction.rejected, (state, { payload }) => {
            state.getBannerMSG = null;
            state.getBannerPENDING = false;
        })

        builder.addCase(deleteBannerAction.pending, (state, { payload }) => {
            state.deleteBannerMSG = null;
            state.deleteBannerPENDING = true;
        })

        builder.addCase(deleteBannerAction.fulfilled, (state, { payload }) => {
            state.deleteBannerMSG = payload;
            state.deleteBannerPENDING = false;
        })

        builder.addCase(deleteBannerAction.rejected, (state, { payload }) => {
            state.deleteBannerMSG = null;
            state.deleteBannerPENDING = false;
        })
    }
});

export default bannerLogoSlice.reducer;
