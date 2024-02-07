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
import { FaGreaterThan } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux';
import { createTopLvlCategoriesAction } from 'src/store/action/categoriesAction';
import Alert from '@mui/material/Alert';

export const CreateTopLvl = ({ settopCategorypopUp, openTopForm, setopenTopForm, setopenSecondForm, setopenThirdForm }) => {
    const dispatch = useDispatch()
    const { createTopLvlCategoriesERRORMSG } = useSelector((state) => state.categories)

    const [TopInput, setTopInput] = React.useState("");
    const [TopInputErr, setTopInputErr] = React.useState("");

    const onsubmit = () => {
        const item = {
            topCategory: TopInput
        }
        if (TopInput?.length === 0) {
            setTopInputErr("Please select top category")
        }

        if (TopInput?.length > 0) {
            setTopInputErr("")
            dispatch(createTopLvlCategoriesAction(item))
            settopCategorypopUp(true)
            setTopInput("")
        }
    }
    React.useEffect(() => {
        if (TopInput?.length > 0) {
            setTopInputErr("")
        }
    }, [TopInput])

    return (
        <div>
            <div className="-mt-3 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-12">
                <div className="sm:col-span-12">
                    <span className='flex items-center mt-3 -mb-3' style={{ fontWeight: "700", width: "450px" }}>
                        Top Level Category
                        {openTopForm ?
                            <FaGreaterThan className="ms-2" onClick={() => setopenTopForm(!openTopForm)} style={{ transform: "rotate(90deg)", color: "blue", cursor: "pointer" }} />
                            : <FaGreaterThan className='ms-2' style={{ color: "blue", cursor: "pointer" }} onClick={() => [setopenTopForm(!openTopForm),setopenThirdForm(false),setopenSecondForm(false)]} />

                        }
                    </span>
                </div>
            </div>
            {openTopForm &&
                <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-12">
                    {createTopLvlCategoriesERRORMSG &&
                        <div className="sm:col-span-12">
                            <Alert severity="error">{createTopLvlCategoriesERRORMSG}</Alert>
                        </div>}
                    <div className="sm:col-span-12">
                        <FormControl fullWidth sx={{ m: 0 }} size="large" >
                            <TextField
                                error={TopInputErr}
                                id="standard-error-helper-text"
                                label="Top Level"
                                type='text'
                                onChange={(e) => setTopInput(e.target.value.trim())}
                                value={TopInput}
                                helperText={TopInputErr && TopInputErr}
                                variant="outlined"
                            />
                        </FormControl>
                    </div>
                    <div className="sm:col-span-12 -mt-3">
                        <Button onClick={onsubmit} type='button' color="success" variant="contained" style={{ width: "100%" }}>
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
                            Add Top Level Category
                        </Button>
                    </div>
                </div>
            }
        </div>
    )
}
