/* eslint-disable perfectionist/sort-named-imports */
/* eslint-disable perfectionist/sort-imports */
// eslint-disable-next-line import/no-extraneous-dependencies
import { createSlice } from "@reduxjs/toolkit";
import { getTopLvlCategoriesAction, getSecondLvlCategoriesAction, getThirdLvlCategoriesAction, deleteCategoriesAction, EditCategoriesAction, createTopLvlCategoriesAction, createSecondLvlCategoriesAction, createThirdLvlCategoriesAction } from "../action/categoriesAction";


const initialState = {
    getTopLvlCategoriesData: null,
    getSecondLvlCategoriesData: null,
    getThirdLvlCategoriesData: null,
    deleteCategoriesMSG: null,
    EditCategoriesMSG: null,
    createTopLvlCategoriesSUCCESSMSG: null,
    createTopLvlCategoriesERRORMSG: null,
    createTopLvlCategoriesPENDING: false,
    createSecondLvlCategoriesSUCCESSMSG: null,
    createSecondLvlCategoriesERRORMSG: null,
    createSecondLvlCategoriesPENDING: false,
    createThirdLvlCategoriesSUCCESSMSG: null,
    createThirdLvlCategoriesERRORMSG: null,
    createThirdLvlCategoriesPENDING: false,
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

        builder.addCase(createTopLvlCategoriesAction.pending, (state, { payload }) => {
            state.createTopLvlCategoriesPENDING = true;
            state.createTopLvlCategoriesERRORMSG = null;
            state.createTopLvlCategoriesSUCCESSMSG = null;
        })

        builder.addCase(createTopLvlCategoriesAction.fulfilled, (state, { payload }) => {
            state.createTopLvlCategoriesPENDING = false;
            state.createTopLvlCategoriesERRORMSG = null;
            state.createTopLvlCategoriesSUCCESSMSG = payload;
        })

        builder.addCase(createTopLvlCategoriesAction.rejected, (state, { payload }) => {
            state.createTopLvlCategoriesPENDING = false;
            state.createTopLvlCategoriesERRORMSG = payload;
            state.createTopLvlCategoriesSUCCESSMSG = null;
        })

        builder.addCase(createSecondLvlCategoriesAction.pending, (state, { payload }) => {
            state.createSecondLvlCategoriesPENDING = true;
            state.createSecondLvlCategoriesERRORMSG = null;
            state.createSecondLvlCategoriesSUCCESSMSG = null;
        })

        builder.addCase(createSecondLvlCategoriesAction.fulfilled, (state, { payload }) => {
            state.createSecondLvlCategoriesPENDING = false;
            state.createSecondLvlCategoriesERRORMSG = null;
            state.createSecondLvlCategoriesSUCCESSMSG = payload;
        })

        builder.addCase(createSecondLvlCategoriesAction.rejected, (state, { payload }) => {
            state.createSecondLvlCategoriesPENDING = false;
            state.createSecondLvlCategoriesERRORMSG = payload;
            state.createSecondLvlCategoriesSUCCESSMSG = null;
        })

        builder.addCase(createThirdLvlCategoriesAction.pending, (state, { payload }) => {
            state.createThirdLvlCategoriesPENDING = true;
            state.createThirdLvlCategoriesERRORMSG = null;
            state.createThirdLvlCategoriesSUCCESSMSG = null;
        })

        builder.addCase(createThirdLvlCategoriesAction.fulfilled, (state, { payload }) => {
            state.createThirdLvlCategoriesPENDING = false;
            state.createThirdLvlCategoriesERRORMSG = null;
            state.createThirdLvlCategoriesSUCCESSMSG = payload;
        })

        builder.addCase(createThirdLvlCategoriesAction.rejected, (state, { payload }) => {
            state.createThirdLvlCategoriesPENDING = false;
            state.createThirdLvlCategoriesERRORMSG = payload;
            state.createThirdLvlCategoriesSUCCESSMSG = null;
        })
    }
});

export default categoriesSlice.reducer;
