/* eslint-disable import/no-extraneous-dependencies */
// eslint-disable-next-line import/no-extraneous-dependencies
// eslint-disable-next-line import/no-extraneous-dependencies
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit"


export const adminLogin = createAsyncThunk(
    "admin/login",
    async (data, { rejectWithValue }) => {
        // const token = JSON.parse(localStorage.getItem('usertoken'))
        try {
            const result = await axios.post(
                `${import.meta.env.VITE_APP_BASE_URL}/user/signin`,
                data,
                {
                    headers: {
                        "Content-Type": "application/json",
                        // "Authorization": token
                    },
                }
            );
            localStorage.setItem("token", result.data.token)
            return result.data;
        } catch (error) {
            if (error.response && error.response.data.msg) {
                return rejectWithValue(error.response.data.msg);
            }
            return rejectWithValue(error.message);
        }
    }
);

export const adminLoginData = createAsyncThunk(
    "admin/data",
    async (data, { rejectWithValue }) => {
        const token = localStorage.getItem('token')
        try {
            const result = await axios.get(
                `${import.meta.env.VITE_APP_BASE_URL}/user`,
                // data,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": token
                    },
                }
            );
            return result.data;
        } catch (error) {
            if (error.response && error.response.data.msg) {
                return rejectWithValue(error.response.data.msg);
            }
            return rejectWithValue(error.message);
        }
    }
);