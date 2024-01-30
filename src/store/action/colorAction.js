/* eslint-disable import/no-extraneous-dependencies */
// eslint-disable-next-line import/no-extraneous-dependencies
// eslint-disable-next-line import/no-extraneous-dependencies
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit"


export const getColorAction = createAsyncThunk(
    "color",
    async (data, { rejectWithValue }) => {
        try {
            const result = await axios.get(
                `//color-names.herokuapp.com/v1/`,
                // data,
                {
                    headers: {
                        "Content-Type": "application/json",
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