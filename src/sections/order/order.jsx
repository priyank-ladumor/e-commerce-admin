/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable import/no-duplicates */
/* eslint-disable import/order */
/* eslint-disable arrow-body-style */
/* eslint-disable import/no-unresolved */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable perfectionist/sort-named-imports */
/* eslint-disable perfectionist/sort-imports */

import { MenuItem, Select, Stack } from '@mui/material';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { FaRupeeSign, FaTrash } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { CancelOrderAction, DeleteOrderAction, confirmOrderAction, deliveredOrderAction, getAllOrderAction, packedOrderAction, shippedOrderAction } from 'src/store/action/orderAction';
import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { IoClose } from "react-icons/io5";
import { CTable } from '@coreui/react'
import { CTableBody } from '@coreui/react'
import { CTableDataCell } from '@coreui/react'
import { CTableHead } from '@coreui/react'
import { CTableHeaderCell } from '@coreui/react'
import { CTableRow } from '@coreui/react'
import FormControl from '@mui/material/FormControl';
import Swal from 'sweetalert2';

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


// ----------------------------------------------------------------------

export default function OrderView() {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [orderItemID, setorderItemID] = useState("");

    const handleOpen = (idd) => [setOpen(true), setorderItemID(idd)];
    const handleClose = () => [setOpen(false)];
    const { getAllOrderDATA, DeleteOrderMSG, CancelOrderMSG, confirmOrderMSG, packedOrderMSG, shippedOrderMSG, deliveredOrderMSG } = useSelector((state) => state.order);

    const [status, setstatus] = useState("")
    const [orderID, setOrderID] = useState("")
    const [allOrder, setAllOrder] = useState()
    const [orderPopUp, setorderPopUp] = useState(false)

    useEffect(() => {
        if (orderID && status) {
            const item = {
                id: orderID
            }
            if (status === "CANCELLED") {
                dispatch(CancelOrderAction(item))
            }

            if (status === "Confirmed") {
                dispatch(confirmOrderAction(item))
            }

            if (status === "Packed") {
                dispatch(packedOrderAction(item))
            }

            if (status === "Shipped") {
                dispatch(shippedOrderAction(item))
            }

            if (status === "Delivered") {
                dispatch(deliveredOrderAction(item))
            }

            setorderPopUp(true)
        }
    }, [status, orderID])

    useEffect(() => {
        dispatch(getAllOrderAction())
    }, [DeleteOrderMSG, CancelOrderMSG, confirmOrderMSG, packedOrderMSG, shippedOrderMSG, deliveredOrderMSG])

    useEffect(() => {
        if (getAllOrderDATA) {
            setAllOrder(getAllOrderDATA)
        }
    }, [getAllOrderDATA])

    const handleDeleteOrder = (id) => {
        const item = {
            id: id.toString()
        }
        dispatch(DeleteOrderAction(item))
        setorderPopUp(true)
    }

    React.useEffect(() => {
        if (DeleteOrderMSG && orderPopUp) {
            <div className='swal2-container'>
                {Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: DeleteOrderMSG,
                    showConfirmButton: false,
                    timer: 2500
                })}
            </div>
            setorderPopUp(false)
        }
    }, [DeleteOrderMSG])

    React.useEffect(() => {
        if (CancelOrderMSG && orderPopUp) {
            <div className='swal2-container'>
                {Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: CancelOrderMSG,
                    showConfirmButton: false,
                    timer: 2500
                })}
            </div>
            setorderPopUp(false)
            setstatus("")
            setOrderID("")
        }
    }, [CancelOrderMSG])

    React.useEffect(() => {
        if (confirmOrderMSG && orderPopUp) {
            <div className='swal2-container'>
                {Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: confirmOrderMSG,
                    showConfirmButton: false,
                    timer: 2500
                })}
            </div>
            setorderPopUp(false)
            setstatus("")
            setOrderID("")
        }
    }, [confirmOrderMSG])

    React.useEffect(() => {
        if (packedOrderMSG && orderPopUp) {
            <div className='swal2-container'>
                {Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: packedOrderMSG,
                    showConfirmButton: false,
                    timer: 2500
                })}
            </div>
            setorderPopUp(false)
            setstatus("")
            setOrderID("")
        }
    }, [packedOrderMSG])

    React.useEffect(() => {
        if (shippedOrderMSG && orderPopUp) {
            <div className='swal2-container'>
                {Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: shippedOrderMSG,
                    showConfirmButton: false,
                    timer: 2500
                })}
            </div>
            setorderPopUp(false)
            setstatus("")
            setOrderID("")
        }
    }, [shippedOrderMSG])

    React.useEffect(() => {
        if (deliveredOrderMSG && orderPopUp) {
            <div className='swal2-container'>
                {Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: deliveredOrderMSG,
                    showConfirmButton: false,
                    timer: 2500
                })}
            </div>
            setorderPopUp(false)
            setstatus("")
            setOrderID("")
        }
    }, [deliveredOrderMSG])

    return (
        <Container className='mt-8' maxWidth="xl" >
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                <Typography variant="h4">Order</Typography>
            </Stack>
            <div style={{ minWidth: "400px", overflowX: "auto" }}>
                <CTable striped className='table table-bordered border-dark'>
                    <CTableHead>
                        <CTableRow className='border-none' color="dark">
                            <CTableHeaderCell scope="col">#</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Shipped Address</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Total items</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Total Price</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Payment Method</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Payment Status</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Ordered Date</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Delivered Date</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Order Status</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Product Details</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                        </CTableRow>
                    </CTableHead>
                    <CTableBody>
                        {
                            allOrder && allOrder?.map((ele) => {
                                const viewOrderItem = allOrder && allOrder?.filter((item) => item._id.toString() === orderItemID && orderItemID.toString())
                                return (
                                    <CTableRow striped color={ele.orderStatus === "CANCELLED" ? "danger" : ele?.orderStatus === "Delivered" ? 'success' : ele?.orderStatus === "Placed" ? 'warning' : 'light'}>
                                        <CTableHeaderCell scope="row">{allOrder.indexOf(ele) + 1}</CTableHeaderCell>
                                        <CTableDataCell style={{ minWidth: "280px" }}>
                                            <div className='flex' >
                                                <span className='capitalize' style={{ fontWeight: "600" }} >Name:</span><span className='ms-2 capitalize'> {ele.shippingAddress[0]?.firstName} {" "} {ele.shippingAddress[0]?.lastName}</span>
                                            </div>
                                            <div className='flex' >
                                                <span className='capitalize' style={{ fontWeight: "600" }} >Mobile No:</span><span className='ms-2 capitalize'> {ele.shippingAddress[0]?.phone}</span>
                                            </div>
                                            <div className='flex' >
                                                <span className='capitalize' style={{ fontWeight: "600" }} >Address:</span>
                                                <span className='ms-2' >
                                                    <div className='flex items-center '>
                                                        <span className='capitalize'>{ele.shippingAddress[0]?.streetAddress}</span>{", "}
                                                    </div>
                                                    <span className='capitalize'>{ele.shippingAddress[0]?.city}</span>{", "}<span className='capitalize'>{ele.shippingAddress[0]?.state}{", "}<span className='capitalize'>{ele.shippingAddress[0]?.zipCode}</span></span>
                                                </span>
                                            </div>
                                        </CTableDataCell>
                                        <CTableDataCell style={{ fontWeight: "600" }} >{ele.totalItem}</CTableDataCell>
                                        <CTableDataCell style={{ fontWeight: "600" }} >
                                            <div className='flex items-center' >
                                                <span><FaRupeeSign /></span>
                                                <span>{ele.totalPrice}</span>
                                            </div>
                                        </CTableDataCell>
                                        <CTableDataCell style={{ fontWeight: "600" }} >{ele.paymentDetails.paymentMethod}</CTableDataCell>
                                        <CTableDataCell style={{ fontWeight: "600" }} >{ele.paymentDetails.paymentStatus}</CTableDataCell>
                                        <CTableDataCell style={{ fontWeight: "600", minWidth: "120px" }} >{ele.createdAt.split("T")[0]}</CTableDataCell>
                                        <CTableDataCell className='' style={{ fontWeight: "600", minWidth: "120px" }} >{ele?.deliveredDate ? ele?.deliveredDate.split("T")[0] : "---"}</CTableDataCell>
                                        <CTableDataCell style={{ color: ele.orderStatus === "CANCELLED" ? "red" : "black", fontWeight: "600" }} >
                                            <FormControl variant="standard" className='ms-1' sx={{ m: 0 }}>
                                                <Select
                                                    id="demo-simple-select-standard"
                                                    onChange={e => [setstatus(e.target.value), setOrderID(ele?._id)]}
                                                    displayEmpty
                                                    style={{ padding: "0px", width: "105px" }}
                                                    inputProps={{ 'aria-label': 'Without label' }}
                                                    defaultValue={ele.orderStatus}
                                                >
                                                    {ele.orderStatus === "Placed"
                                                        && <MenuItem value="Placed" >
                                                            <em>Placed</em>
                                                        </MenuItem>
                                                    }
                                                    {(ele.orderStatus === "Confirmed" || ele.orderStatus === "Placed") &&
                                                        <MenuItem value="Confirmed">
                                                            <em>Confirmed</em>
                                                        </MenuItem>
                                                    }
                                                    {(ele.orderStatus === "CANCELLED" || ele.orderStatus === "Confirmed"  || ele.orderStatus === "Packed" || ele.orderStatus === "Shipped" || ele.orderStatus === "Placed") &&
                                                        <MenuItem value="CANCELLED">
                                                            <em>Canceled</em>
                                                        </MenuItem>
                                                    }
                                                    {(ele.orderStatus === "Packed" || ele.orderStatus === "Confirmed" || ele.orderStatus === "Placed") &&
                                                        <MenuItem value="Packed">
                                                            <em>Packed</em>
                                                        </MenuItem>
                                                    }
                                                    {(ele.orderStatus === "Shipped" || ele.orderStatus === "Packed" || ele.orderStatus === "Confirmed" || ele.orderStatus === "Placed") &&
                                                        <MenuItem value="Shipped">
                                                            <em>Shipped</em>
                                                        </MenuItem>
                                                    }
                                                    {(ele.orderStatus === "Delivered" || ele.orderStatus === "Shipped" || ele.orderStatus === "Packed" || ele.orderStatus === "Confirmed" || ele.orderStatus === "Placed") &&
                                                        <MenuItem value="Delivered">
                                                            <em>Delivered</em>
                                                        </MenuItem>
                                                    }
                                                </Select>
                                            </FormControl>
                                        </CTableDataCell>
                                        <CTableDataCell className='me-5' >

                                            <Button onClick={() => handleOpen(ele?._id)} variant="contained" color="inherit" >View Order items</Button>
                                            <Modal
                                                open={open}
                                                onClose={handleClose}
                                                aria-labelledby="modal-modal-title"
                                                aria-describedby="modal-modal-description"
                                            >
                                                <Box sx={style}>
                                                    <Typography id="modal-modal-title" variant="h6" component="h2">
                                                        <div className='text-4xl font-bold flex justify-between'>
                                                            <h2 className="text-2xl font-semibold leading-7 text-gray-900"> Order items</h2>
                                                            <IoClose onClick={() => handleClose()} style={{ cursor: "pointer" }} />
                                                        </div>
                                                    </Typography>
                                                    <Typography id="modal-modal-description" sx={{ pt: 3, p: 3, minWidth: "300px", maxHeight: "80vh", overflowY: "auto", overflowX: "hidden" }}>
                                                        {viewOrderItem && viewOrderItem[0]?.orderItem?.map((item) => {
                                                            return (
                                                                <>
                                                                    <div className='col-span-12 flex py-4  border-b border-gray-300'>
                                                                        <div className="h-32 w-32 flex-shrink-0 overflow-hidden rounded-md ">
                                                                            <img
                                                                                src={item?.product[0]?.thumbnail[0]}
                                                                                alt={item?.product[0]?.thumbnail[0]}
                                                                                className="h-full w-full object-cover object-center"
                                                                            />
                                                                        </div>
                                                                        <div className="ml-4 flex flex-1 flex-col">
                                                                            <div>
                                                                                <div className="displayBlock flex justify-between text-base font-medium text-gray-900 mb-1 ">
                                                                                    <h3>
                                                                                        <span className='text-lg font-semibold me-2' >Title:</span>
                                                                                        {
                                                                                            <a href={item?.product[0]?.title.href}>{item?.product[0]?.title}</a>
                                                                                        }
                                                                                    </h3>
                                                                                </div>
                                                                                <div className='flex items-center mb-1' >
                                                                                    <span className='text-lg font-semibold me-2' >Size:</span>
                                                                                    <p className="rounded-full mt-[2px] text-lg text-gray-800">{item?.size}</p>
                                                                                </div>
                                                                                <div className='flex items-center' >
                                                                                    <span className=' text-lg font-semibold me-2' >Color:</span>
                                                                                    <p className=" p-3 w-8 rounded-full mt-[2px] text-sm text-gray-500 border-[1px] border-black " style={{ background: item?.color }} >{""}</p>
                                                                                </div>
                                                                                <div className='flex items-center mb-1' >
                                                                                    <span className='text-lg font-semibold me-2' >Quantity:</span>
                                                                                    <p className="rounded-full mt-[2px] text-lg text-gray-800">{item?.quantity}</p>
                                                                                </div>
                                                                                <div className='flex items-center mb-1' >
                                                                                    <span className='text-lg font-semibold me-2' >Price:</span>
                                                                                    <p className="rounded-full mt-[2px] text-lg text-gray-800">{item?.price}</p>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                </>
                                                            )
                                                        })}
                                                    </Typography>
                                                </Box>
                                            </Modal>
                                        </CTableDataCell>
                                        <CTableDataCell style={{ fontWeight: "600", color: ele.orderStatus === "CANCELLED" ? "red" : "gray", cursor: ele.orderStatus === "CANCELLED" ? "pointer" : "no-drop" }} >
                                            <FaTrash onClick={() => ele.orderStatus === "CANCELLED" && handleDeleteOrder(ele?._id)} />
                                        </CTableDataCell>
                                    </CTableRow>
                                )
                            })
                        }
                    </CTableBody>
                </CTable>
            </div>
        </Container>
    );
}
