/* eslint-disable no-else-return */
/* eslint-disable import/no-extraneous-dependencies */
// eslint-disable-next-line import/no-extraneous-dependencies
// eslint-disable-next-line import/no-extraneous-dependencies
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit"

export const getSizesAction = createAsyncThunk(
    "get/sizes",
    async (data, { rejectWithValue }) => {
        try {
            const result = await axios.get(
                `${import.meta.env.VITE_APP_BASE_URL}/size`,
                // data,
                {
                    headers: {
                        "Content-Type": "application/json",
                        // "Authorization": localStorage.getItem("token")
                    },
                }
            );
            return result.data;
        } catch (error) {
            if (error.response && error.response.data.error) {
                return rejectWithValue(error.response.data.error);
            } else if (error.message) {
                return rejectWithValue(error.message);
            } else {
                return rejectWithValue(error.response.data.msg)
            }
        }
    }
);

export const deleteSizesAction = createAsyncThunk(
    "delete/sizes",
    async (data, { rejectWithValue }) => {
        try {
            const result = await axios.delete(
                `${import.meta.env.VITE_APP_BASE_URL}/size/option`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        // "Authorization": localStorage.getItem("token")
                    }, data,
                }
            );
            return result.data;
        } catch (error) {
            if (error.response && error.response.data.error) {
                return rejectWithValue(error.response.data.error);
            } else if (error.message) {
                return rejectWithValue(error.message);
            } else {
                return rejectWithValue(error.response.data.msg)
            }
        }
    }
);

export const deleteSizeTableAction = createAsyncThunk(
    "delete/sizes/table",
    async (data, { rejectWithValue }) => {
        try {
            const result = await axios.delete(
                `${import.meta.env.VITE_APP_BASE_URL}/size/lableandoption`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        // "Authorization": localStorage.getItem("token")
                    }, data,
                }
            );
            return result.data;
        } catch (error) {
            if (error.response && error.response.data.error) {
                return rejectWithValue(error.response.data.error);
            } else if (error.message) {
                return rejectWithValue(error.message);
            } else {
                return rejectWithValue(error.response.data.msg)
            }
        }
    }
);

export const updateSizeAction = createAsyncThunk(
    "update/sizes",
    async (data, { rejectWithValue }) => {
        try {
            const result = await axios.post(
                `${import.meta.env.VITE_APP_BASE_URL}/size/update`,
                data,
                {
                    headers: {
                        "Content-Type": "application/json",
                        // "Authorization": localStorage.getItem("token")
                    },
                }
            );
            return result.data;
        } catch (error) {
            if (error.response && error.response.data.error) {
                return rejectWithValue(error.response.data.error);
            } else if (error.message) {
                return rejectWithValue(error.message);
            } else {
                return rejectWithValue(error.response.data.msg)
            }
        }
    }
);

export const createLabelAction = createAsyncThunk(
    "create/label",
    async (data, { rejectWithValue }) => {
        try {
            const result = await axios.post(
                `${import.meta.env.VITE_APP_BASE_URL}/size/label`,
                data,
                {
                    headers: {
                        "Content-Type": "application/json",
                        // "Authorization": localStorage.getItem("token")
                    },
                }
            );
            return result.data;
        } catch (error) {
            if (error.response && error.response.data.error) {
                return rejectWithValue(error.response.data.error);
            } else if (error.message) {
                return rejectWithValue(error.message);
            } else {
                return rejectWithValue(error.response.data.msg)
            }
        }
    }
);

export const createOptionAction = createAsyncThunk(
    "create/option",
    async (data, { rejectWithValue }) => {
        try {
            const result = await axios.post(
                `${import.meta.env.VITE_APP_BASE_URL}/size/option`,
                data,
                {
                    headers: {
                        "Content-Type": "application/json",
                        // "Authorization": localStorage.getItem("token")
                    },
                }
            );
            return result.data;
        } catch (error) {
            if (error.response && error.response.data.error) {
                return rejectWithValue(error.response.data.error);
            } else if (error.message) {
                return rejectWithValue(error.message);
            } else {
                return rejectWithValue(error.response.data.msg)
            }
        }
    }
);