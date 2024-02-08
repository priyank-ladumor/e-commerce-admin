/* eslint-disable no-else-return */
/* eslint-disable import/no-extraneous-dependencies */
// eslint-disable-next-line import/no-extraneous-dependencies
// eslint-disable-next-line import/no-extraneous-dependencies
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit"


export const getAllUserDetailsAction = createAsyncThunk(
    "users/get/all",
    async (data, { rejectWithValue }) => {
        try {
            const result = await axios.get(
                `${import.meta.env.VITE_APP_BASE_URL}/user/all/${data}`,
                // data,
                {
                    headers: {
                        "Content-Type": "application/json",
                        // "Authorization": localStorage.getItem("token")
                    },
                }
            );
            return result.data;
        }  catch (error) {
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

export const userDeleteAction = createAsyncThunk(
    "user/delete",
    async (data, { rejectWithValue }) => {
        try {
            const result = await axios.delete(
                `${import.meta.env.VITE_APP_BASE_URL}/user/${data.id}`,
                // data,
                {
                    headers: {
                        "Content-Type": "application/json",
                        // "Authorization": localStorage.getItem("token")
                    },
                }
            );
            return result.data;
        }  catch (error) {
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

export const userBannedAction = createAsyncThunk(
    "user/banned",
    async (data, { rejectWithValue }) => {
        try {
            const result = await axios.get(
                `${import.meta.env.VITE_APP_BASE_URL}/user/${data.id}`,
                // data,
                {
                    headers: {
                        "Content-Type": "application/json",
                        // "Authorization": localStorage.getItem("token")
                    },
                }
            );
            return result.data;
        }  catch (error) {
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

export const userUnBannedAction = createAsyncThunk(
    "user/unbanned",
    async (data, { rejectWithValue }) => {
        try {
            const result = await axios.get(
                `${import.meta.env.VITE_APP_BASE_URL}/user/unbanned/${data.id}`,
                // data,
                {
                    headers: {
                        "Content-Type": "application/json",
                        // "Authorization": localStorage.getItem("token")
                    },
                }
            );
            return result.data;
        }  catch (error) {
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