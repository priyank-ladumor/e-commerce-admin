/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable perfectionist/sort-named-imports */
/* eslint-disable no-lone-blocks */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-unresolved */
/* eslint-disable perfectionist/sort-imports */
/* eslint-disable arrow-body-style */
import * as React from 'react';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';
import { FaGreaterThan } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux';
import { createThirdLvlCategoriesAction, getSecondLvlCategoriesAction, getTopLvlCategoriesAction } from 'src/store/action/categoriesAction';
import Alert from '@mui/material/Alert';

export const CreateThirdLvl = ({ setthirdCategorypopUp, openThirdForm, setopenThirdForm, setopenTopForm, setopenSecondForm }) => {
    const { getTopLvlCategoriesData, getSecondLvlCategoriesData, createThirdLvlCategoriesERRORMSG, createSecondLvlCategoriesSUCCESSMSG, createTopLvlCategoriesSUCCESSMSG } = useSelector(state => state.categories)
    const dispatch = useDispatch()

    const [TopData, setTopData] = React.useState("");
    const [TopInput, setTopInput] = React.useState("");
    const [TopInputErr, setTopInputErr] = React.useState("");
    const [SecondData, setSecondData] = React.useState("");
    const [SecondInput, setSecondInput] = React.useState("");
    const [SecondInputErr, setSecondInputErr] = React.useState("");
    const [ThirdInput, setThirdInput] = React.useState("");
    const [ThirdInputErr, setThirdInputErr] = React.useState("");
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
    }, [parentId, createSecondLvlCategoriesSUCCESSMSG])

    React.useEffect(() => {
        const item = {
            pageNumber: 0,
            pageSize: 0
        }
        dispatch(getTopLvlCategoriesAction(item))
    }, [createSecondLvlCategoriesSUCCESSMSG, createTopLvlCategoriesSUCCESSMSG])

    React.useEffect(() => {
        if (getTopLvlCategoriesData) {
            setTopData(getTopLvlCategoriesData)
        }
        if (getSecondLvlCategoriesData && parentId.length > 0) {
            setSecondData(getSecondLvlCategoriesData)
        }
    }, [getTopLvlCategoriesData, getSecondLvlCategoriesData, parentId])

    const onsubmit = () => {
        const item = {
            thirdCategory: ThirdInput,
            secondCategory: SecondInput
        }
        if (ThirdInput?.length === 0) {
            setThirdInputErr("Please select third category")
        }
        if (TopInput?.length === 0) {
            setTopInputErr("Please select top category")
        }
        if (SecondInput?.length === 0) {
            setSecondInputErr("Please select second category")
        }

        if (TopInput?.length > 0 && SecondInput?.length > 0 && ThirdInput?.length > 0) {
            setThirdInputErr("")
            setTopInputErr("")
            setSecondInputErr("")
            dispatch(createThirdLvlCategoriesAction(item))
            setthirdCategorypopUp(true)
            setThirdInput("")
            setTopInput("")
            setSecondInput("")
        }
    }
    React.useEffect(() => {
        if (TopInput?.length > 0) {
            setTopInputErr("")
        }
        if (SecondInput?.length > 0) {
            setSecondInputErr("")
        }
        if (ThirdInput?.length > 0) {
            setThirdInputErr("")
        }
    }, [TopInput, SecondInput, ThirdInput])
    return (
        <div>
            <span className='flex items-center mt-3 -mb-3' style={{ fontWeight: "700" }}>
                Third Level Category
                {openThirdForm ? <FaGreaterThan className="ms-2" onClick={() => setopenThirdForm(!openThirdForm)} style={{ transform: "rotate(90deg)", color: "blue", cursor: "pointer" }} /> : <FaGreaterThan className='ms-2' style={{ color: "blue", cursor: "pointer" }} onClick={() => [setopenThirdForm(!openThirdForm), setopenTopForm(false), setopenSecondForm(false)]} />}
            </span>
            {openThirdForm &&
                <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-12">
                    {createThirdLvlCategoriesERRORMSG &&
                        <div className="sm:col-span-12">
                            <Alert severity="error">{createThirdLvlCategoriesERRORMSG}</Alert>
                        </div>}
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
                            sx={{ width: "100%" }}
                            renderInput={(params) => <TextField error={TopInputErr} helperText={TopInputErr && TopInputErr} {...params} label="Top Level" />}
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

                            sx={{ width: "100%" }}
                            renderInput={(params) => <TextField error={SecondInputErr} helperText={SecondInputErr && SecondInputErr}  {...params} label="Second Level" />}
                        />
                    </div>
                    <div className="sm:col-span-12">
                        <FormControl fullWidth sx={{ m: 0 }} size="large" >
                            <TextField
                                error={ThirdInputErr}
                                id="standard-error-helper-text"
                                label="Third Level"
                                type='text'
                                disabled={!SecondInput}
                                onChange={(e) => setThirdInput(e.target.value.trim().toLowerCase())}
                                value={ThirdInput}
                                helperText={ThirdInputErr && ThirdInputErr}
                                variant="outlined"
                            />
                        </FormControl>
                    </div>
                    <div className="sm:col-span-12 -mt-3">
                        <Button onClick={onsubmit} type='button' color="success" variant="contained" style={{ width: "100%" }}>
                            Add Third Level Category
                        </Button>
                    </div>
                </div>
            }
        </div>
    )
}
