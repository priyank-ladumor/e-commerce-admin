/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-await-in-loop */
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
import { useDispatch, useSelector } from 'react-redux';
import { ThreeDots } from 'react-loader-spinner';
import { addLogoAction, getLogoAction } from 'src/store/action/bannerLogoAction';
import Swal from 'sweetalert2';
import Resizer from "react-image-file-resizer";

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

export default function LogoView() {

    const dispatch = useDispatch();

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => [setOpen(true)];
    const handleClose = () => [setOpen(false)];

    const [logoInput, setlogoInput] = React.useState([])
    const [getLogo, setgetLogo] = React.useState("")
    const [logoAddPopUp, setlogoAddPopUp] = React.useState(false)

    const { addLogoMSG, addLogoPENDING, getLogoDATA } = useSelector((state) => state.bannerLogo)

    const resizeFile = (file) =>
        new Promise((resolve) => {
            Resizer.imageFileResizer(
                file,
                300,
                300,
                "JPEG",
                100,
                0,
                (uri) => {
                    resolve(uri);
                },
                "base64"
            );
        });

    React.useEffect(() => {
        dispatch(getLogoAction())
    }, [addLogoMSG])

    React.useEffect(() => {
        if (getLogoDATA) {
            setgetLogo(getLogoDATA)
        }
    }, [getLogoDATA])

    const uploadLogo = async (e) => {
        const files = e.target.files;
        if (files.length > 0) {
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                const image = await resizeFile(file);
                setlogoInput([image])
            }
        }
    }

    React.useEffect(() => {
        if (addLogoMSG) {
            setlogoInput("")
        }
    }, [addLogoMSG])

    React.useEffect(() => {
        if (addLogoMSG && logoAddPopUp) {
            <div className='swal2-container'>
                {Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: addLogoMSG,
                    showConfirmButton: false,
                    timer: 2500
                })}
            </div>
            setlogoAddPopUp(false)
            setlogoInput("")
            handleClose()
        }
    }, [addLogoMSG])

    const handleAddLogo = () => {
        if (logoInput) {
            const item = {
                logo: logoInput
            }
            dispatch(addLogoAction(item))
            setlogoAddPopUp(true)
        }
    }

    return (
        <Container className='mt-8' maxWidth="xl" >
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                <Typography variant="h4">Logo</Typography>
                <Button onClick={() => handleOpen()} variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />} >Add Logo</Button>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            <div className='text-4xl font-bold flex justify-between'>
                                <h2 className="text-2xl font-semibold leading-7 text-gray-900">Change Logo</h2>
                                <IoClose onClick={() => handleClose()} style={{ cursor: "pointer" }} />
                            </div>
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ pt: 3, p: 3, minWidth: "300px", maxHeight: "80vh", overflowY: "auto", overflowX: "hidden" }}>
                            <div className="grid grid-cols-12 gap-x-6 gap-y-8">
                                {logoInput?.length === 0 ?
                                    <div className="col-span-12 " >
                                        <label htmlFor="uploadimg" style={{ minHeight: "52px", display: "flex", alignItems: "center", fontWeight: "bold", opacity: 0.4 }} className=" btn-img  d-flex-align-items-center justify-content-center btn btn-outline-secondary col-12">Upload Logo</label>
                                        <FormControl fullWidth sx={{ m: 0 }} size="large" >
                                            <input
                                                id="uploadimg"
                                                accept="image/png, image/gif, image/jpeg, image/webp"
                                                type="file"
                                                className="form-control"
                                                name="photoo"
                                                onChange={(e) => [uploadLogo(e)]}
                                                style={{ display: "none", width: "600px" }}
                                            />
                                        </FormControl>
                                    </div>
                                    : logoInput?.length > 0 &&
                                    <>
                                        <div style={{ position: "relative" }} className='m-2 col-span-12' >
                                            <div className="flex  justify-center items-center" >
                                                <img
                                                    src={logoInput[0]}
                                                    alt="img-preview"
                                                    className="rounded-xl  h-[80px] w-[80px]  "
                                                    onMouseEnter={(e) => {
                                                        e.target.style.border = '1px solid red';
                                                        e.target.style.opacity = 0.5;
                                                    }}
                                                    onMouseLeave={(e) => {
                                                        e.target.style.border = "none";
                                                        e.target.style.opacity = 1;
                                                    }}
                                                />
                                            </div>
                                            <div className='flex justify-between items-center' >
                                                <Button type='submit' color="success" onClick={() => handleAddLogo()} className='mt-5' variant="contained">
                                                    {addLogoPENDING ?
                                                        <div className='flex justify-center items-center' >
                                                            <ThreeDots
                                                                visible={true}
                                                                height="22"
                                                                width="45"
                                                                color="blue"
                                                                radius="9"
                                                                ariaLabel="three-dots-loading"
                                                                wrapperStyle={{}}
                                                                wrapperClass=""
                                                            />
                                                        </div>
                                                        :
                                                        "Add Logo"
                                                    }
                                                </Button>

                                                {logoInput &&
                                                    <Button type='submit' color="error" onClick={() => setlogoInput([])} className='mt-5' variant="contained">
                                                        Remove Logo
                                                    </Button>}
                                            </div>
                                        </div>

                                    </>
                                }
                            </div>
                        </Typography>
                    </Box>
                </Modal>
            </Stack>
            <div>
                {
                    getLogo?.logo && <img src={getLogo?.logo} alt='logo' />
                }
            </div>
        </Container>
    )
}