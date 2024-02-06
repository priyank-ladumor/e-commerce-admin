/* eslint-disable perfectionist/sort-named-imports */
/* eslint-disable perfectionist/sort-imports */
// eslint-disable-next-line import/no-extraneous-dependencies
import { createSlice } from "@reduxjs/toolkit";
import { getTopLvlCategoriesAction, getSecondLvlCategoriesAction, getThirdLvlCategoriesAction, deleteCategoriesAction, EditCategoriesAction } from "../action/categoriesAction";


const initialState = {
    getTopLvlCategoriesData: null,
    getSecondLvlCategoriesData: null,
    getThirdLvlCategoriesData: null,
    deleteCategoriesMSG: null,
    EditCategoriesMSG: null,
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

        builder.addCase(deleteCategoriesAction.pending, (state, { payload }) => {
            state.deleteCategoriesMSG = null;
        })

        builder.addCase(deleteCategoriesAction.fulfilled, (state, { payload }) => {
            state.deleteCategoriesMSG = payload;
        })

        builder.addCase(deleteCategoriesAction.rejected, (state, { payload }) => {
            state.deleteCategoriesMSG = null;
        })

        builder.addCase(EditCategoriesAction.pending, (state, { payload }) => {
            state.EditCategoriesMSG = null;
        })

        builder.addCase(EditCategoriesAction.fulfilled, (state, { payload }) => {
            state.EditCategoriesMSG = payload;
        })

        builder.addCase(EditCategoriesAction.rejected, (state, { payload }) => {
            state.EditCategoriesMSG = null;
        })
    }
});

export default categoriesSlice.reducer;
