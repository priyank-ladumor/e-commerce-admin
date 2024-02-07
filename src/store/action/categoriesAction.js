/* eslint-disable no-else-return */
/* eslint-disable import/no-extraneous-dependencies */
// eslint-disable-next-line import/no-extraneous-dependencies
// eslint-disable-next-line import/no-extraneous-dependencies
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit"


export const getTopLvlCategoriesAction = createAsyncThunk(
    "get/topLvl/category",
    async (data, { rejectWithValue }) => {
        try {
            const result = await axios.get(
                `${import.meta.env.VITE_APP_BASE_URL}/categories/toplevel?pageNumber=${data.pageNumber}&pageSize=${data.pageSize}`,
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
            if (error.response && error.response.data.msg) {
                return rejectWithValue(error.response.data.msg);
            } else {
                return rejectWithValue(error.message);
            }
        }
    }
);
export const getSecondLvlCategoriesAction = createAsyncThunk(
    "get/secondLvl/category",
    async (data, { rejectWithValue }) => {
        try {
            const result = await axios.get(
                `${import.meta.env.VITE_APP_BASE_URL}/categories/secondlevel/${data}`,
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
            if (error.response && error.response.data.msg) {
                return rejectWithValue(error.response.data.msg);
            } else {
                return rejectWithValue(error.message);
            }
        }
    }
);
export const getThirdLvlCategoriesAction = createAsyncThunk(
    "get/thirdLvl/category",
    async (data, { rejectWithValue }) => {
        try {
            const result = await axios.get(
                `${import.meta.env.VITE_APP_BASE_URL}/categories/thirdlevel?pageNumber=${data.pageNumber}&pageSize=${data.pageSize}`,
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
            if (error.response && error.response.data.msg) {
                return rejectWithValue(error.response.data.msg);
            } else {
                return rejectWithValue(error.message);
            }
        }
    }
);

export const deleteCategoriesAction = createAsyncThunk(
    "delete/category",
    async (data, { rejectWithValue }) => {
        try {
            const result = await axios.delete(
                `${import.meta.env.VITE_APP_BASE_URL}/categories/${data.CategoryID}`,
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
            if (error.response && error.response.data.msg) {
                return rejectWithValue(error.response.data.msg);
            } else {
                return rejectWithValue(error.message);
            }
        }
    }
);

export const EditCategoriesAction = createAsyncThunk(
    "edit/category",
    async (data, { rejectWithValue }) => {
        try {
            const result = await axios.patch(
                `${import.meta.env.VITE_APP_BASE_URL}/categories/${data.id}`,
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
            if (error.response && error.response.data.msg) {
                return rejectWithValue(error.response.data.msg);
            } else {
                return rejectWithValue(error.message);
            }
        }
    }
);

export const createTopLvlCategoriesAction = createAsyncThunk(
    "create/top/category",
    async (data, { rejectWithValue }) => {
        try {
            const result = await axios.post(
                `${import.meta.env.VITE_APP_BASE_URL}/categories/toplevel/create`,
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

export const createSecondLvlCategoriesAction = createAsyncThunk(
    "create/second/category",
    async (data, { rejectWithValue }) => {
        try {
            const result = await axios.post(
                `${import.meta.env.VITE_APP_BASE_URL}/categories/secondlevel/create`,
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

export const createThirdLvlCategoriesAction = createAsyncThunk(
    "create/third/category",
    async (data, { rejectWithValue }) => {
        try {
            const result = await axios.post(
                `${import.meta.env.VITE_APP_BASE_URL}/categories/thirdlevel/create`,
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