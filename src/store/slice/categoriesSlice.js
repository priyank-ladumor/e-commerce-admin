/* eslint-disable perfectionist/sort-named-imports */
/* eslint-disable perfectionist/sort-imports */
// eslint-disable-next-line import/no-extraneous-dependencies
import { createSlice } from "@reduxjs/toolkit";
import { getTopLvlCategoriesAction, getSecondLvlCategoriesAction, getThirdLvlCategoriesAction } from "../action/categoriesAction";


const initialState = {
    getTopLvlCategoriesData: null,
    getSecondLvlCategoriesData: null,
    getThirdLvlCategoriesData: null,
};

const categoriesSlice = createSlice({
    name: "categories",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {

        builder.addCase(getTopLvlCategoriesAction.pending, (state, { payload }) => {
            state.getTopLvlCategoriesData = null;
        })

        builder.addCase(getTopLvlCategoriesAction.fulfilled, (state, { payload }) => {
            state.getTopLvlCategoriesData = payload;
        })

        builder.addCase(getTopLvlCategoriesAction.rejected, (state, { payload }) => {
            state.getTopLvlCategoriesData = null;
        })

        builder.addCase(getSecondLvlCategoriesAction.pending, (state, { payload }) => {
            state.getSecondLvlCategoriesData = null;
        })

        builder.addCase(getSecondLvlCategoriesAction.fulfilled, (state, { payload }) => {
            state.getSecondLvlCategoriesData = payload;
        })

        builder.addCase(getSecondLvlCategoriesAction.rejected, (state, { payload }) => {
            state.getSecondLvlCategoriesData = null;
        })

        builder.addCase(getThirdLvlCategoriesAction.pending, (state, { payload }) => {
            state.getThirdLvlCategoriesData = null;
        })

        builder.addCase(getThirdLvlCategoriesAction.fulfilled, (state, { payload }) => {
            state.getThirdLvlCategoriesData = payload;
        })

        builder.addCase(getThirdLvlCategoriesAction.rejected, (state, { payload }) => {
            state.getThirdLvlCategoriesData = null;
        })
    }
});

export default categoriesSlice.reducer;
