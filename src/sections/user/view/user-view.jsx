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
import { getAllUserDetailsAction } from 'src/store/action/userAction';
import { useSearchParams } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { FaLessThan } from "react-icons/fa6";
import { FaGreaterThan } from "react-icons/fa6";
import {
  Select,
  MenuItem,
} from "@mui/material";
import FormControl from '@mui/material/FormControl';


export default function UserView() {
  const location = useLocation()
  const dispatch = useDispatch();
  const { getAllUserDetailsDATA } = useSelector((state) => state.user)
  const [usesearch, setUsesearch] = useSearchParams()

  // const locationPageNumber = Number(location.search.split("=")[2])
  const locationPageNumber = +usesearch.get("pageNumber") === 0 ? (+usesearch.get("pageNumber") + 1) : +usesearch.get("pageNumber")
  const locationPageSize = +usesearch.get("pageSize") === 0 ? 5 : +usesearch.get("pageSize")

  const [pageSize, setpageSize] = React.useState(locationPageSize);
  const [pageNumber, setpageNumber] = React.useState(locationPageNumber);

  const [userData, setUserData] = React.useState("")

  useEffect(() => {
    const items = {
      pageSize,
      pageNumber
    }
    setUsesearch(items)
  }, [pageSize, pageNumber])

  useEffect(() => {
    const items = {
      pageSize,
      pageNumber
    }
    const query = `?pageSize=5&pageNumber=1`
    if (location.search) {
      dispatch(getAllUserDetailsAction(location.search))
    } else {
      dispatch(getAllUserDetailsAction(query))
      setUsesearch(items)
    }
  }, [location])

  useEffect(() => {
    if (getAllUserDetailsDATA) {
      setUserData(getAllUserDetailsDATA)
    }
  }, [getAllUserDetailsDATA])


  console.log(locationPageNumber, "location");
  console.log(userData, "userData");
  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Users</Typography>
      </Stack>

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
            {userData && userData.content?.length > 0 ? userData.content?.map((ele) => {
              const id = (userData.content.indexOf(ele) + 1) * (+pageNumber)
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
                      <FaBan className='text-red-600 text-2xl cursor-pointer' />
                      <FaTrash className='ms-2 text-red-600 text-2xl cursor-pointer' />
                    </div>
                  </CTableDataCell>
                </CTableRow>
              )
            })
              :
              <CTableRow color="danger">
                <CTableDataCell colSpan={7}><span className='h-20 text-3xl flex justify-center items-center text-red-900'>No users data available on this page</span></CTableDataCell>
              </CTableRow>
            }

            {userData && userData.totalPages > 1 && 
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
                      <FaGreaterThan className='ms-2' style={{ fontSize: "20px", opacity: (userData.totalPages === pageNumber || userData.content?.length === 0) && "0.4", cursor: "pointer" }} onClick={() => [(userData.totalPages === pageNumber || userData.content?.length === 0)  ? "" : setpageNumber(pageNumber + 1)]} />
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
