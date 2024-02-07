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
// import { CPagination } from '@coreui/react'
// import { CPaginationItem } from '@coreui/react'
import { CTableBody } from '@coreui/react'
import { CTableDataCell } from '@coreui/react'
import { CTableHead } from '@coreui/react'
import { CTableHeaderCell } from '@coreui/react'
import { CTableRow } from '@coreui/react'
import { RiDeleteBin5Fill } from "react-icons/ri";
import { MdEditSquare } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { EditCategoriesAction, deleteCategoriesAction, getSecondLvlCategoriesAction, getThirdLvlCategoriesAction, getTopLvlCategoriesAction, searchCategoriesAction } from 'src/store/action/categoriesAction.js';
import {
    MenuItem,
    Select,
} from "@mui/material";
import FormControl from '@mui/material/FormControl';
import { IoSave } from "react-icons/io5";
import TextField from '@mui/material/TextField';
import Swal from 'sweetalert2'
import { FaLessThan } from "react-icons/fa6";
import { FaGreaterThan } from "react-icons/fa6";
import { CreateThirdLvl } from './thirdlevel-category-create';
import { CreateSecondLvl } from './secondlevel-category-create';
import { CreateTopLvl } from './toplevel-category-create';
import { MagnifyingGlass } from 'react-loader-spinner'

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

