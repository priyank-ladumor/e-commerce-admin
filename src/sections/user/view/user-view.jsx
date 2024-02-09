/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-boolean-value */
/* eslint-disable no-unused-expressions */
/* eslint-disable perfectionist/sort-named-imports */
/* eslint-disable spaced-comment */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable arrow-body-style */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-duplicates */
/* eslint-disable perfectionist/sort-imports */
/* eslint-disable import/no-unresolved */
import * as React from 'react';
import Stack from '@mui/material/Stack';
// import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { CTable } from '@coreui/react'
import { CTableBody } from '@coreui/react'
import { CTableDataCell } from '@coreui/react'
import { CTableHead } from '@coreui/react'
import { CTableHeaderCell } from '@coreui/react'
import { CTableRow } from '@coreui/react'
import { FaBan } from "react-icons/fa";
import { FaTrash } from "react-icons/fa"
import { CAlert } from '@coreui/react'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAllUserDetailsAction, userBannedAction, userDeleteAction, userUnBannedAction } from 'src/store/action/userAction';
import { useSearchParams } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { FaLessThan } from "react-icons/fa6";
import { FaGreaterThan } from "react-icons/fa6";
import {
  Select,
  MenuItem,
} from "@mui/material";
import FormControl from '@mui/material/FormControl';
import Swal from 'sweetalert2'
import { GoVerified } from "react-icons/go";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { MagnifyingGlass } from 'react-loader-spinner'


