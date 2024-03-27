/* eslint-disable react/jsx-boolean-value */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-plusplus */
/* eslint-disable no-shadow */
/* eslint-disable prefer-destructuring */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable import/no-duplicates */
/* eslint-disable import/order */
/* eslint-disable arrow-body-style */
/* eslint-disable import/no-unresolved */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable perfectionist/sort-named-imports */
/* eslint-disable perfectionist/sort-imports */

import { FormControl, Stack } from '@mui/material';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { IoClose } from "react-icons/io5";
import Iconify from 'src/components/iconify';
import { FaTrash } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { ThreeDots } from 'react-loader-spinner';
import { addBannerAction, deleteBannerAction, getBannerAction } from 'src/store/action/bannerLogoAction';
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

export default function BannerView() {
    const dispatch = useDispatch();

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => [setOpen(true)];
    const handleClose = () => [setOpen(false)];

    const [BannerImgs, setBannerImgs] = React.useState("")
    const [getBannerDATA, setgetBannerDATA] = React.useState("")
    const [BannerImgsAddPopUp, setBannerImgsAddPopUp] = React.useState(false)
    const [addBannerERRORPopUp, setaddBannerERRORPopUp] = React.useState(false)
    const [deleteBannerPopUp, setdeleteBannerPopUp] = React.useState(false)

    const { addBannerPENDING, addBannerMSG, addBannerERROR, getBannerMSG, deleteBannerMSG } = useSelector((state) => state.bannerLogo)

    React.useEffect(() => {
        dispatch(getBannerAction())
    }, [addBannerMSG, deleteBannerMSG])

    React.useEffect(() => {
        if (getBannerMSG) {
            setgetBannerDATA(getBannerMSG)
        }
    }, [getBannerMSG])

    const uploadBannerImgs = (e) => {
        const files = e.target.files;
        const imagePromises = [];
        if (files.length > 0) {
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                if (file) {
                    const reader = new FileReader();
                    imagePromises.push(
                        new Promise((resolve) => {
                            reader.onload = (e) => {
                                resolve(e.target.result);
                            };
                            reader.readAsDataURL(file);
                        })
                    );
                }
            }

            Promise.all(imagePromises).then((results) => {
                setBannerImgs(results);
            });
        }
    }

    React.useEffect(() => {
        if (addBannerMSG) {
            setBannerImgs("")
        }
    }, [addBannerMSG])

    React.useEffect(() => {
        if (addBannerMSG && BannerImgsAddPopUp) {
            <div className='swal2-container'>
                {Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: addBannerMSG,
                    showConfirmButton: false,
                    timer: 2500
                })}
            </div>
            setBannerImgsAddPopUp(false)
            setBannerImgs("")
            setaddBannerERRORPopUp(false)
            handleClose()
        }
    }, [addBannerMSG])

    React.useEffect(() => {
        if (addBannerERROR && addBannerERRORPopUp) {
            <div className='swal2-container'>
                {Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: addBannerERROR,
                    showConfirmButton: false,
                    timer: 2500
                })}
            </div>
            setaddBannerERRORPopUp(false)
            setBannerImgsAddPopUp(false)
            setBannerImgs("")
            handleClose()
        }
    }, [addBannerERROR])

    React.useEffect(() => {
        if (deleteBannerMSG && deleteBannerPopUp) {
            <div className='swal2-container'>
                {Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: deleteBannerMSG,
                    showConfirmButton: false,
                    timer: 2500
                })}
            </div>
            setdeleteBannerPopUp(false)
        }
    }, [deleteBannerMSG])

    const handleAddBanner = () => {
        if (BannerImgs) {
            const item = {
                BannerImgs
            }
            dispatch(addBannerAction(item))
            setBannerImgsAddPopUp(true)
            setaddBannerERRORPopUp(true)
        }
    }

    const handleDeleteBanner = (url) => {
        const item = {
            url
        }
        dispatch(deleteBannerAction(item))
        setdeleteBannerPopUp(true)
    }

    return (
        <Container className='mt-8' maxWidth="xl" >
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                <Typography variant="h4">Banner</Typography>
                <Button onClick={() => handleOpen()} variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />} >Add Banner</Button>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            <div className='text-4xl font-bold flex justify-between'>
                                <h2 className="text-2xl font-semibold leading-7 text-gray-900">Banner</h2>
                                <IoClose onClick={() => handleClose()} style={{ cursor: "pointer" }} />
                            </div>
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ pt: 3, p: 3, minWidth: "300px", maxHeight: "80vh", overflowY: "auto", overflowX: "hidden" }}>
                            <div className="grid grid-cols-12 gap-x-6 gap-y-8 lg:w-[800px] md:w-[500px]">
                                {BannerImgs?.length === 0 ?
                                    <div className="col-span-12 " >
                                        <label htmlFor="uploadimg" style={{ minHeight: "52px", display: "flex", alignItems: "center", fontWeight: "bold", opacity: 0.4 }} className=" btn-img  d-flex-align-items-center justify-content-center btn btn-outline-secondary col-12">Upload Banner</label>
                                        <FormControl fullWidth sx={{ m: 0 }} size="large" >
                                            <input
                                                id="uploadimg"
                                                accept="image/png, image/gif, image/jpeg, image/webp"
                                                type="file"
                                                className="form-control"
                                                name="photoo"
                                                onChange={(e) => [uploadBannerImgs(e)]}
                                                style={{ display: "none", width: "600px" }}
                                            />
                                        </FormControl>
                                    </div>
                                    : BannerImgs?.length > 0 &&
                                    <>
                                        <div style={{ position: "relative" }} className='m-2 col-span-12' >
                                            <div className="flex  justify-center items-center" >
                                                <img
                                                    src={BannerImgs[0]}
                                                    alt="img-preview"
                                                    className="rounded-xl  h-[220px] w-[250px]  lg:h-[500px] lg:w-[800px] md:w-[500px] md:h-[300px] "
                                                    onMouseEnter={(e) => {
                                                        e.target.style.border = '1px solid red';
                                                        e.target.style.opacity = 0.5;
                                                    }}
                                                    onMouseLeave={(e) => {
                                                        e.target.style.border = "none";
                                                        e.target.style.opacity = 1;
                                                    }}
                                                />
                                                <FaTrash
                                                    className="text-danger btn-trash trash"
                                                    style={{ cursor: "pointer", position: "absolute" }}
                                                    onClick={() => setBannerImgs([])}
                                                />
                                            </div>
                                            <Button type='submit' color="success" onClick={() => handleAddBanner()} className='mt-2' variant="contained">
                                                {addBannerPENDING ?
                                                    <div className='flex justify-center items-center' >
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
                                                    </div>
                                                    :
                                                    "Add Banner"
                                                }
                                            </Button>
                                        </div>

                                    </>
                                }
                            </div>
                        </Typography>
                    </Box>
                </Modal>
            </Stack>
            <div className='grid grid-cols-12 gap-4'  >
                {
                    getBannerDATA && getBannerDATA?.map((img) => {
                        return (
                            <>
                                <div className='col-span-12 md:col-span-6 py-4' style={{ position: "relative" }} >
                                    <div >
                                        <img className="rounded-lg"
                                            onMouseEnter={(e) => {
                                                e.target.style.border = '1px solid red';
                                                e.target.style.opacity = 0.5;
                                            }}
                                            onMouseLeave={(e) => {
                                                e.target.style.border = "none";
                                                e.target.style.opacity = 1;
                                            }}
                                            src={img} alt={img} style={{ height: "450px" }} width={800} />
                                        <FaTrash
                                            className="text-danger btn-trash trash"
                                            style={{ cursor: "pointer", position: "absolute", right: "50%", top: "50%" }}
                                            onClick={() => handleDeleteBanner(img)}
                                        />
                                    </div>
                                </div>
                            </>
                        )
                    })
                }
            </div>
        </Container>
    )
}