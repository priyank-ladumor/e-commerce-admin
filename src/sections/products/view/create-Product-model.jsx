/* eslint-disable no-shadow */
/* eslint-disable prefer-destructuring */
/* eslint-disable perfectionist/sort-imports */
/* eslint-disable arrow-body-style */
/* eslint-disable no-plusplus */
/* eslint-disable jsx-a11y/label-has-associated-control */

/* eslint-disable import/no-extraneous-dependencies */
import * as React from 'react';
import { useState, useEffect } from "react"
import { IoClose } from "react-icons/io5";

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
// import { useNavigate } from 'react-router-dom';
// eslint-disable-next-line perfectionist/sort-imports
// import { useDispatch } from 'react-redux';
import { FaTrash } from "react-icons/fa"


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

export default function ProductModal() {
    const [open, setOpen] = React.useState(false);
    const [images, setimages] = useState([]);
    const [imgerr, setimgerr] = useState();
    const [imglenerr, setimglenerr] = useState();
    const [thumbnail, setthumbnail] = useState([]);
    const [thumbnailerr, setthumbnailerr] = useState();
    const [thumbnaillenerr, setthumbnaillenerr] = useState();

    // const navigate = useNavigate();
    // const dispatch = useDispatch();


    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // const onReset = () => {
    //     setimages([]);
    //     setimgerr("")
    //     setimglenerr("")
    //     setthumbnail([]);
    //     setthumbnailerr("")
    //     setthumbnaillenerr("")
    // };

    useEffect(() => {
        if (images?.length > 0) {
            const rmv = "";
            setimgerr(rmv);
            setimglenerr(rmv);
        }
    }, [images]);

    useEffect(() => {
        if (thumbnail?.length > 0) {
            const rmv = "";
            setthumbnailerr(rmv);
            setthumbnaillenerr(rmv);
        }
    }, [thumbnail]);


    const uploadimages = (e) => {
        const files = e.target.files;
        const imagePromises = [];

        if (files.length > 5) {
            setimglenerr('Maximum images allowed is five')
            setimgerr("")
        } else {
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
                setimages(results);
            });
        }
    }
    const uploadthumbnail = (e) => {
        const files = e.target.files;
        const imagePromises = [];

        if (files.length > 5) {
            setthumbnailerr('Maximum images allowed is five')
            setthumbnaillenerr("")
        } else {
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
                setthumbnail(results);
            });
        }
    }

    // const validation = () => {
    //     if (images?.length === 0) {
    //         const err2 = "You need to provide an image";
    //         setimgerr(err2);
    //     }
    //     if (thumbnail?.length === 0) {
    //         const err2 = "You need to provide an image";
    //         setthumbnailerr(err2);
    //     }
    // };

    const deleteimgs = (delitem) => {
        const handleDelete = images.filter((item, id) => item !== delitem);
        setimages(handleDelete);
    };
    const deletethumbnail = (delitem) => {
        const handleDelete2 = thumbnail.filter((item, id) => item !== delitem);
        setthumbnail(handleDelete2);
    };


    return (
        <div>
            <Button onClick={handleOpen} style={{ color: "white" }}>New Product</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} className="style_modal">
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        <div className='text-4xl font-bold float-right top-0 right-0'>
                            <IoClose onClick={() => handleClose()} style={{ cursor: "pointer" }} />
                        </div>
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 6, maxHeight: "80vh", overflowY: "auto" }}>
                        <form>
                            <div className="border-b border-gray-900/10 pb-12">
                                <h2 className="text-2xl font-semibold leading-7 text-gray-900">Add New Product</h2>
                                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-12">
                                    <div className="sm:col-span-6">
                                        <FormControl fullWidth sx={{ m: 0 }} size="large" >
                                            <TextField
                                                // error={errors && errors.email?.message}
                                                id="standard-error-helper-text"
                                                label="Title"
                                                type='text'
                                                // {...register("email")}
                                                // helperText={errors && errors.email?.message}
                                                variant="filled"
                                            />
                                        </FormControl>
                                    </div>
                                    <div className="sm:col-span-6">
                                        <FormControl fullWidth sx={{ m: 0 }} size="large" >
                                            <TextField
                                                // error={errors && errors.email?.message}
                                                id="standard-error-helper-text"
                                                label="Brand"
                                                type='text'
                                                // {...register("email")}
                                                // helperText={errors && errors.email?.message}
                                                variant="filled" />
                                        </FormControl>
                                    </div>

                                    <div className="sm:col-span-6">
                                        <FormControl fullWidth sx={{ m: 0 }} size="large" >
                                            <TextField
                                                // error={errors && errors.email?.message}
                                                id="standard-error-helper-text"
                                                label="Top Level Category"
                                                type='text'
                                                // {...register("email")}
                                                // helperText={errors && errors.email?.message}
                                                variant="filled"
                                            />
                                        </FormControl>
                                    </div>
                                    <div className="sm:col-span-6">
                                        <FormControl fullWidth sx={{ m: 0 }} size="large" >
                                            <TextField
                                                // error={errors && errors.email?.message}
                                                id="standard-error-helper-text"
                                                label="Second Level Category"
                                                type='text'
                                                // {...register("email")}
                                                // helperText={errors && errors.email?.message}
                                                variant="filled" />
                                        </FormControl>
                                    </div>

                                    <div className="sm:col-span-6">
                                        <FormControl fullWidth sx={{ m: 0 }} size="large" >
                                            <TextField
                                                // error={errors && errors.email?.message}
                                                id="standard-error-helper-text"
                                                label="Third Level Category"
                                                type='text'
                                                // {...register("email")}
                                                // helperText={errors && errors.email?.message}
                                                variant="filled"
                                            />
                                        </FormControl>
                                    </div>
                                    <div className="sm:col-span-6">
                                        <FormControl fullWidth sx={{ m: 0 }} size="large" >
                                            <label htmlFor="favcolor">Select your favorite color:</label>
                                            <input type="color" id="favcolor" name="favcolor" />
                                        </FormControl>
                                    </div>

                                    <div className="sm:col-span-12">
                                        <label htmlFor="uploadimg" className="d-flex-align-items-center justify-content-center btn btn-outline-secondary col-12">Upload Product Thumbnail</label>
                                        <FormControl fullWidth sx={{ m: 0 }} size="large" >
                                            <TextField
                                                // error={errors && errors.email?.message}
                                                id="uploadimg"
                                                accept="image/png, image/gif, image/jpeg"
                                                type="file"
                                                className="form-control"
                                                name="photoo"
                                                onChange={(e) => [uploadthumbnail(e)]}
                                                style={{ display: "none" }}
                                                // {...register("email")}
                                                // helperText={errors && errors.email?.message}
                                                variant="filled"
                                            />
                                        </FormControl>
                                        {(thumbnaillenerr || thumbnailerr) && (
                                            <p style={{ color: "red" }}>
                                                {thumbnailerr || thumbnaillenerr}
                                            </p>
                                        )}
                                    </div>
                                    {thumbnail?.length > 0 &&
                                        <div className="sm:col-span-12 -mt-8 mb-4 flex justify-center items-center bg-[#f0f0f0] p-8" >
                                            <div style={{ position: "relative" }}>
                                                <img
                                                    src={thumbnail[0]}
                                                    alt="img-preview"
                                                    className="rounded-xl "
                                                    style={{ width: "250px", height: "220px" }}
                                                />
                                                <FaTrash
                                                    className="text-danger btn-trash trash"
                                                    style={{ cursor: "pointer", position: "absolute", top: 10, right: 10 }}
                                                    onClick={() => deletethumbnail(thumbnail[0])}
                                                />
                                            </div>
                                        </div>
                                    }

                                    <div className="sm:col-span-12 -mt-6">
                                        <label htmlFor="uploadimg2" className="d-flex-align-items-center justify-content-center btn btn-outline-secondary col-12">Upload Product Images</label>
                                        <FormControl fullWidth sx={{ m: 0 }} size="large" >
                                            <input
                                                // error={errors && errors.email?.message}
                                                id="uploadimg2"
                                                multiple
                                                accept="image/png, image/gif, image/jpeg"
                                                type="file"
                                                className="form-control"
                                                name="photoo"
                                                onChange={(e) => [uploadimages(e)]}
                                                style={{ display: "none" }}
                                            // {...register("email")}
                                            // helperText={errors && errors.email?.message}
                                            // variant="filled"
                                            />
                                        </FormControl>
                                        {(imglenerr || imgerr) && (
                                            <p style={{ color: "red" }}>
                                                {imgerr || imglenerr}
                                            </p>
                                        )}
                                    </div>
                                    {images?.length > 0 &&
                                        <div className="sm:col-span-12 -mt-8 grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4" >
                                            {images.map((img) => {
                                                return (
                                                    <div style={{ position: "relative" }} className='m-2' >
                                                        <div className="flex justify-center items-center" >
                                                            <img
                                                                src={img}
                                                                alt="img-preview"
                                                                className="rounded-xl "
                                                                style={{ width: "250px", height: "220px" }}
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
                                                                onClick={() => deleteimgs(images[0])}
                                                            />
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    }
                                </div>
                            </div>
                        </form>
                    </Typography>
                </Box>
            </Modal>
        </div>
    );
}



