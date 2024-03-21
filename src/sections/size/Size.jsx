/* eslint-disable no-lonely-if */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-boolean-value */
/* eslint-disable spaced-comment */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-undef */
/* eslint-disable perfectionist/sort-named-imports */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable react/self-closing-comp */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-shadow */
/* eslint-disable prefer-const */
/* eslint-disable no-plusplus */
/* eslint-disable import/no-duplicates */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/order */
/* eslint-disable perfectionist/sort-imports */
/* eslint-disable arrow-body-style */
import * as React from 'react';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Iconify from '../../components/iconify/iconify';
import { IoClose } from "react-icons/io5";
import { CTable } from '@coreui/react'
import { CTableBody } from '@coreui/react'
import { CTableDataCell } from '@coreui/react'
import { CTableHead } from '@coreui/react'
import { CTableHeaderCell } from '@coreui/react'
import { CTableRow } from '@coreui/react'
import { RiDeleteBin5Fill } from "react-icons/ri";
import { MdEditSquare } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { getSizesAction, deleteSizesAction, updateSizeAction, createLabelAction, createOptionAction, deleteSizeTableAction } from 'src/store/action/sizeAction';
// import {
//     MenuItem,
//     OutlinedInput,
//     FormHelperText,
//     Select,
// } from "@mui/material";
import FormControl from '@mui/material/FormControl';
import { IoSave } from "react-icons/io5";
import TextField from '@mui/material/TextField';
import Swal from 'sweetalert2'
// import { FaLessThan } from "react-icons/fa6";
import { FaGreaterThan } from "react-icons/fa6";
// import { CreateThirdLvl } from './thirdlevel-category-create';
// import { CreateSecondLvl } from './secondlevel-category-create';
// import { CreateTopLvl } from './toplevel-category-create';
// import { MagnifyingGlass } from 'react-loader-spinner'
import Autocomplete from '@mui/material/Autocomplete';
import Alert from '@mui/material/Alert';

//modal style
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 3,
};


