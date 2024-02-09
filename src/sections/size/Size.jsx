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
import { getSizesAction, deleteSizesAction } from 'src/store/action/sizeAction';
// import {
//     MenuItem,
//     Select,
// } from "@mui/material";
// import FormControl from '@mui/material/FormControl';
// import { IoSave } from "react-icons/io5";
// import TextField from '@mui/material/TextField';
import Swal from 'sweetalert2'
// import { FaLessThan } from "react-icons/fa6";
// import { FaGreaterThan } from "react-icons/fa6";
// import { CreateThirdLvl } from './thirdlevel-category-create';
// import { CreateSecondLvl } from './secondlevel-category-create';
// import { CreateTopLvl } from './toplevel-category-create';
// import { MagnifyingGlass } from 'react-loader-spinner'

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
    const { getSizesDATA, deleteSizesMSG } = useSelector((state) => state.size)
    const [open, setOpen] = React.useState(false);
    const [getSizeData, setgetSizeData] = React.useState()

    //del popup size
    const [delSizePopUp, setdelSizePopUp] = React.useState(false)


    const handleOpen = () => [setOpen(true)];
    const handleClose = () => [setOpen(false)];

    React.useEffect(() => {
        dispatch(getSizesAction())
    }, [])

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
    return (
        <Container>
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
                                        <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
                                    </CTableRow>
                                </CTableHead>
                                {ele.options.map((opt) => {
                                    let id = ele.options.indexOf(opt) + 1
                                    return (
                                        <CTableBody color='light'>
                                            <CTableRow className='' color="light">
                                                <CTableHeaderCell className='' > <span className='flex items-center' >{id}</span></CTableHeaderCell>
                                                <CTableDataCell><span className='flex items-center' >{opt}</span></CTableDataCell>
                                                <CTableDataCell className='flex items-center'>
                                                    <MdEditSquare className='' style={{ fontSize: "25px", color: "black", cursor: "pointer" }}>Edit</MdEditSquare>
                                                    <RiDeleteBin5Fill className='ms-3' onClick={() => handleDeleteSizes(opt, ele.label)} style={{ fontSize: "25px", color: "red", cursor: "pointer" }}>Delete</RiDeleteBin5Fill>
                                                </CTableDataCell>
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