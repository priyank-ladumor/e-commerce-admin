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
import { createSecondLvlCategoriesAction, getTopLvlCategoriesAction } from 'src/store/action/categoriesAction';
import Alert from '@mui/material/Alert';

export const CreateSecondLvl = ({ setsecondCategorypopUp, openSecondForm, setopenSecondForm, setopenThirdForm, setopenTopForm }) => {
    const { getTopLvlCategoriesData, createSecondLvlCategoriesERRORMSG, createTopLvlCategoriesSUCCESSMSG } = useSelector(state => state.categories)
    const dispatch = useDispatch()

    const [TopData, setTopData] = React.useState("");
    const [TopInput, setTopInput] = React.useState("");
    const [TopInputErr, setTopInputErr] = React.useState("");
    const [SecondInput, setSecondInput] = React.useState("");
    const [SecondInputErr, setSecondInputErr] = React.useState("");

    React.useEffect(() => {
        const item = {
            pageNumber: 0,
            pageSize: 0
        }
        dispatch(getTopLvlCategoriesAction(item))
    }, [createTopLvlCategoriesSUCCESSMSG])

    React.useEffect(() => {
        if (getTopLvlCategoriesData) {
            setTopData(getTopLvlCategoriesData)
        }
    }, [getTopLvlCategoriesData])

    const onsubmit = () => {
        const item = {
            topCategory: TopInput,
            secondCategory: SecondInput
        }
        if (TopInput?.length === 0) {
            setTopInputErr("Please select top category")
        }
        if (SecondInput?.length === 0) {
            setSecondInputErr("Please select second category")
        }

        if (TopInput?.length > 0 && SecondInput?.length > 0) {

            setTopInputErr("")
            setSecondInputErr("")
            dispatch(createSecondLvlCategoriesAction(item));
            setsecondCategorypopUp(true)
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
    }, [TopInput, SecondInput])
    return (
        <div>
            <span className='flex items-center mt-3 -mb-3' style={{ fontWeight: "700" }}>
                Second Level Category
                {openSecondForm ? <FaGreaterThan className="ms-2" onClick={() => setopenSecondForm(!openSecondForm)} style={{ transform: "rotate(90deg)", color: "blue", cursor: "pointer" }} /> : <FaGreaterThan className='ms-2' style={{ color: "blue", cursor: "pointer" }} onClick={() => [setopenSecondForm(!openSecondForm), setopenThirdForm(false), setopenTopForm(false)]} />}
            </span>
            {openSecondForm &&
                <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-12">
                    {createSecondLvlCategoriesERRORMSG &&
                        <div className="sm:col-span-12">
                            <Alert severity="error">{createSecondLvlCategoriesERRORMSG}</Alert>
                        </div>}
                    <div className="sm:col-span-6">
                        <Autocomplete
                            value={TopInput}
                            onChange={(event, newValue) => [
                                setTopInput(newValue),
                            ]}
                            id="controllable-states-demo"
                            options={TopData && TopData.content.map((data) => {
                                return (
                                    data.name
                                )
                            })}

                            sx={{ width: "100%" }}
                            renderInput={(params) => <TextField error={TopInputErr} helperText={TopInputErr && TopInputErr}  {...params} label="Top Level" />}
                        />
                    </div>
                    <div className="sm:col-span-6">
                        <FormControl fullWidth sx={{ m: 0 }} size="large" >
                            <TextField
                                error={SecondInputErr}
                                id="standard-error-helper-text"
                                label="Second Level"
                                type='text'
                                disabled={!TopInput}
                                onChange={(e) => setSecondInput(e.target.value.trim().toLowerCase())}
                                value={SecondInput}
                                helperText={SecondInputErr && SecondInputErr}
                                variant="outlined"
                            />
                        </FormControl>
                    </div>
                    <div className="sm:col-span-12 -mt-3">
                        <Button onClick={onsubmit} type='button' color="success" variant="contained" style={{ width: "100%" }}>
                            Add Second Level Category
                        </Button>
                    </div>
                </div>
            }
        </div>
    )
}
