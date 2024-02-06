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
// import { CPagination } from '@coreui/react'
// import { CPaginationItem } from '@coreui/react'
import { CTableBody } from '@coreui/react'
import { CTableDataCell } from '@coreui/react'
import { CTableHead } from '@coreui/react'
import { CTableHeaderCell } from '@coreui/react'
import { CTableRow } from '@coreui/react'
import { RiDeleteBin5Fill } from "react-icons/ri";
import { MdEditSquare } from "react-icons/md";
// import { FaGreaterThan } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { EditCategoriesAction, deleteCategoriesAction, getSecondLvlCategoriesAction, getThirdLvlCategoriesAction, getTopLvlCategoriesAction } from 'src/store/action/categoriesAction.js';
import {
    MenuItem,
    Select,
} from "@mui/material";
import FormControl from '@mui/material/FormControl';
// import { ToastContainer, toast } from 'react-toastify';
import { IoSave } from "react-icons/io5";
import TextField from '@mui/material/TextField';
import Swal from 'sweetalert2'
import { FaLessThan } from "react-icons/fa6";
import { FaGreaterThan } from "react-icons/fa6";
import { CreateThirdLvl } from './thirdlevel-category-create';
// import InputLabel from '@mui/material/InputLabel';

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
    const { getTopLvlCategoriesData, getSecondLvlCategoriesData, getThirdLvlCategoriesData, deleteCategoriesMSG, EditCategoriesMSG } = useSelector(state => state.categories)

    const [open, setOpen] = React.useState(false);
    const [openTop, setOpenTop] = React.useState(false);
    const [openSecond, setOpenSecond] = React.useState(false);
    const [openThird, setOpenThird] = React.useState(true);
    const [TopData, setTopData] = React.useState(false);
    const [SecondData, setSecondData] = React.useState(false);
    const [ThirdData, setThirdData] = React.useState(false);
    const [pageSize, setpageSize] = React.useState(5);
    const [pageNumber, setpageNumber] = React.useState(1);
    const [CategoryID, setCategoryID] = React.useState("");
    const [EditCategoryID, setEditCategoryID] = React.useState("");
    const [Category, setCategory] = React.useState("");
    const [CategoryLenErr, setCategoryLenErr] = React.useState("");
    const [deletepopUp, setdeletepopUp] = React.useState(false)
    const [editpopUp, seteditpopUp] = React.useState(false)

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const dispatch = useDispatch()
    React.useEffect(() => {

        const item = {
            pageSize,
            pageNumber,
            CategoryID
        }

        const query = `?pageNumber=${pageNumber}&pageSize=${pageSize}`
        dispatch(getTopLvlCategoriesAction(item))
        dispatch(getSecondLvlCategoriesAction(query))
        dispatch(getThirdLvlCategoriesAction(item))

        if (CategoryID.length !== 0 && !deletepopUp) {
            dispatch(deleteCategoriesAction(item))
            setdeletepopUp(true)
        }
    }, [pageSize, pageNumber, CategoryID, EditCategoryID])

    React.useEffect(() => {
        if (deleteCategoriesMSG && deletepopUp) {
            <div className='swal2-container'>
                {Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Category successfully deleted",
                    showConfirmButton: false,
                    timer: 2500
                })}
            </div>
            setdeletepopUp(false)
            setCategoryID("")
        }
    }, [deleteCategoriesMSG])

    React.useEffect(() => {
        if (EditCategoriesMSG && editpopUp ) {
            <div className='swal2-container'>
                {Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Category updated successfully",
                    showConfirmButton: false,
                    timer: 2500
                })}
            </div>
            seteditpopUp(false)
            setEditCategoryID("")
        }
    }, [EditCategoriesMSG])

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

    const handleChangePageSize = (event) => {
        setpageSize(event.target.value);
        setpageNumber(1)
    }
    const handleEditCategories = () => {
        const data = {
            category: Category,
            id: EditCategoryID
        }
        if (Category.length === 0) {
            setCategoryLenErr("please enter category")
        } else {
            dispatch(EditCategoriesAction(data))
            seteditpopUp(true)
            setEditCategoryID("")
            setCategory("")
        }
    }
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
                                <h2 className="text-2xl font-semibold leading-7 text-gray-900">Add New Categories</h2>
                                <IoClose onClick={() => handleClose()} style={{ cursor: "pointer" }} />
                            </div>
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ pt: 3, maxHeight: "80vh", overflowY: "auto" }}>

                            {/* top level  */}
                            <div className=" grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-12">
                                <div className="sm:col-span-12">
                                    <FormControl fullWidth sx={{ m: 0 }} size="large" >
                                        <TextField
                                            // error={errors && errors.title?.message}
                                            id="standard-error-helper-text"
                                            label="Top Level Category"
                                            type='text'
                                            // {...register("title")}
                                            // helperText={errors && errors.title?.message}
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
                                        Add Top Level Category
                                    </Button>
                                </div>
                            </div>

                            {/* second level  */}
                            <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-12">
                                <div className="sm:col-span-6">
                                    <FormControl fullWidth sx={{ m: 0 }} size="large" >
                                        <TextField
                                            // error={errors && errors.title?.message}
                                            id="standard-error-helper-text"
                                            label="Top Level Category"
                                            type='text'
                                            // {...register("title")}
                                            // helperText={errors && errors.title?.message}
                                            variant="outlined"
                                        />
                                    </FormControl>
                                </div>
                                <div className="sm:col-span-6">
                                    <FormControl fullWidth sx={{ m: 0 }} size="large" >
                                        <TextField
                                            // error={errors && errors.title?.message}
                                            id="standard-error-helper-text"
                                            label="Second Level Category"
                                            type='text'
                                            // {...register("title")}
                                            // helperText={errors && errors.title?.message}
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
                                        Add Second Level Category
                                    </Button>
                                </div>
                            </div>

                            {/* third level  */}
                            <CreateThirdLvl />
                        </Typography>
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
                    {/* top level  */}
                    <CTableRow>
                        <CTableHeaderCell scope="row">1</CTableHeaderCell>
                        <CTableDataCell className='flex items-center'>
                            <span className='text-blue-700 font-semibold cursor-pointer me-2' onClick={() => [setOpenTop(!openTop), setOpenSecond(false), setOpenThird(false), setdeletepopUp(false), seteditpopUp(false), setpageSize(5), setpageNumber(1), setCategoryID(""), setEditCategoryID(""), setCategory(""), setCategoryLenErr("")]}> {openTop ? <FaGreaterThan style={{ transform: "rotate(90deg)" }} /> : <FaGreaterThan />} </span>
                            Top Level Category
                        </CTableDataCell>
                        <CTableDataCell>
                            <RiDeleteBin5Fill className='' style={{ fontSize: "25px", color: "red", cursor: "no-drop", opacity: "0.5" }}>Delete</RiDeleteBin5Fill>
                        </CTableDataCell>
                    </CTableRow>
                    {
                        openTop && TopData &&
                        TopData.content.map((data) => {
                            return (
                                <CTableRow color="success">
                                    <CTableDataCell scope="row"></CTableDataCell>
                                    {
                                        EditCategoryID === data._id ?
                                            <CTableDataCell>
                                                <TextField error={Category.length === 0} helperText={Category.length === 0 && CategoryLenErr} className='' onChange={e => [setCategory(e.target.value.trim()), Category.length === 0 && setCategoryLenErr("please enter category")]} value={Category} style={{ width: "150px", height: Category.length === 0 ? "45px" : "25px", display: "flex", justifyContent: "center", textAlign: "center" }} type='text' id="standard-basic" label="" variant="standard" />
                                            </CTableDataCell>
                                            :
                                            <CTableDataCell>{data.name}</CTableDataCell>
                                    }
                                    {
                                        EditCategoryID === data._id ?
                                            <CTableDataCell className='flex items-center'>
                                                <IoSave style={{ fontSize: "23px", color: "blue", cursor: "pointer" }} onClick={handleEditCategories} >Save</IoSave>
                                                <RiDeleteBin5Fill className='ms-3' disabled style={{ fontSize: "25px", height: Category.length === 0 ? "45px" : "25px", color: "red", cursor: "no-drop", opacity: "0.5" }}>Delete</RiDeleteBin5Fill>
                                            </CTableDataCell>
                                            :
                                            !EditCategoryID ?
                                                <CTableDataCell className='flex items-center'>
                                                    <MdEditSquare onClick={() => [setEditCategoryID(data._id), setCategory(data.name)]} style={{ fontSize: "25px", color: "black", cursor: "pointer" }}>Edit</MdEditSquare>
                                                    <RiDeleteBin5Fill className='ms-3' onClick={() => setCategoryID(data._id)} style={{ fontSize: "25px", color: "red", cursor: "pointer" }}>Delete</RiDeleteBin5Fill>
                                                </CTableDataCell>
                                                :
                                                <CTableDataCell className='flex items-center'>
                                                    <MdEditSquare style={{ fontSize: "25px", color: "black", cursor: "no-drop", opacity: "0.5" }}>Edit</MdEditSquare>
                                                    <RiDeleteBin5Fill className='ms-3' style={{ fontSize: "25px", color: "red", cursor: "no-drop", opacity: "0.5" }}>Delete</RiDeleteBin5Fill>
                                                </CTableDataCell>
                                    }
                                </CTableRow>
                            )
                        })
                    }
                    {openTop && TopData && TopData.totalPages > 1 &&
                        <CTableRow color="primary">
                            <CTableHeaderCell></CTableHeaderCell>
                            <CTableHeaderCell>
                                <div className='my-1 flex items-center justify-around sm:flex'>
                                    <span className='hide'>Rows per page:
                                        <FormControl variant="standard" className='ms-1' sx={{ m: 0 }}>
                                            <Select
                                                id="demo-simple-select-standard"
                                                value={pageSize}
                                                onChange={handleChangePageSize}
                                                displayEmpty
                                                style={{ padding: "0px", width: "30px" }}
                                                inputProps={{ 'aria-label': 'Without label' }}
                                            >
                                                <MenuItem value="3">
                                                    <em>3</em>
                                                </MenuItem>
                                                <MenuItem value="5">
                                                    <em>5</em>
                                                </MenuItem>
                                                <MenuItem value="7">
                                                    <em>7</em>
                                                </MenuItem>
                                                <MenuItem value="9">
                                                    <em>9</em>
                                                </MenuItem>
                                            </Select>
                                        </FormControl>
                                    </span>
                                    <div className='flex justify-center items-center'>
                                        <FaLessThan className='me-2 font-normal ' style={{ fontSize: "20px", opacity: pageNumber === 1 && "0.4", cursor: "pointer" }} onClick={() => [pageNumber === 1 ? "" : setpageNumber(pageNumber - 1), setdeletepopUp(false), seteditpopUp(false),]} />
                                        <span style={{ fontSize: "21px", fontWeight: "medium" }}>{pageNumber}</span>
                                        <FaGreaterThan className='ms-2' style={{ fontSize: "20px", opacity: TopData.totalPages === pageNumber && "0.4", cursor: "pointer" }} onClick={() => [TopData.totalPages === pageNumber ? "" : setpageNumber(pageNumber + 1), setdeletepopUp(false), seteditpopUp(false),]} />
                                    </div>

                                    <span className='hide2'>Total Pages:  {TopData.totalPages}</span>
                                </div>
                            </CTableHeaderCell>
                            <CTableHeaderCell></CTableHeaderCell>
                        </CTableRow>}

                    {/* second level */}
                    <CTableRow>
                        <CTableHeaderCell scope="row">2</CTableHeaderCell>
                        <CTableDataCell className='flex items-center'>
                            <span className='text-blue-700 font-semibold cursor-pointer me-2' onClick={() => [setOpenSecond(!openSecond), setOpenTop(false), setdeletepopUp(false), seteditpopUp(false), setOpenThird(false), setpageSize(5), setpageNumber(1), setCategoryID(""), setEditCategoryID(""), setCategory(""), setCategoryLenErr("")]}>{openSecond ? <FaGreaterThan style={{ transform: "rotate(90deg)" }} /> : <FaGreaterThan />} </span>
                            Second Level Category
                        </CTableDataCell>
                        <CTableDataCell className=''>
                            <RiDeleteBin5Fill className='' style={{ fontSize: "25px", color: "red", cursor: "no-drop", opacity: "0.5" }}>Delete</RiDeleteBin5Fill>
                        </CTableDataCell>
                    </CTableRow>
                    {
                        openSecond && SecondData &&
                        SecondData.content.map((data) => {
                            return (
                                <CTableRow color="success">
                                    <CTableDataCell scope="row"></CTableDataCell>
                                    {
                                        EditCategoryID === data._id ?
                                            <CTableDataCell>
                                                <TextField error={Category.length === 0} helperText={Category.length === 0 && CategoryLenErr} className='' onChange={e => [setCategory(e.target.value.trim()), Category.length === 0 && setCategoryLenErr("please enter category")]} value={Category} style={{ width: "150px", height: Category.length === 0 ? "45px" : "25px", display: "flex", justifyContent: "center", textAlign: "center" }} type='text' id="standard-basic" label="" variant="standard" />
                                            </CTableDataCell>
                                            :
                                            <CTableDataCell>{data.name}</CTableDataCell>
                                    }
                                    {
                                        EditCategoryID === data._id ?
                                            <CTableDataCell className='flex items-center'>
                                                <IoSave style={{ fontSize: "23px", color: "blue", cursor: "pointer" }} onClick={handleEditCategories} >Save</IoSave>
                                                <RiDeleteBin5Fill className='ms-3' disabled style={{ fontSize: "25px", height: Category.length === 0 ? "45px" : "25px", color: "red", cursor: "no-drop", opacity: "0.5" }}>Delete</RiDeleteBin5Fill>
                                            </CTableDataCell>
                                            :
                                            !EditCategoryID ?
                                                <CTableDataCell className='flex items-center'>
                                                    <MdEditSquare onClick={() => [setEditCategoryID(data._id), setCategory(data.name)]} style={{ fontSize: "25px", color: "black", cursor: "pointer" }}>Edit</MdEditSquare>
                                                    <RiDeleteBin5Fill className='ms-3' onClick={() => setCategoryID(data._id)} style={{ fontSize: "25px", color: "red", cursor: "pointer" }}>Delete</RiDeleteBin5Fill>
                                                </CTableDataCell>
                                                :
                                                <CTableDataCell className='flex items-center'>
                                                    <MdEditSquare style={{ fontSize: "25px", color: "black", cursor: "no-drop", opacity: "0.5" }}>Edit</MdEditSquare>
                                                    <RiDeleteBin5Fill className='ms-3' style={{ fontSize: "25px", color: "red", cursor: "no-drop", opacity: "0.5" }}>Delete</RiDeleteBin5Fill>
                                                </CTableDataCell>
                                    }
                                </CTableRow>
                            )
                        })
                    }
                    {openSecond && SecondData && SecondData.totalPages > 1 &&
                        <CTableRow color="primary">
                            <CTableHeaderCell></CTableHeaderCell>
                            <CTableHeaderCell>
                                <div className='my-1 flex items-center justify-around sm:flex'>
                                    <span className='hide'>Rows per page:
                                        <FormControl variant="standard" className='ms-1' sx={{ m: 0 }}>
                                            <Select
                                                id="demo-simple-select-standard"
                                                value={pageSize}
                                                onChange={handleChangePageSize}
                                                displayEmpty
                                                style={{ padding: "0px", width: "30px" }}
                                                inputProps={{ 'aria-label': 'Without label' }}
                                            >
                                                <MenuItem value="3">
                                                    <em>3</em>
                                                </MenuItem>
                                                <MenuItem value="5">
                                                    <em>5</em>
                                                </MenuItem>
                                                <MenuItem value="7">
                                                    <em>7</em>
                                                </MenuItem>
                                                <MenuItem value="9">
                                                    <em>9</em>
                                                </MenuItem>
                                            </Select>
                                        </FormControl>
                                    </span>
                                    {/* <CPagination aria-label="Page navigation example">
                                        <CPaginationItem aria-label="Previous" className='cursor-pointer' onClick={() => [setpageNumber(pageNumber - 1)]} disabled={pageNumber === 1}>
                                            <span aria-hidden="true">&laquo;</span>
                                        </CPaginationItem>
                                        {pageNumber === 1 ? "" : <CPaginationItem className='cursor-pointer' onClick={() => [setpageNumber(pageNumber - 1)]}>{pageNumber - 1}</CPaginationItem>}
                                        <CPaginationItem active={pageNumber}>{pageNumber}</CPaginationItem>
                                        {SecondData.totalPages > pageNumber &&
                                            <CPaginationItem className='cursor-pointer' onClick={() => [setpageNumber(pageNumber + 1)]} disabled={SecondData.content.length === 0}>{pageNumber + 1}</CPaginationItem>
                                        }
                                        <CPaginationItem aria-label="Next" className='cursor-pointer' disabled={SecondData.totalPages === pageNumber} onClick={() => [setpageNumber(pageNumber + 1)]}>
                                            <span aria-hidden="true">&raquo;</span>
                                        </CPaginationItem>
                                    </CPagination> */}
                                    <div className='flex justify-center items-center'>
                                        <FaLessThan className='me-2 font-normal ' style={{ fontSize: "20px", opacity: pageNumber === 1 && "0.4", cursor: "pointer" }} onClick={() => [pageNumber === 1 ? "" : setpageNumber(pageNumber - 1), setdeletepopUp(false), seteditpopUp(false),]} />
                                        <span style={{ fontSize: "21px", fontWeight: "medium" }}>{pageNumber}</span>
                                        <FaGreaterThan className='ms-2' style={{ fontSize: "20px", opacity: SecondData.totalPages === pageNumber && "0.4", cursor: "pointer" }} onClick={() => [SecondData.totalPages === pageNumber ? "" : setpageNumber(pageNumber + 1), setdeletepopUp(false), seteditpopUp(false),]} />
                                    </div>
                                    <span className='hide2'>Total Pages:  {SecondData.totalPages}</span>
                                </div>
                            </CTableHeaderCell>
                            <CTableHeaderCell></CTableHeaderCell>
                        </CTableRow>}

                    {/* third level  */}
                    <CTableRow>
                        <CTableHeaderCell scope="row">3</CTableHeaderCell>
                        <CTableDataCell className='flex items-center'>
                            <span className='text-blue-700 font-semibold cursor-pointer me-2' onClick={() => [setOpenThird(!openThird), setOpenTop(false), setdeletepopUp(false), seteditpopUp(false), setOpenSecond(false), setpageSize(5), setpageNumber(1), setCategoryID(""), setEditCategoryID(""), setCategory(""), setCategoryLenErr("")]}>{openThird ? <FaGreaterThan style={{ transform: "rotate(90deg)" }} /> : <FaGreaterThan />} </span>
                            Third Level Category
                        </CTableDataCell>
                        <CTableDataCell className=''>
                            <RiDeleteBin5Fill className='' style={{ fontSize: "25px", color: "red", cursor: "no-drop", opacity: "0.5" }}>Delete</RiDeleteBin5Fill>
                        </CTableDataCell>
                    </CTableRow>
                    {
                        openThird && ThirdData &&
                        ThirdData.content.map((data) => {
                            return (
                                <CTableRow color="success">
                                    <CTableDataCell scope="row"></CTableDataCell>
                                    {
                                        EditCategoryID === data._id ?
                                            <CTableDataCell>
                                                <TextField error={Category.length === 0} helperText={Category.length === 0 && CategoryLenErr} className='' onChange={e => [setCategory(e.target.value.trim()), Category.length === 0 && setCategoryLenErr("please enter category")]} value={Category} style={{ width: "150px", height: Category.length === 0 ? "45px" : "25px", display: "flex", justifyContent: "center", textAlign: "center" }} type='text' id="standard-basic" label="" variant="standard" />
                                            </CTableDataCell>
                                            :
                                            <CTableDataCell>{data.name}</CTableDataCell>
                                    }
                                    {
                                        EditCategoryID === data._id ?
                                            <CTableDataCell className='flex items-center'>
                                                <IoSave style={{ fontSize: "23px", color: "blue", cursor: "pointer" }} onClick={handleEditCategories} >Save</IoSave>
                                                <RiDeleteBin5Fill className='ms-3' disabled style={{ fontSize: "25px", height: Category.length === 0 ? "45px" : "25px", color: "red", cursor: "no-drop", opacity: "0.5" }}>Delete</RiDeleteBin5Fill>
                                            </CTableDataCell>
                                            :
                                            !EditCategoryID ?
                                                <CTableDataCell className='flex items-center'>
                                                    <MdEditSquare onClick={() => [setEditCategoryID(data._id), setCategory(data.name)]} style={{ fontSize: "25px", color: "black", cursor: "pointer" }}>Edit</MdEditSquare>
                                                    <RiDeleteBin5Fill className='ms-3' onClick={() => setCategoryID(data._id)} style={{ fontSize: "25px", color: "red", cursor: "pointer" }}>Delete</RiDeleteBin5Fill>
                                                </CTableDataCell>
                                                :
                                                <CTableDataCell className='flex items-center'>
                                                    <MdEditSquare style={{ fontSize: "25px", color: "black", cursor: "no-drop", opacity: "0.5" }}>Edit</MdEditSquare>
                                                    <RiDeleteBin5Fill className='ms-3' style={{ fontSize: "25px", color: "red", cursor: "no-drop", opacity: "0.5" }}>Delete</RiDeleteBin5Fill>
                                                </CTableDataCell>
                                    }
                                </CTableRow>
                            )
                        })
                    }
                    {openThird && ThirdData && ThirdData.totalPages > 1 &&
                        <CTableRow color="primary">
                            <CTableHeaderCell></CTableHeaderCell>
                            <CTableHeaderCell>
                                <div className='my-1 flex items-center justify-around sm:flex'>
                                    <span className='hide'>Rows per page:
                                        <FormControl variant="standard" className='ms-1' sx={{ m: 0 }}>
                                            <Select
                                                id="demo-simple-select-standard"
                                                value={pageSize}
                                                onChange={handleChangePageSize}
                                                displayEmpty
                                                style={{ padding: "0px", width: "30px" }}
                                                inputProps={{ 'aria-label': 'Without label' }}
                                            >
                                                <MenuItem value="3">
                                                    <em>3</em>
                                                </MenuItem>
                                                <MenuItem value="5">
                                                    <em>5</em>
                                                </MenuItem>
                                                <MenuItem value="7">
                                                    <em>7</em>
                                                </MenuItem>
                                                <MenuItem value="9">
                                                    <em>9</em>
                                                </MenuItem>
                                            </Select>
                                        </FormControl>
                                    </span>
                                    <div className='flex justify-center items-center'>
                                        <FaLessThan className='me-2 font-normal ' style={{ fontSize: "20px", opacity: pageNumber === 1 && "0.4", cursor: "pointer" }} onClick={() => [pageNumber === 1 ? "" : setpageNumber(pageNumber - 1), setdeletepopUp(false), seteditpopUp(false),]} />
                                        <span style={{ fontSize: "21px", fontWeight: "medium" }}>{pageNumber}</span>
                                        <FaGreaterThan className='ms-2' style={{ fontSize: "20px", opacity: ThirdData.totalPages === pageNumber && "0.4", cursor: "pointer" }} onClick={() => [ThirdData.totalPages === pageNumber ? "" : setpageNumber(pageNumber + 1), setdeletepopUp(false), seteditpopUp(false),]} />
                                    </div>
                                    <span className='hide2'>Total Pages:  {ThirdData.totalPages}</span>
                                </div>
                            </CTableHeaderCell>
                            <CTableHeaderCell></CTableHeaderCell>
                        </CTableRow>}
                </CTableBody>
            </CTable>
            {/* <ToastContainer /> */}
        </Container>
    )
}