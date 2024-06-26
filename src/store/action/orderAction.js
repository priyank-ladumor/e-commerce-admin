/* eslint-disable no-else-return */
/* eslint-disable import/no-extraneous-dependencies */
// eslint-disable-next-line import/no-extraneous-dependencies
// eslint-disable-next-line import/no-extraneous-dependencies
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit"


export const getAllOrderAction = createAsyncThunk(
    "get/AllOrder",
    async (data, { rejectWithValue }) => {
        try {
            const result = await axios.get(
                `${import.meta.env.VITE_APP_BASE_URL}/order/all`,
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

export const CancelOrderAction = createAsyncThunk(
    "cancel/Order",
    async (item, { rejectWithValue }) => {
        try {
            const result = await axios.get(
                `${import.meta.env.VITE_APP_BASE_URL}/order/cancel/${item.id}`,
                // id,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": localStorage.getItem('token')
                    },
                }
            );
            return result.data;
        } catch (error) {

            return rejectWithValue(error.response.data.msg)
        }
    }
);

export const confirmOrderAction = createAsyncThunk(
    "confirm/Order",
    async (item, { rejectWithValue }) => {
        try {
            const result = await axios.get(
                `${import.meta.env.VITE_APP_BASE_URL}/order/confirm/${item.id}`,
                // id,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": localStorage.getItem('token')
                    },
                }
            );
            return result.data;
        } catch (error) {

            return rejectWithValue(error.response.data.msg)
        }
    }
);

export const packedOrderAction = createAsyncThunk(
    "packed/Order",
    async (item, { rejectWithValue }) => {
        try {
            const result = await axios.get(
                `${import.meta.env.VITE_APP_BASE_URL}/order/packed/${item.id}`,
                // id,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": localStorage.getItem('token')
                    },
                }
            );
            return result.data;
        } catch (error) {

            return rejectWithValue(error.response.data.msg)
        }
    }
);

export const shippedOrderAction = createAsyncThunk(
    "shipped/Order",
    async (item, { rejectWithValue }) => {
        try {
            const result = await axios.get(
                `${import.meta.env.VITE_APP_BASE_URL}/order/shipped/${item.id}`,
                // id,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": localStorage.getItem('token')
                    },
                }
            );
            return result.data;
        } catch (error) {

            return rejectWithValue(error.response.data.msg)
        }
    }
);

export const deliveredOrderAction = createAsyncThunk(
    "delivered/Order",
    async (item, { rejectWithValue }) => {
        try {
            const result = await axios.get(
                `${import.meta.env.VITE_APP_BASE_URL}/order/delivered/${item.id}`,
                // id,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": localStorage.getItem('token')
                    },
                }
            );
            return result.data;
        } catch (error) {

            return rejectWithValue(error.response.data.msg)
        }
    }
);

export const DeleteOrderAction = createAsyncThunk(
    "delete/cancelUserOrder",
    async (item, { rejectWithValue }) => {
        try {
            const result = await axios.delete(
                `${import.meta.env.VITE_APP_BASE_URL}/order/delete/${item.id}`,
                // item,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": localStorage.getItem('token')
                    },
                }
            );
            return result.data;
        } catch (error) {

            return rejectWithValue(error.response.data.msg)
        }
    }
);