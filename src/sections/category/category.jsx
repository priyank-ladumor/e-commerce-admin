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
import { CPagination } from '@coreui/react'
import { CPaginationItem } from '@coreui/react'
import { CTableBody } from '@coreui/react'
import { CTableDataCell } from '@coreui/react'
import { CTableHead } from '@coreui/react'
import { CTableHeaderCell } from '@coreui/react'
import { CTableRow } from '@coreui/react'
import { RiDeleteBin5Fill } from "react-icons/ri";
import { MdEditSquare } from "react-icons/md";
import { FaGreaterThan } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { getSecondLvlCategoriesAction, getThirdLvlCategoriesAction, getTopLvlCategoriesAction } from 'src/store/action/categoriesAction.js';

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

export const Category = () => {
    const { getTopLvlCategoriesData, getSecondLvlCategoriesData, getThirdLvlCategoriesData } = useSelector(state => state.categories)

    const [open, setOpen] = React.useState(false);
    const [openTop, setOpenTop] = React.useState(true);
    const [openSecond, setOpenSecond] = React.useState(false);
    const [openThird, setOpenThird] = React.useState(false);
    const [TopData, setTopData] = React.useState(false);
    const [SecondData, setSecondData] = React.useState(false);
    const [ThirdData, setThirdData] = React.useState(false);
    // const [pageSize, setpageSize] = React.useState(false);
    // const [pageNumber, setpageNumber] = React.useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const dispatch = useDispatch()

    React.useEffect(() => {
        dispatch(getTopLvlCategoriesAction())
        dispatch(getSecondLvlCategoriesAction())
        dispatch(getThirdLvlCategoriesAction())
    }, [])

    React.useEffect(() => {
        if (getTopLvlCategoriesData) {
            setTopData(getTopLvlCategoriesData)
        }
        if (getThirdLvlCategoriesData) {
            setThirdData(getThirdLvlCategoriesData)
        }
        if (getSecondLvlCategoriesData) {
            setSecondData(getSecondLvlCategoriesData)
        }
    }, [getTopLvlCategoriesData, getThirdLvlCategoriesData, getSecondLvlCategoriesData])


    return (
        <Container>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                <Typography variant="h4">Category</Typography>

                <Button onClick={handleOpen} variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />}>Category</Button>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            <div className='text-4xl font-bold flex justify-between'>
                                <h2 className="text-3xl font-semibold leading-7 text-gray-900">Add New Product</h2>
                                <IoClose onClick={() => handleClose()} style={{ cursor: "pointer" }} />
                            </div>
                        </Typography>
                        {/* <Typography>

                        </Typography> */}
                    </Box>
                </Modal>
            </Stack>
            <CTable striped className='table table-bordered border-dark'>
                <CTableHead>
                    <CTableRow color="dark">
                        <CTableHeaderCell scope="col">#</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Categories</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
                    </CTableRow>
                </CTableHead>
                <CTableBody color="light">
                    <CTableRow>
                        <CTableHeaderCell scope="row">1</CTableHeaderCell>
                        <CTableDataCell className='flex items-center'>
                            <span className='text-blue-700 font-semibold cursor-pointer me-2' onClick={() => [setOpenTop(!openTop), setOpenSecond(false), setOpenThird(false)]}> {openTop ? <FaGreaterThan style={{ transform: "rotate(90deg)" }} /> : <FaGreaterThan />} </span>
                            Top Level Category
                        </CTableDataCell>
                        <CTableDataCell>
                            <RiDeleteBin5Fill className='' style={{ fontSize: "25px", color: "red", cursor: "pointer" }}>Delete</RiDeleteBin5Fill>
                        </CTableDataCell>
                    </CTableRow>
                    {
                        openTop && TopData &&
                        TopData.content.map((data) => {
                            return (
                                <CTableRow color="success">
                                    <CTableHeaderCell scope="row"></CTableHeaderCell>
                                    <CTableDataCell>
                                        {data.name}
                                    </CTableDataCell>
                                    <CTableDataCell className='flex items-center'>
                                        <MdEditSquare style={{ fontSize: "25px", color: "black", cursor: "pointer" }}>Edit</MdEditSquare>
                                        <RiDeleteBin5Fill className='ms-3' style={{ fontSize: "25px", color: "red", cursor: "pointer" }}>Delete</RiDeleteBin5Fill>
                                    </CTableDataCell>
                                </CTableRow>
                            )
                        })
                    }
                    {openTop && TopData &&
                        <CTableRow color="primary">
                            <CTableHeaderCell></CTableHeaderCell>
                            <CTableHeaderCell>
                                <div className='my-1'>
                                    <CPagination aria-label="Page navigation example">
                                        <CPaginationItem aria-label="Previous" disabled>
                                            <span aria-hidden="true">&laquo;</span>
                                        </CPaginationItem>
                                        <CPaginationItem active>1</CPaginationItem>
                                        <CPaginationItem>2</CPaginationItem>
                                        <CPaginationItem>3</CPaginationItem>
                                        <CPaginationItem aria-label="Next">
                                            <span aria-hidden="true">&raquo;</span>
                                        </CPaginationItem>
                                    </CPagination>
                                </div>
                            </CTableHeaderCell>
                            <CTableHeaderCell></CTableHeaderCell>
                        </CTableRow>}
                    <CTableRow>
                        <CTableHeaderCell scope="row">2</CTableHeaderCell>
                        <CTableDataCell className='flex items-center'>
                            <span className='text-blue-700 font-semibold cursor-pointer me-2' onClick={() => [setOpenSecond(!openSecond), setOpenTop(false), setOpenThird(false)]}>{openSecond ? <FaGreaterThan style={{ transform: "rotate(90deg)" }} /> : <FaGreaterThan />} </span>
                            Second Level Category
                        </CTableDataCell>
                        <CTableDataCell className=''>
                            <RiDeleteBin5Fill className='' style={{ fontSize: "25px", color: "red", cursor: "pointer" }}>Delete</RiDeleteBin5Fill>
                        </CTableDataCell>
                    </CTableRow>
                    {
                        openSecond && SecondData &&
                        SecondData.content.map((data) => {
                            return (
                                <CTableRow color="primary">
                                    <CTableHeaderCell scope="row"></CTableHeaderCell>
                                    <CTableDataCell>
                                        {data.name}
                                    </CTableDataCell>
                                    <CTableDataCell className='flex items-center'>
                                        <MdEditSquare style={{ fontSize: "25px", color: "black", cursor: "pointer" }}>Edit</MdEditSquare>
                                        <RiDeleteBin5Fill className='ms-3' style={{ fontSize: "25px", color: "red", cursor: "pointer" }}>Delete</RiDeleteBin5Fill>
                                    </CTableDataCell>
                                </CTableRow>
                            )
                        })
                    }
                    <CTableRow>
                        <CTableHeaderCell scope="row">3</CTableHeaderCell>
                        <CTableDataCell className='flex items-center'>
                            <span className='text-blue-700 font-semibold cursor-pointer me-2' onClick={() => [setOpenThird(!openThird), setOpenTop(false), setOpenSecond(false)]}>{openThird ? <FaGreaterThan style={{ transform: "rotate(90deg)" }} /> : <FaGreaterThan />} </span>
                            Third Level Category
                        </CTableDataCell>
                        <CTableDataCell className=''>
                            <RiDeleteBin5Fill className='' style={{ fontSize: "25px", color: "red", cursor: "pointer" }}>Delete</RiDeleteBin5Fill>
                        </CTableDataCell>
                    </CTableRow>
                    {
                        openThird && ThirdData &&
                        ThirdData.content.map((data) => {
                            return (
                                <CTableRow color="primary">
                                    <CTableHeaderCell scope="row"></CTableHeaderCell>
                                    <CTableDataCell>
                                        {data.name}
                                    </CTableDataCell>
                                    <CTableDataCell className='flex items-center'>
                                        <MdEditSquare style={{ fontSize: "25px", color: "black", cursor: "pointer" }}>Edit</MdEditSquare>
                                        <RiDeleteBin5Fill className='ms-3' style={{ fontSize: "25px", color: "red", cursor: "pointer" }}>Delete</RiDeleteBin5Fill>
                                    </CTableDataCell>
                                </CTableRow>
                            )
                        })
                    }
                </CTableBody>
            </CTable>
            {/* <div className='-mt-4 float-right border-2 border-solid'>page 1</div> */}
        </Container>
    )
}