export const SizeView = () => {
    const dispatch = useDispatch()
    const { getSizesDATA, deleteSizesMSG, updateSizeMSG, createLabelMSG, deleteSizeTableMSG, createOptionMSG, createLabelERR, createOptionERR } = useSelector((state) => state.size)
    const [open, setOpen] = React.useState(false);
    const [getSizeData, setgetSizeData] = React.useState()

    //edit input open
    const [editOpen, seteditOpen] = React.useState(false)
    const [editOpenPopUp, seteditOpenPopUp] = React.useState(false)
    const [newOption, setnewOption] = React.useState("")
    const [oldopt, setoldopt] = React.useState("")
    const [labelEdit, setlabelEdit] = React.useState("")
    const [newOptionErr, setnewOptionErr] = React.useState("")

    //del popup size
    const [delSizePopUp, setdelSizePopUp] = React.useState(false)

    //open create form
    const [openModalForm, setopenModalForm] = React.useState(false)

    const handleOpen = () => [setOpen(true)];
    const handleClose = () => [setOpen(false)];

    //create label
    const [AddLabel, setAddLabel] = React.useState("")
    const [AddLabelERR, setAddLabelERR] = React.useState("")
    const [AddLabelPopUp, setAddLabelPopUp] = React.useState(false)

    //create Option
    const [AddOption, setAddOption] = React.useState("")
    const [AddOptionERR, setAddOptionERR] = React.useState("")
    const [getAddLabel, setgetAddLabel] = React.useState("")
    const [getAddLabelERR, setgetAddLabelERR] = React.useState("")
    const [AddOptionPopUp, setAddOptionPopUp] = React.useState(false)

    React.useEffect(() => {
        dispatch(getSizesAction())
    }, [openModalForm])

    React.useEffect(() => {
        if (getSizesDATA?.length > 0) {
            setgetSizeData(getSizesDATA)
        }
    }, [getSizesDATA])

    React.useEffect(() => {
        if (deleteSizesMSG && delSizePopUp) {
            <div className='swal2-container'>
                {Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: deleteSizesMSG?.msg,
                    showConfirmButton: false,
                    timer: 2500
                })}
            </div>
            setdelSizePopUp(false)
            dispatch(getSizesAction())
        }
    }, [deleteSizesMSG])

    const handleDeleteSizes = (opt, lab) => {

        dispatch(deleteSizesAction({
            option: opt,
            label: lab
        }))

        setdelSizePopUp(true)
    }

    React.useEffect(() => {
        if (updateSizeMSG && editOpenPopUp) {
            <div className='swal2-container'>
                {Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: updateSizeMSG?.msg,
                    showConfirmButton: false,
                    timer: 2500
                })}
            </div>
            seteditOpenPopUp(true)
            setlabelEdit("")
            setnewOptionErr("")
            setoldopt("")
            setnewOption("")
            dispatch(getSizesAction())
        }
    }, [updateSizeMSG])

    const handleEditSizes = () => {
        const data = {
            label: labelEdit,
            option: oldopt,
            newOption
        }
        if (newOption.length === 0) {
            setCategoryLenErr("please enter option")
        } else {
            dispatch(updateSizeAction(data))
            seteditOpenPopUp(true)
            seteditOpen(false)
            setlabelEdit("")
            setnewOptionErr("")
            setoldopt("")
            setnewOption("")
        }
    }

    //create label
    const onsubmitLabel = () => {
        const items = { label: AddLabel }
        if (AddLabel.length === 0) {
            setAddLabelERR("please enter label")
        } else {
            dispatch(createLabelAction(items));
            setAddLabelERR("")
            setAddLabel("")
            setAddLabelPopUp(true)
        }
    }
    React.useEffect(() => {
        if (createLabelMSG && AddLabelPopUp) {
            <div className='swal2-container'>
                {Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: createLabelMSG?.msg,
                    showConfirmButton: false,
                    timer: 2500
                })}
            </div>
            setAddLabelERR("")
            setAddLabel("")
            setAddLabelPopUp(false)
            dispatch(getSizesAction())
        }
    }, [createLabelMSG])

    //option create
    const onsubmitOption = () => {
        if (getAddLabel.length > 0 && AddOption.length > 0) {
            const items = { label: getAddLabel, option: AddOption }
            dispatch(createOptionAction(items));
            setgetAddLabelERR("")
            setAddOptionERR("")
            setgetAddLabel("")
            setAddOption("")
            setAddOptionPopUp(true)
        } else {
            if (getAddLabel.length === 0) {
                setgetAddLabelERR('Please Enter Label')
            }
            if (AddOption.length === 0) {
                setAddOptionERR('Please Enter Option')
            }
        }
    }
    React.useEffect(() => {
        if (createOptionMSG && AddOptionPopUp) {
            <div className='swal2-container'>
                {Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: createOptionMSG?.msg,
                    showConfirmButton: false,
                    timer: 2500
                })}
            </div>
            setgetAddLabelERR("")
            setAddOptionERR("")
            setgetAddLabel("")
            setAddOption("")
            setAddOptionPopUp(false)
            dispatch(getSizesAction())
        }
    }, [createOptionMSG])

    //delete table
    const [delTablePopUp, setdelTablePopUp] = React.useState(false)

    const handleTableDelete = (labelTableDel) => {
        console.log(labelTableDel);
        dispatch(deleteSizeTableAction({ label: labelTableDel }))
        setdelTablePopUp(true)
    }
    React.useEffect(() => {
        if (deleteSizeTableMSG && delTablePopUp) {
            <div className='swal2-container'>
                {Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: deleteSizeTableMSG?.msg,
                    showConfirmButton: false,
                    timer: 2500
                })}
            </div>
            setdelTablePopUp(false)
            dispatch(getSizesAction())
        }
    }, [deleteSizeTableMSG])

    return (
        <Container className='mt-8' maxWidth="xl" >
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                <Typography variant="h4">Size</Typography>

                <Button onClick={handleOpen} variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />}>New Size</Button>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            <div className='text-4xl font-bold flex justify-between'>
                                <h2 className="text-2xl font-semibold leading-7 text-gray-900">Add New Sizes</h2>
                                <IoClose onClick={() => handleClose()} style={{ cursor: "pointer" }} />
                            </div>
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ pt: 3, p: 3, minWidth: "300px", maxHeight: "80vh", overflowY: "auto", overflowX: "hidden" }}>
                            <div className="-mt-3 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-12">
                                <div className="sm:col-span-12">
                                    <span className='flex items-center mt-3 -mb-3' style={{ fontWeight: "700", width: "450px" }}>
                                        Label
                                        {openModalForm ?
                                            <FaGreaterThan className="ms-2" onClick={() => setopenModalForm(!openModalForm)} style={{ transform: "rotate(90deg)", color: "blue", cursor: "pointer" }} />
                                            : <FaGreaterThan className='ms-2' onClick={() => setopenModalForm(!openModalForm)} style={{ color: "blue", cursor: "pointer" }} />
                                        }
                                    </span>
                                </div>
                            </div>
                            {openModalForm &&
                                <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-12">
                                    {createLabelERR &&
                                        <div className="sm:col-span-12">
                                            <Alert severity="error">this label is already exits</Alert>
                                        </div>}
                                    <div className="sm:col-span-12">
                                        <FormControl fullWidth sx={{ m: 0 }} size="large" >
                                            <TextField
                                                error={AddLabelERR && AddLabel.length === 0}
                                                id="standard-error-helper-text"
                                                label="Label"
                                                type='text'
                                                onChange={(e) => setAddLabel(e.target.value.trim().toLowerCase())}
                                                value={AddLabel}
                                                helperText={AddLabelERR && AddLabel.length === 0 && AddLabelERR}
                                                variant="outlined"
                                            />
                                        </FormControl>
                                    </div>
                                    <div className="sm:col-span-12 -mt-3">
                                        <Button onClick={onsubmitLabel} type='button' color="success" variant="contained" style={{ width: "100%" }}>
                                            Add Label
                                        </Button>
                                    </div>
                                </div>
                            }
                            <div className=" grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-12">
                                <div className="sm:col-span-12">
                                    <span className='flex items-center mt-3 -mb-3' style={{ fontWeight: "700", width: "450px" }}>
                                        Size
                                        {openModalForm ?
                                            <FaGreaterThan className='ms-2' onClick={() => setopenModalForm(!openModalForm)} style={{ color: "blue", cursor: "pointer" }} />
                                            :
                                            <FaGreaterThan className="ms-2" onClick={() => setopenModalForm(!openModalForm)} style={{ transform: "rotate(90deg)", color: "blue", cursor: "pointer" }} />
                                        }
                                    </span>
                                </div>
                            </div>
                            {
                                !openModalForm &&
                                <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-12">
                                    {createOptionERR &&
                                        <div className="sm:col-span-12">
                                            <Alert severity="error">this option is already exits</Alert>
                                        </div>}
                                    <div className="sm:col-span-6">
                                        <FormControl fullWidth sx={{ m: 0 }} size="large" >
                                            <Autocomplete
                                                value={getAddLabel}
                                                onChange={(event, newValue) => [
                                                    setgetAddLabel(newValue),
                                                ]}
                                                id="controllable-states-demo"
                                                options={getSizeData && getSizeData.map((data) => {
                                                    return (
                                                        data.label
                                                    )
                                                })}

                                                sx={{ width: "100%" }}
                                                renderInput={(params) => <TextField error={getAddLabelERR && getAddLabel?.length === 0} helperText={getAddLabelERR && getAddLabel?.length === 0 && getAddLabelERR}  {...params} label="Top Level" />}
                                            />
                                        </FormControl>
                                    </div>
                                    <div className="sm:col-span-6">
                                        <FormControl fullWidth sx={{ m: 0 }} size="large" >
                                            <TextField
                                                error={AddOptionERR && AddOption.length === 0}
                                                id="standard-error-helper-text"
                                                label="Size"
                                                type='text'
                                                onChange={(e) => setAddOption(e.target.value.trim().toUpperCase())}
                                                value={AddOption}
                                                helperText={AddOptionERR && AddOption.length === 0 && AddOptionERR}
                                                variant="outlined"
                                                disabled={getAddLabel?.length === 0}
                                            />
                                        </FormControl>
                                    </div>
                                    <div className="sm:col-span-12 -mt-3">
                                        <Button onClick={onsubmitOption} type='button' color="success" variant="contained" style={{ width: "100%" }}>
                                            Add Size
                                        </Button>
                                    </div>
                                </div>
                            }
                        </Typography>
                    </Box>
                </Modal>
            </Stack>
            <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-12">
                {getSizeData && getSizeData.map((ele) => {
                    return (
                        <div className="sm:col-span-4" key={ele} >
                            <CTable striped className='table table-bordered border-dark'>
                                <CTableHead>
                                    <CTableRow className='border-none' color="dark">
                                        <CTableHeaderCell scope="col">#</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">{ele.label.charAt(0).toUpperCase()}{ele.label.slice(1)} Sizes</CTableHeaderCell>
                                        <CTableHeaderCell scope="col" className='flex items-center' >
                                            <span className='' >Actions</span>
                                            <RiDeleteBin5Fill onClick={() => handleTableDelete(ele.label)} className='ms-2' style={{ fontSize: "25px", width: "25px", height: "25px", color: "red", cursor: "pointer", opacity: "1" }}>Delete</RiDeleteBin5Fill>
                                        </CTableHeaderCell>
                                    </CTableRow>
                                </CTableHead>
                                {ele.options.map((opt) => {
                                    let id = ele.options.indexOf(opt) + 1
                                    return (
                                        <CTableBody color='light' >
                                            <CTableRow className='' color="light">
                                                <CTableHeaderCell className='' > <span className='flex items-center' >{id}</span></CTableHeaderCell>
                                                {
                                                    editOpen && oldopt === opt ?
                                                        <CTableDataCell>
                                                            <TextField error={newOption.length === 0} helperText={newOption.length === 0 && newOptionErr} className='' onChange={e => [setnewOption(e.target.value.trim().toUpperCase()), newOption.length === 0 && setnewOptionErr("please enter option")]} value={newOption} style={{ width: "150px", height: "25px", display: "flex", justifyContent: "center", textAlign: "center" }} type='text' id="standard-basic" label="" variant="standard" />
                                                        </CTableDataCell>
                                                        :
                                                        <CTableDataCell> <span className='flex items-center' >{opt}</span></CTableDataCell>
                                                }
                                                {
                                                    editOpen && oldopt === opt ?
                                                        <CTableDataCell className='flex items-center'>
                                                            <IoSave style={{ fontSize: "23px", color: "blue", cursor: "pointer" }} onClick={handleEditSizes} >Save</IoSave>
                                                            <RiDeleteBin5Fill className='ms-3' disabled style={{ fontSize: "25px", height: newOption.length === 0 ? "45px" : "25px", color: "red", cursor: "no-drop", opacity: "0.5" }}>Delete</RiDeleteBin5Fill>
                                                        </CTableDataCell>
                                                        :
                                                        !editOpen ?
                                                            <CTableDataCell className='flex items-center'>
                                                                <MdEditSquare onClick={() => [seteditOpen(!editOpen), setoldopt(opt), setnewOption(opt), setlabelEdit(ele.label)]} style={{ fontSize: "25px", color: "black", cursor: "pointer" }}>Edit</MdEditSquare>
                                                                <RiDeleteBin5Fill className='ms-3' onClick={() => handleDeleteSizes(opt, ele.label)} style={{ fontSize: "25px", color: "red", cursor: "pointer" }}>Delete</RiDeleteBin5Fill>
                                                            </CTableDataCell>
                                                            :
                                                            <CTableDataCell className='flex items-center'>
                                                                <MdEditSquare style={{ fontSize: "25px", color: "black", cursor: "no-drop", opacity: "0.5" }}>Edit</MdEditSquare>
                                                                <RiDeleteBin5Fill className='ms-3' style={{ fontSize: "25px", color: "red", cursor: "no-drop", opacity: "0.5" }}>Delete</RiDeleteBin5Fill>
                                                            </CTableDataCell>
                                                }
                                            </CTableRow>
                                        </CTableBody>
                                    )
                                })}
                            </CTable>
                        </div>
                    )
                })
                }
            </div>
        </Container>
    )
}