export const Category = () => {
    const { getTopLvlCategoriesData, getSecondLvlCategoriesData, getThirdLvlCategoriesData, deleteCategoriesMSG, EditCategoriesMSG } = useSelector(state => state.categories)
    const { createTopLvlCategoriesSUCCESSMSG, createSecondLvlCategoriesSUCCESSMSG, createThirdLvlCategoriesSUCCESSMSG, searchCategoriesData, searchCategoriesPENDING } = useSelector(state => state.categories)

    //modal open
    const [open, setOpen] = React.useState(false);

    //for table show dynamically categories
    const [openTop, setOpenTop] = React.useState(false);
    const [openSecond, setOpenSecond] = React.useState(false);
    const [openThird, setOpenThird] = React.useState(true);

    //apis get data for all level categories
    const [TopData, setTopData] = React.useState(false);
    const [SecondData, setSecondData] = React.useState(false);
    const [ThirdData, setThirdData] = React.useState(false);

    //for pagination
    const [pageSize, setpageSize] = React.useState(5);
    const [pageNumber, setpageNumber] = React.useState(1);

    //category id for delete
    const [CategoryID, setCategoryID] = React.useState("");

    //edit category id
    const [EditCategoryID, setEditCategoryID] = React.useState("");

    //input category
    const [Category, setCategory] = React.useState("");

    //for error
    const [CategoryLenErr, setCategoryLenErr] = React.useState("");

    //for remove bugs of popup modal
    const [deletepopUp, setdeletepopUp] = React.useState(false)
    const [editpopUp, seteditpopUp] = React.useState(false)
    const [topCategorypopUp, settopCategorypopUp] = React.useState(false)
    const [secondCategorypopUp, setsecondCategorypopUp] = React.useState(false)
    const [thirdCategorypopUp, setthirdCategorypopUp] = React.useState(false)

    //for openform dynamically 
    const [openTopForm, setopenTopForm] = React.useState(false);
    const [openSecondForm, setopenSecondForm] = React.useState(false);
    const [openThirdForm, setopenThirdForm] = React.useState(true);

    //for search categories
    const [search, setSearch] = React.useState("");
    const [searchData, setSearchData] = React.useState("");

    const handleOpen = () => [setOpen(true), setOpenTop(false), setOpenSecond(false), setOpenThird(true)];
    const handleClose = () => [setOpen(false), setOpenTop(false), setOpenSecond(false), setOpenThird(true)];

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
    }, [pageSize, pageNumber, CategoryID, EditCategoryID, open])

    //delete popup
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

    //top category added/created popup
    React.useEffect(() => {
        if (createTopLvlCategoriesSUCCESSMSG && topCategorypopUp) {
            <div className='swal2-container'>
                {Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: createTopLvlCategoriesSUCCESSMSG?.msg,
                    showConfirmButton: false,
                    timer: 2500
                })}
            </div>
            settopCategorypopUp(false)
        }
    }, [createTopLvlCategoriesSUCCESSMSG])

    //second category added/created popup
    React.useEffect(() => {
        if (createSecondLvlCategoriesSUCCESSMSG && secondCategorypopUp) {
            <div className='swal2-container'>
                {Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: createSecondLvlCategoriesSUCCESSMSG?.msg,
                    showConfirmButton: false,
                    timer: 2500
                })}
            </div>
            setsecondCategorypopUp(false)
        }
    }, [createSecondLvlCategoriesSUCCESSMSG])

    //third category added/created popup
    React.useEffect(() => {
        if (createThirdLvlCategoriesSUCCESSMSG && thirdCategorypopUp) {
            <div className='swal2-container'>
                {Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: createThirdLvlCategoriesSUCCESSMSG?.msg,
                    showConfirmButton: false,
                    timer: 2500
                })}
            </div>
            setthirdCategorypopUp(false)
        }
    }, [createThirdLvlCategoriesSUCCESSMSG])

    //edit category popup
    React.useEffect(() => {
        if (EditCategoriesMSG && editpopUp) {
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

    //get all categories
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

    React.useEffect(() => {
        const item = {
            pageNumber,
            pageSize,
            search
        }
        if (search?.length > 0) {
            dispatch(searchCategoriesAction(item))
        }
    }, [search, EditCategoriesMSG, deleteCategoriesMSG, pageNumber, pageSize])

    React.useEffect(() => {
        if (searchCategoriesData) {
            setSearchData(searchCategoriesData)
        }
    }, [searchCategoriesData])

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
                        <Typography id="modal-modal-description" sx={{ pt: 3, p: 3, minWidth: "300px", maxHeight: "80vh", overflowY: "auto", overflowX: "hidden" }}>

                            {/* top level  */}
                            <CreateTopLvl settopCategorypopUp={settopCategorypopUp} openTopForm={openTopForm} setopenTopForm={setopenTopForm} setopenSecondForm={setopenSecondForm} setopenThirdForm={setopenThirdForm} />

                            {/* second level  */}
                            <CreateSecondLvl setsecondCategorypopUp={setsecondCategorypopUp} openSecondForm={openSecondForm} setopenSecondForm={setopenSecondForm} setopenThirdForm={setopenThirdForm} setopenTopForm={setopenTopForm} />

                            {/* third level  */}
                            <CreateThirdLvl setthirdCategorypopUp={setthirdCategorypopUp} openThirdForm={openThirdForm} setopenThirdForm={setopenThirdForm} setopenTopForm={setopenTopForm} setopenSecondForm={setopenSecondForm} />
                        </Typography>
                    </Box>
                </Modal>
            </Stack>

            {/* search input filed  */}
            <div className='flex items-center'>
                <TextField className='mb-2 me-2' onChange={e => [setSearch(e.target.value.trim().toLowerCase()), setpageNumber(1), setpageSize(5)]} value={search} placeholder='Search Categories' style={{ width: "200px", display: "flex", justifyContent: "center", textAlign: "center" }} type='text' id="standard-basic" label="" variant="standard" />
                {search.length > 0 && <Button onClick={() => [setSearch(""), setpageNumber(1), setpageSize(5), setOpenThird(true), setOpenSecond(false), setOpenTop(false)]} type='button' color="error" variant="contained" size='small'>Clear</Button>}
            </div>

            {/* categories table  */}
            <CTable striped className='table table-bordered border-dark'>
                <CTableHead>
                    <CTableRow color="dark">
                        <CTableHeaderCell scope="col">#</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Categories</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
                    </CTableRow>
                </CTableHead>

                {search.length === 0 ?
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
                    :

                    searchCategoriesData?.content?.length > 0
                        ?
                        searchData &&
                        <CTableBody color='light'>
                            {searchData.content.map((data) => {
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
                            })}
                            {searchData && searchData.totalPages > 1 &&
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
                                                <FaGreaterThan className='ms-2' style={{ fontSize: "20px", opacity: searchData.totalPages === pageNumber && "0.4", cursor: "pointer" }} onClick={() => [searchData.totalPages === pageNumber ? "" : setpageNumber(pageNumber + 1), setdeletepopUp(false), seteditpopUp(false),]} />
                                            </div>

                                            <span className='hide2'>Total Pages:  {searchData.totalPages}</span>
                                        </div>
                                    </CTableHeaderCell>
                                    <CTableHeaderCell></CTableHeaderCell>
                                </CTableRow>}
                        </CTableBody>
                        :
                        searchCategoriesPENDING ?
                            <CTableBody>
                                <CTableRow color="light">
                                    <CTableDataCell colSpan={3}>
                                        <div className='flex items-center justify-center' style={{ height: "200px" }}>
                                            <MagnifyingGlass
                                                visible={true}
                                                height="80"
                                                width="80"
                                                ariaLabel="magnifying-glass-loading"
                                                wrapperStyle={{}}
                                                wrapperClass="magnifying-glass-wrapper"
                                                glassColor="#c0efff"
                                                color="#e15b64"
                                            />
                                        </div>
                                    </CTableDataCell>
                                </CTableRow>
                            </CTableBody>
                            :
                            <CTableBody color='light'>
                                <CTableRow color="danger">
                                    <CTableDataCell colSpan={3}><span className='h-20 text-3xl flex justify-center items-center text-red-900'>Category does not exits</span></CTableDataCell>
                                </CTableRow>
                            </CTableBody>
                }
            </CTable>
        </Container>
    )
}