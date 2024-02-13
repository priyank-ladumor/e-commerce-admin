/* eslint-disable no-else-return */
/* eslint-disable import/no-extraneous-dependencies */
// eslint-disable-next-line import/no-extraneous-dependencies
// eslint-disable-next-line import/no-extraneous-dependencies
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit"


export const createProductAction = createAsyncThunk(
    "create/product",
    async (data, { rejectWithValue }) => {
        try {
            const result = await axios.post(
                `${import.meta.env.VITE_APP_BASE_URL}/admin/products`,
                data,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": localStorage.getItem("token")
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

export const getFilterProductAction = createAsyncThunk(
    "get/product",
    async (data, { rejectWithValue }) => {
        try {
            const result = await axios.get(
                `${import.meta.env.VITE_APP_BASE_URL}/products/${data}`,
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