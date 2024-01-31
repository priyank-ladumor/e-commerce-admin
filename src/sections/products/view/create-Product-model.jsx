/* eslint-disable no-lone-blocks */
/* eslint-disable import/no-unresolved */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prefer-const */
/* eslint-disable object-shorthand */
/* eslint-disable no-unreachable-loop */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/button-has-type */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/void-dom-elements-no-children */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable perfectionist/sort-named-imports */
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
// import { useDispatch, useSelector } from 'react-redux';
import { FaTrash } from "react-icons/fa"
import ListSubheader from '@mui/material/ListSubheader';

import { useTheme } from '@mui/material/styles';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
// import { SketchPicker } from 'react-color'
// import { IoIosColorPalette } from "react-icons/io";


import {
    OutlinedInput,
    InputLabel,
    MenuItem,
    Select,
} from "@mui/material";
import SizesTableModal from './child-create-product';
// import { getColorAction } from 'src/store/action/colorAction';
// import { ChildProductModal } from './child-create-product-modal';

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
const sizes = [
    {
        label: 'sizes',
        options: [
            'XS',
            'S',
            'M',
            'L',
            'XL',
            'XLL',
            'XXS'
        ],
    },
];

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};
function getStyles(name, personName, theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}


export default function ProductModal() {

    // const { colorData } = useSelector((state) => state.color)

    const [open, setOpen] = React.useState(false);
    const [images, setimages] = useState([]);
    const [imgerr, setimgerr] = useState();
    const [imglenerr, setimglenerr] = useState();
    const [thumbnail, setthumbnail] = useState([]);
    const [thumbnailerr, setthumbnailerr] = useState();
    const [thumbnaillenerr, setthumbnaillenerr] = useState();

    const [selectedNames, setSelectedNames] = useState([]);
    // const [clropen, setclropen] = useState(false)

    // const [addOtherColor, setAddOtherColor] = useState(0)
    // console.log(addOtherColor);

    // const navigate = useNavigate();
    // const dispatch = useDispatch();
    const [color, setColor] = useState()
    // let colorPicker = []

    // const handleColor = () => {
    //     colorPicker.push(color)
    //     console.log(colorPicker);
    // }
    // console.log(colorPicker, "colorPicker");

    // const showColorPicker = () => {
    //     colorPicker.push(...colorPicker)
    //     setclropen(!clropen)
    // }
    console.log(color, "color");

    const theme = useTheme();
    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setSelectedNames(
            typeof value === 'string' ? value.split(',') : value
        );
        setColor(
            typeof value === 'string' ? value.split(',') : value
        );
    };

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

    // useEffect(() => {
    //     dispatch(getColorAction())
    // }, [])

    // useEffect(() => {
    //     if (colorData) {
    //         setColor(colorData.colors)
    //     }
    // }, [colorData])

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
                                <h2 className="text-3xl font-semibold leading-7 text-gray-900">Add New Product</h2>
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
                                                variant="outlined"
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
                                                variant="outlined" />
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
                                                variant="outlined"
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
                                                variant="outlined" />
                                        </FormControl>
                                    </div>

                                    <div className="sm:col-span-12">
                                        <FormControl fullWidth sx={{ m: 0 }} size="large" >
                                            <TextField
                                                // error={errors && errors.email?.message}
                                                id="standard-error-helper-text"
                                                label="Third Level Category"
                                                type='text'
                                                // {...register("email")}
                                                // helperText={errors && errors.email?.message}
                                                variant="outlined"
                                            />
                                        </FormControl>
                                    </div>
                                 
                                    <div className="sm:col-span-6">
                                        <FormControl sx={{ m: 0, width: "100%" }}>
                                            <InputLabel id="demo-multiple-name-label">Sizes</InputLabel>
                                            <Select
                                                labelId="demo-multiple-name-label"
                                                multiple
                                                id="demo-multiple-name"
                                                value={selectedNames}
                                                onChange={handleChange}
                                                input={<OutlinedInput label="Sizes" />}
                                                renderValue={(selected) => selected.join(', ')}
                                                MenuProps={MenuProps}
                                            >
                                                {sizes.map((name) => (
                                                    <ListSubheader ><div className='text-lg text-700'>{name.label}:</div></ListSubheader>
                                                ))}
                                                {sizes.map((name) => (
                                                    name.options.map((opt) => (
                                                        <MenuItem
                                                            key={opt}
                                                            value={opt}
                                                            style={getStyles(name, selectedNames, theme)}
                                                        >
                                                            <Checkbox checked={selectedNames.indexOf(opt) > -1} />
                                                            <ListItemText primary={opt} />
                                                        </MenuItem>
                                                    ))
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </div>

                                    {selectedNames?.length > 0 &&
                                        <div className=" sm:col-span-6">
                                            <SizesTableModal selectedNames={selectedNames} />
                                        </div>
                                    }
                                    <div className="sm:col-span-12">
                                        <label htmlFor="uploadimg" className="d-flex-align-items-center justify-content-center btn btn-outline-secondary col-12">Upload Product Thumbnail</label>
                                        <FormControl fullWidth sx={{ m: 0 }} size="large" >
                                            <input
                                                id="uploadimg"
                                                accept="image/png, image/gif, image/jpeg"
                                                type="file"
                                                className="form-control"
                                                name="photoo"
                                                onChange={(e) => [uploadthumbnail(e)]}
                                                style={{ display: "none" }}
                                            />
                                        </FormControl>
                                        {(thumbnaillenerr || thumbnailerr) && (
                                            <p style={{ color: "red" }}>
                                                {thumbnailerr || thumbnaillenerr}
                                            </p>
                                        )}
                                    </div>
                                    {thumbnail?.length > 0 &&
                                        <div className="sm:col-span-12 -mt-8  sm:grid-cols-1 gap-4 bg-[#f0f0f0] p-8 mb-3" >
                                            <div className="flex justify-center items-center" >
                                                {thumbnail.map((img) => {
                                                    return (
                                                        <div style={{ position: "relative" }} className='m-2 ' >
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
                                                                    onClick={() => deletethumbnail(img)}
                                                                />
                                                            </div>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    }

                                    <div className="sm:col-span-12 -mt-6">
                                        <label htmlFor="uploadimg2" className="d-flex-align-items-center justify-content-center btn btn-outline-secondary col-12">Upload Product Images</label>
                                        <FormControl fullWidth sx={{ m: 0 }} size="large" >
                                            <input
                                                id="uploadimg2"
                                                multiple
                                                accept="image/png, image/gif, image/jpeg"
                                                type="file"
                                                className="form-control"
                                                name="photoo"
                                                onChange={(e) => [uploadimages(e)]}
                                                style={{ display: "none" }}
                                            />
                                        </FormControl>
                                        {(imglenerr || imgerr) && (
                                            <p style={{ color: "red" }}>
                                                {imgerr || imglenerr}
                                            </p>
                                        )}
                                    </div>
                                    {images?.length > 0 &&
                                        <div className="sm:col-span-12 -mt-8 grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4 bg-[#f0f0f0] p-8" >
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
                                                                onClick={() => deleteimgs(img)}
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



{/* <FormControl fullWidth sx={{ m: 0 }} size="large" className='text-lg text-700 mt-3' >
<div className=" sm:col-span-4">
    {!clropen ?
        <div className='flex float-start'>
            <label htmlFor="favcolor " onClick={showColorPicker} className='mb-3 font-semibold cursor-pointer text-lg text-700 flex justify-center items-center float-start' >Select Color
                <IoIosColorPalette className='text-[28px] font-bold mr-1' type='button' />:
            </label>
            <p className=' text-black-700 p-3 h-10 ml-1 -mt-1 rounded-full' style={{ color: color, background: color }} >{". "}</p>
        </div>
        :
        <div className='flex float-start'>
            <label htmlFor="favcolor " onClick={showColorPicker} className='mb-3 font-semibold cursor-pointer text-lg text-700 flex justify-center items-center float-start' >Close
                <IoIosColorPalette className='text-[28px] font-bold mr-1' type='button' />:
            </label>
            <p className=' text-black-700 p-3 h-10 ml-1 -mt-1 rounded-full' style={{ color: color, background: color }} >{". "}</p>
        </div>
    }
    <button type='button' onClick={handleColor}>add</button>

    {clropen && <SketchPicker className='mt-3' onChange={(color) => setColor(color.hex)} />}
</FormControl> */}

{/*   <FormControl sx={{ m: 0, width: "100%" }}>
    <InputLabel id="demo-multiple-name-label">Colors</InputLabel>
    <Select
        labelId="demo-multiple-name-label"
        multiple
        id="demo-multiple-name"
        value={selectedNames}
        // onChange={handleChange}
        input={<OutlinedInput label="Colors" />}
        renderValue={(selected) => selected.join(', ')}
        MenuProps={MenuProps}
    >
        {color?.length > 0 && color.map((clr) => (
            <MenuItem
                key={clr.name}
                value={clr.name}
                // style={getStyles(clr, selectedNames, theme)}
            >
                <Checkbox checked={selectedNames.indexOf(clr.name) > -1} />
                <ListItemText primary={clr.name} />
            </MenuItem>
        ))}
    </Select>
</FormControl>
</div>
*/}