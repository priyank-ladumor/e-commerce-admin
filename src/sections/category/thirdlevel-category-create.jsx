/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable perfectionist/sort-named-imports */
/* eslint-disable no-lone-blocks */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-unresolved */
/* eslint-disable perfectionist/sort-imports */
/* eslint-disable arrow-body-style */
import * as React from 'react';
// import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
// import {
//     Select,
//     MenuItem,
// } from "@mui/material";
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';

import { useDispatch, useSelector } from 'react-redux';
import { getSecondLvlCategoriesAction, getTopLvlCategoriesAction } from 'src/store/action/categoriesAction';
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object({
    TopInput: yup.string().min(2).required("Please select top category"),
    SecondInput: yup.string().min(2).required("Please select second category"),
    ThirdInput: yup.string().min(2).required("Please select third category"),
});

export const CreateThirdLvl = () => {
    const { getTopLvlCategoriesData, getSecondLvlCategoriesData } = useSelector(state => state.categories)
    const dispatch = useDispatch()

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: yupResolver(schema),
    });


    const [TopData, setTopData] = React.useState("");
    const [TopInput, setTopInput] = React.useState("");
    const [SecondData, setSecondData] = React.useState("");
    const [SecondInput, setSecondInput] = React.useState("");
    const [ThirdInput, setThirdInput] = React.useState("");
    const [parentId, setparentId] = React.useState("");

    React.useEffect(() => {
        const parent = TopData && TopInput && TopData.content.filter((data) => data.name === TopInput)
        if (parent) {
            setparentId(parent[0]._id)
        }
    }, [TopInput])

    React.useEffect(() => {
        if (parentId) {
            const query = `?parentCategory=${parentId}`
            dispatch(getSecondLvlCategoriesAction(query))
        }
    }, [parentId])

    React.useEffect(() => {
        const item = {
            pageNumber: 0,
            pageSize: 0
        }
        dispatch(getTopLvlCategoriesAction(item))
    }, [])

    React.useEffect(() => {
        if (getTopLvlCategoriesData) {
            setTopData(getTopLvlCategoriesData)
        }
        if (getSecondLvlCategoriesData && parentId.length > 0) {
            setSecondData(getSecondLvlCategoriesData)
        }
    }, [getTopLvlCategoriesData, getSecondLvlCategoriesData, parentId])

    const onsubmit = (data) => {
        console.log(data);
        reset()
    }
    return (
        <div>
            <form onSubmit={handleSubmit(onsubmit)}>
                <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-12">
                    <div className="sm:col-span-6">
                        <Autocomplete
                            value={TopInput}
                            onChange={(event, newValue) => [
                                setSecondData(""),
                                setTopInput(newValue),
                                setparentId(""),
                                setSecondInput("")
                            ]}
                            id="controllable-states-demo"
                            options={TopData && TopData.content.map((data) =>
                                data.name
                            )}
                            // {...register("TopInput")}
                            sx={{ width: "100%" }}
                            renderInput={(params) => <TextField {...params} label="Top Level Category" />}
                        />
                    </div>
                    <div className="sm:col-span-6">
                        <Autocomplete
                            value={SecondInput}
                            disabled={!parentId}
                            onChange={(event, newValue) => [
                                setSecondInput(newValue),
                            ]}
                            id="controllable-states-demo"
                            options={SecondData && SecondData.content.map((data) => {
                                return (
                                    data.name
                                )
                            })}
                            // {...register("SecondInput")}
                            sx={{ width: "100%" }}
                            renderInput={(params) => <TextField {...params} label="Second Level Category" />}
                        />
                    </div>
                    <div className="sm:col-span-12 -mt-5">
                        <FormControl fullWidth sx={{ m: 0 }} size="large" >
                            <TextField
                                error={errors && errors.ThirdInput?.message}
                                id="standard-error-helper-text"
                                label="Third Level Category"
                                type='text'
                                {...register("ThirdInput")}
                                disabled={!SecondInput}
                                onChange={(e) => setThirdInput(e.target.value.trim())}
                                value={ThirdInput}
                                helperText={errors && errors.ThirdInput?.message}
                                variant="outlined"
                            />
                        </FormControl>
                    </div>
                    <div className="sm:col-span-12 -mt-5">
                        <Button type='submit' color="success" variant="contained" style={{ width: "100%" }}>
                            {/* <div className='flex justify-center items-center' >
                                            <ThreeDots
                                                visible={true}
                                                height="26"
                                                width="50"
                                                color="blue"
                                                radius="9"
                                                ariaLabel="three-dots-loading"
                                                wrapperStyle={{}}
                                                wrapperClass=""
                                            />
                                        </div>  */}
                            Add Third Level Category
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    )
}
