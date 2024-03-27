/* eslint-disable perfectionist/sort-named-imports */
/* eslint-disable perfectionist/sort-imports */
// eslint-disable-next-line import/no-extraneous-dependencies
import { createSlice } from "@reduxjs/toolkit";
import { addBannerAction } from "../action/bannerLogoAction";



const initialState = {
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
    }
});

export default bannerLogoSlice.reducer;