export default function UserView() {
  const location = useLocation()
  const dispatch = useDispatch();
  const { getAllUserDetailsDATA, userDeleteMSG, userBannedMSG, userUnBannedMSG, getAllUserDetailsPENDING } = useSelector((state) => state.user)
  const [usesearch, setUsesearch] = useSearchParams()

  const locationPageNumber = +usesearch.get("pageNumber") === 0 ? (+usesearch.get("pageNumber") + 1) : +usesearch.get("pageNumber")
  const locationPageSize = +usesearch.get("pageSize") === 0 ? 7 : +usesearch.get("pageSize")
  const locationSearch = usesearch.get("search") === null ? "" : usesearch.get("search")

  const [pageSize, setpageSize] = React.useState(locationPageSize);
  const [pageNumber, setpageNumber] = React.useState(locationPageNumber);
  const [search, setSearch] = React.useState(locationSearch)

  const [userData, setUserData] = React.useState("")
  //for delete and banning user
  const [userId, setUserId] = React.useState("")
  const [userBanId, setUserBanId] = React.useState("")
  const [userUnBanId, setUserUnBanId] = React.useState("")

  const [deletePopUp, setdeletePopUp] = React.useState(false)
  const [bannedPopUp, setbannedPopUp] = React.useState(false)
  const [unbannedPopUp, setunbannedPopUp] = React.useState(false)


  useEffect(() => {
    const items = {
      pageSize,
      pageNumber,
      search
    }
    setUsesearch(items)
  }, [pageSize, pageNumber, search])

  const handleClearSearch = () => {
    setSearch("")
    setpageNumber(1)
    setpageSize(7)

    const query = `?pageSize=7&pageNumber=1&search=`
    dispatch(getAllUserDetailsAction(query))
  }

  useEffect(() => {
    const items = {
      pageSize,
      pageNumber,
      search
    }
    const query = `?pageSize=7&pageNumber=1&search=${search}`
    if (location.search) {
      dispatch(getAllUserDetailsAction(location.search))
    } else {
      dispatch(getAllUserDetailsAction(query))
      setUsesearch(items)
    }
    if (search.length > 0) {
      dispatch(getAllUserDetailsAction(query))
    } else {
      const query2 = `?pageSize=7&pageNumber=1&search=`
      dispatch(getAllUserDetailsAction(query2))
    }
  }, [location, userDeleteMSG, userBannedMSG, userUnBannedMSG, search])

  useEffect(() => {
    if (getAllUserDetailsDATA) {
      setUserData(getAllUserDetailsDATA)
    }
  }, [getAllUserDetailsDATA])

  useEffect(() => {
    if (userId.length > 0) {
      const item = {
        id: userId
      }
      dispatch(userDeleteAction(item))
      setdeletePopUp(true)
      setUserId("")
    }
  }, [userId])

  useEffect(() => {
    if (userUnBanId.length > 0) {
      const item = {
        id: userUnBanId
      }
      dispatch(userUnBannedAction(item))
      setunbannedPopUp(true)
      setUserUnBanId("")
    }
  }, [userUnBanId])

  useEffect(() => {
    if (userBanId.length > 0) {
      const item = {
        id: userBanId
      }
      dispatch(userBannedAction(item))
      setbannedPopUp(true)
      setUserBanId("")
    }
  }, [userBanId])


  //delete user popup
  React.useEffect(() => {
    if (userDeleteMSG && deletePopUp) {
      <div className='swal2-container'>
        {Swal.fire({
          position: "top-end",
          icon: "success",
          title: userDeleteMSG?.msg,
          showConfirmButton: false,
          timer: 2500
        })}
      </div>
      setdeletePopUp(false)
      setUserId("")
    }
  }, [userDeleteMSG])

  //banned user popup
  React.useEffect(() => {
    if (userBannedMSG && bannedPopUp) {
      <div className='swal2-container'>
        {Swal.fire({
          position: "top-end",
          icon: "success",
          title: userBannedMSG?.msg,
          showConfirmButton: false,
          timer: 2500
        })}
      </div>
      setbannedPopUp(false)
      setUserBanId("")
    }
  }, [userBannedMSG])

  //unbanned user popup
  React.useEffect(() => {
    if (userUnBannedMSG && unbannedPopUp) {
      <div className='swal2-container'>
        {Swal.fire({
          position: "top-end",
          icon: "success",
          title: userUnBannedMSG?.msg,
          showConfirmButton: false,
          timer: 2500
        })}
      </div>
      setunbannedPopUp(false)
      setUserUnBanId("")
    }
  }, [userUnBannedMSG])

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Users</Typography>
      </Stack>

      {/* search input filed  */}
      <div className='flex items-center'>
        <TextField className='mb-2 me-2' onChange={e => [setSearch(e.target.value.trim().toLowerCase()), setpageNumber(1), setpageSize(7)]} value={search} placeholder='Search by email' style={{ width: "200px", display: "flex", justifyContent: "center", textAlign: "center" }} type='text' id="standard-basic" label="" variant="standard" />
        {search?.length > 0 && <Button onClick={() => handleClearSearch()} type='button' color="error" variant="contained" size='small'>Clear</Button>}
      </div>

      <div style={{ minWidth: "400px", overflowX: "auto" }}>
        <CTable striped className='table table-bordered border-dark'>
          <CTableHead>
            <CTableRow color="dark">
              <CTableHeaderCell scope="col">#</CTableHeaderCell>
              <CTableHeaderCell scope="col">Name</CTableHeaderCell>
              <CTableHeaderCell scope="col">Email</CTableHeaderCell>
              <CTableHeaderCell scope="col">Verified</CTableHeaderCell>
              <CTableHeaderCell scope="col">Status</CTableHeaderCell>
              <CTableHeaderCell scope="col">CreatedAt</CTableHeaderCell>
              <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {userData && getAllUserDetailsPENDING === false && userData.content?.length > 0 ? userData.content?.map((ele) => {
              const id = (userData.content.indexOf(ele) + 1) + (pageNumber > 1 && (+pageSize * (+pageNumber - 1)))
              return (
                <CTableRow striped color='light'>
                  <CTableHeaderCell scope="row">{id}</CTableHeaderCell>
                  <CTableDataCell>{ele.firstName.charAt(0).toUpperCase() + ele.firstName.slice(1)}{" "}{ele.lastName.charAt(0).toUpperCase() + ele.lastName.slice(1)}</CTableDataCell>
                  <CTableDataCell>{ele.email}</CTableDataCell>
                  <CTableDataCell>{ele.isEmailVerified === true ? "Yes" : "No"}</CTableDataCell>
                  <CTableDataCell>
                    <CAlert color={ele.status === "Active" ? "success" : "danger"} className=' mb-0 flex justify-center items-center p-1 px-auto text-black'>
                      {ele.status}
                    </CAlert>
                  </CTableDataCell>
                  <CTableDataCell>{ele.createdAt.split("T")[0]}</CTableDataCell>
                  <CTableDataCell >
                    <div className='flex items-center'>
                      {ele.status === "Banned" ?
                        <GoVerified className='text-2xl cursor-pointer text-gray-950 font-bold' onClick={() => setUserUnBanId(ele._id)} />
                        :
                        <FaBan className='text-red-600 text-2xl cursor-pointer' onClick={() => setUserBanId(ele._id)} />
                      }
                      <FaTrash className='ms-2 text-red-600 text-2xl cursor-pointer' onClick={() => [setUserId(ele._id)]} />
                    </div>
                  </CTableDataCell>
                </CTableRow>
              )
            })
              :
              getAllUserDetailsPENDING === true ?
                <CTableRow color="light">
                  <CTableDataCell colSpan={7}>
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
                :
                <CTableRow color="danger">
                  <CTableDataCell colSpan={7}><span className='h-20 text-3xl flex justify-center items-center text-red-900'>No users data available on this page</span></CTableDataCell>
                </CTableRow>
            }

            {userData && getAllUserDetailsPENDING === false && userData.totalPages > 1 &&
              <CTableRow color="primary">
                <CTableHeaderCell colSpan={7}>
                  <div className='my-1 flex items-center justify-around sm:flex'>
                    <span className='hide'>Rows per page:
                      <FormControl variant="standard" className='ms-1' sx={{ m: 0 }}>
                        <Select
                          id="demo-simple-select-standard"
                          value={pageSize}
                          onChange={e => [setpageSize(e.target.value), setpageNumber(1)]}
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
                      <FaLessThan className='me-2 font-normal ' style={{ fontSize: "20px", opacity: pageNumber === 1 && "0.4", cursor: "pointer" }} onClick={() => [pageNumber === 1 ? "" : setpageNumber(pageNumber - 1)]} />
                      <span style={{ fontSize: "21px", fontWeight: "medium" }}>{pageNumber}</span>
                      <FaGreaterThan className='ms-2' style={{ fontSize: "20px", opacity: (userData.totalPages === pageNumber || userData.content?.length === 0) && "0.4", cursor: "pointer" }} onClick={() => [(userData.totalPages === pageNumber || userData.content?.length === 0) ? "" : setpageNumber(pageNumber + 1)]} />
                    </div>

                    <span className='hide2'>Total Pages:  {userData.totalPages}</span>
                  </div>
                </CTableHeaderCell>
              </CTableRow>}

          </CTableBody>
        </CTable>
      </div>
    </Container>
  );
}
