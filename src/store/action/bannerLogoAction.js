/* eslint-disable no-else-return */
/* eslint-disable import/no-extraneous-dependencies */
// eslint-disable-next-line import/no-extraneous-dependencies
// eslint-disable-next-line import/no-extraneous-dependencies
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit"


export const addBannerAction = createAsyncThunk(
    "add/banner",
    async (item, { rejectWithValue }) => {
        try {
            const result = await axios.post(
                `${import.meta.env.VITE_APP_BASE_URL}/banner`,
                item,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": localStorage.getItem('token')
                    },
                },
            );
            return result.data;
        } catch (error) {
            return rejectWithValue(error.response.data.msg || error.response.data.error)
        }
    }
);

export const getBannerAction = createAsyncThunk(
    "get/banner",
    async (item, { rejectWithValue }) => {
        try {
            const result = await axios.get(
                `${import.meta.env.VITE_APP_BASE_URL}/banner`,
                // item,
                {
                    headers: {
                        "Content-Type": "application/json",
                        // "Authorization": localStorage.getItem('token')
                    },
                },
            );
            return result.data;
        } catch (error) {
            return rejectWithValue(error.response.data.msg || error.response.data.error)
        }
    }
);

export const deleteBannerAction = createAsyncThunk(
    "delete/banner",
    async (item, { rejectWithValue }) => {
        try {
            const result = await axios.delete(
                `${import.meta.env.VITE_APP_BASE_URL}/banner/${item.id}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": localStorage.getItem('token')
                    }
                }

            );
            return result.data;
        } catch (error) {
            return rejectWithValue(error.response.data.msg || error.response.data.error)
        }
    }
);