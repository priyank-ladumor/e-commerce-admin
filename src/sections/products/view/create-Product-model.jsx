/* eslint-disable no-return-assign */
/* eslint-disable no-undef */
/* eslint-disable import/no-duplicates */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable no-lonely-if */
/* eslint-disable spaced-comment */
/* eslint-disable no-unneeded-ternary */
/* eslint-disable react/jsx-no-bind */
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
import Alert from '@mui/material/Alert';

import { useTheme } from '@mui/material/styles';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
// import { SketchPicker } from 'react-color'
// import { IoIosColorPalette } from "react-icons/io";

import { RiDeleteBin5Fill } from "react-icons/ri";
import { MdEditSquare } from "react-icons/md";
import { IoSave } from "react-icons/io5";

import {
    OutlinedInput,
    InputLabel,
    MenuItem,
    Select,
} from "@mui/material";
// import SizesTableModal from './child-create-product';
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

    //for geting child data i created state and function to passing child to parent
    // const [sizeColorQuantity, setsizeColorQuantity] = useState([]);
    // function setSize(table) {
    //     setsizeColorQuantity(table)
    // }

    // const getSizeFromTable = TableAll.map((ele) => ele.size)

    const [open, setOpen] = React.useState(false);
    const [images, setimages] = useState([]);
    const [imgerr, setimgerr] = useState();
    const [imglenerr, setimglenerr] = useState();
    const [thumbnail, setthumbnail] = useState([]);
    const [thumbnailerr, setthumbnailerr] = useState();
    const [thumbnaillenerr, setthumbnaillenerr] = useState();

    const [selectedNames, setSelectedNames] = useState([]);

    // const navigate = useNavigate();
    // const dispatch = useDispatch();

    const theme = useTheme();
    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setSelectedNames(
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

    const table = []
    const [color, setColor] = useState(0)
    const [quantity, setQuantity] = React.useState(0);
    const [otherSize, setotherSize] = React.useState([]);
    const [TableAll, setTableAll] = useState([])
    const [firstSize, setfirstSize] = useState()
    const [editTableSize, setEditTableSize] = useState([])
    const [error, seterror] = useState()
    const [newRow, setNewRow] = useState(false)


    const getSizeFromTable = TableAll.map((ele) => ele.size);

    function removeDuplicates(arr) {
        return [...new Set(arr)];
    }

    // for first save input and other disable sizes input array separates 
    React.useEffect(() => {
        if (selectedNames?.length > 0) {
            setfirstSize(selectedNames[0])
        }
        if (firstSize) {
            const copyWithoutFirstElement = selectedNames.slice(1);
            setotherSize(copyWithoutFirstElement)
            if (firstSize === otherSize[0]) {
                const copyWithoutFirstElement = otherSize.slice(1);
                setotherSize(copyWithoutFirstElement)
            }
        }
    }, [selectedNames, firstSize])

    const saveData = (sizes, clr, quant) => {

        const id = Math.floor(Math.random() * 101010)
        if (color.length > 0 && quantity.length > 0) {
            //create single table input array
            if (editTableSize && quant && quantity === 0) {
                const filterTable = table.filter((tbl) => tbl.size === sizes)
                if (table.length === 0) {
                    table.push({ "size": sizes, "quantity": quant, "color": color, "id": id })
                } else {
                    if (filterTable.length === 0) {
                        table.push({ "size": sizes, "quantity": quant, "color": color, "id": id })
                    }
                }
            } else if (editTableSize && clr && color === 0) {
                const filterTable = table.filter((tbl) => tbl.size === sizes)
                if (table.length === 0) {
                    table.push({ "size": sizes, "quantity": quantity, "color": clr, "id": id })
                } else {
                    if (filterTable.length === 0) {
                        table.push({ "size": sizes, "quantity": quantity, "color": clr, "id": id })
                    }
                }
            }
            else {
                const filterTable = table.filter((tbl) => tbl.size === sizes)
                if (table.length === 0) {
                    table.push({ "size": sizes, "quantity": quantity, "color": color, "id": id })
                } else {
                    if (filterTable.length === 0) {
                        table.push({ "size": sizes, "quantity": quantity, "color": color, "id": id })
                    }
                }
            }

            // create all table data input array
            const filterTable2 = TableAll.filter((tbl) => tbl.size === sizes)
            if (TableAll.length === 0) {
                TableAll.push({ "size": sizes, "quantity": quantity, "color": color, "id": id })
            } else {
                if (filterTable2.length === 0) {
                    TableAll.push({ "size": sizes, "quantity": quantity, "color": color, "id": id })
                }
            }
            if (TableAll.length === 0) {
                setTableAll(table)
            }

            //for removing the already filled size input
            for (let i = 0; i < selectedNames.length; i++) {
                if (selectedNames[i] === sizes) {
                    selectedNames.splice(i, 1);
                }
            }
            // for first save input and other disable sizes input array separates 
            setfirstSize(selectedNames[0])

            //edited data set empty array because after edited input we have to remove it showing 
            setEditTableSize([])
            seterror("")
        } else {
            seterror("Please enter color and quantity");
        }

        //after save first input default quantity set 0
        setColor("")
        setsizeselect("")
        setQuantity("")
    }

    const deleteSizes = (id, size) => {
        const removedSizes = TableAll.filter((ele) => ele.id !== id);
        setTableAll(removedSizes);
    }

    const editSizes = (tableEdit) => {
        setEditTableSize([{
            size: tableEdit.size,
            color: tableEdit.color,
            quantity: tableEdit.quantity,
        }])
        setQuantity(tableEdit.quantity)
        setColor(tableEdit.color)
        // setsizeselect(tableEdit.size)

        const removedSizes = TableAll.filter((ele) => ele.id !== tableEdit.id);
        setTableAll(removedSizes);
    }

    const [sizeselect, setsizeselect] = React.useState('');

    const saveDataRow = () => {
        const id = Math.floor(Math.random() * 101010)
        if (color.length > 0 && quantity.length > 0 && sizeselect.length > 0) {
            TableAll.push({ "size": sizeselect, "quantity": quantity, "color": color, "id": id })
            seterror("")
        } else {
            seterror("Please enter color and quantity");
        }
        setColor("")
        setsizeselect("")
        setQuantity("")
    }

    const sizesFromTableAll = TableAll.map((table) => table.size);
    const sizeWithOutDuplicate = sizesFromTableAll.filter((v, i) => sizesFromTableAll.indexOf(v) === i);

    const handleChangeSelectSize = (event) => {
        setsizeselect(event.target.value);
    };
    const handleChangeColor = (event) => {
        setColor(event.target.value)
    }
    const handleChangeQuantity = (event) => {
        setQuantity(event.target.value)
    }
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

                                    <div className="sm:col-span-6">
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
                                                // value={getSizeFromTable.length > 0 ? getSizeFromTable : selectedNames}
                                                value={TableAll.length > 0 ? removeDuplicates(getSizeFromTable) : selectedNames}
                                                onChange={handleChange}
                                                input={<OutlinedInput label="Sizes" />}
                                                renderValue={(selected) => selected.join(', ')}
                                                MenuProps={MenuProps}
                                                disabled={getSizeFromTable.length > 0}
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

                                    {(selectedNames?.length > 0 || getSizeFromTable.length > 0 || editTableSize.length > 0) &&
                                        <div className=" sm:col-span-12" style={{ width: "100%", overflowX: "auto" }}>
                                            {/* <SizesTableModal selectedNames={selectedNames} setSize={setSize} sizeColorQuantity={sizeColorQuantity} /> */}
                                            {error && <Alert severity="error" className='flex justify-center' >{error}</Alert>}
                                            <table style={{ width: "50%" }}>
                                                <thead>
                                                    <tr>
                                                        <th>Sizes</th>
                                                        <th>Colors</th>
                                                        <th>Quantity</th>
                                                        <th>Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {editTableSize.length > 0 &&
                                                        editTableSize.map((table) => {
                                                            return (
                                                                <>
                                                                    <tr>
                                                                        <td>{table.size}</td>
                                                                        <td><input type='color' defaultValue={table.color} onChange={handleChangeColor} /></td>
                                                                        <td> <TextField style={{ width: "60px", display: "flex", justifyContent: "center", textAlign: "center" }} type='number' defaultValue={table.quantity} onChange={handleChangeQuantity} id="standard-basic" label="" variant="standard" /></td>
                                                                        <td>
                                                                            <IoSave style={{ fontSize: "28px", color: "blue", cursor: "pointer" }} onClick={() => [saveData(table.size, table.color, table.quantity)]} >Save</IoSave>
                                                                        </td>
                                                                    </tr>
                                                                </>
                                                            )
                                                        })
                                                    }

                                                    {TableAll.length > 0 &&
                                                        TableAll.map((table) => {
                                                            return (
                                                                <>
                                                                    <tr>
                                                                        <td>
                                                                            {table.size}
                                                                        </td>
                                                                        <td><spam className='p-2 px-3 rounded-full' style={{ background: table.color }}>{"  "}</spam></td>
                                                                        <td>
                                                                            {table.quantity}
                                                                        </td>
                                                                        <td className='flex justify-evenly' >
                                                                            <MdEditSquare style={{ fontSize: "28px", color: "black", cursor: "pointer" }} onClick={() => [editSizes(table)]}>Edit</MdEditSquare>
                                                                            <RiDeleteBin5Fill style={{ fontSize: "28px", color: "red", cursor: "pointer" }} onClick={() => deleteSizes(table.id, table.size)} >Delete</RiDeleteBin5Fill>
                                                                        </td>
                                                                    </tr>
                                                                </>
                                                            )
                                                        })
                                                    }
                                                    {/* if edit is not enable then it will show  */}
                                                    {editTableSize.length === 0 && firstSize &&
                                                        <tr>
                                                            <td>{firstSize}</td>
                                                            <td><input type='color' value={color} onChange={handleChangeColor} /></td>
                                                            <td> <TextField style={{ width: "60px", display: "flex", justifyContent: "center" }} type='number' value={quantity} onChange={handleChangeQuantity} id="standard-basic" label="" variant="standard" /></td>
                                                            <td>
                                                                <IoSave style={{ fontSize: "28px", color: "blue", cursor: "pointer" }} onClick={() => saveData(firstSize)} >Save</IoSave>
                                                            </td>
                                                        </tr>
                                                    }
                                                    {/* if edit is enable then it will show  */}
                                                    {firstSize && editTableSize.length > 0 &&
                                                        <tr>
                                                            <td>{firstSize}</td>
                                                            <td><input type='color' disabled onChange={handleChangeColor} /></td>
                                                            <td> <TextField style={{ width: "60px", display: "flex", justifyContent: "center" }} disabled type='number' defaultValue={table.quantity} onChange={handleChangeQuantity} id="standard-basic" label="" variant="standard" /></td>
                                                            <td>
                                                                <IoSave style={{ fontSize: "28px", color: "black", opacity: "0.5", cursor: "pointer" }} disabled color='success' >Save</IoSave>
                                                            </td>
                                                        </tr>
                                                    }
                                                    {otherSize &&
                                                        otherSize.map((sizes) => {
                                                            return (
                                                                <>
                                                                    <tr>
                                                                        <td>
                                                                            {sizes}
                                                                        </td>
                                                                        <td><input type='color' disabled style={{ opacity: "0.5" }} /></td>
                                                                        <td> <TextField style={{ width: "60px", display: "flex", justifyContent: "center", boxShadow: "none", textAlign: "center" }} disabled type='number' defaultValue={0} onChange={e => setQuantity(e.target.value)} className="standard-basic2" label="" variant="standard" /></td>
                                                                        <td>
                                                                            <IoSave style={{ fontSize: "28px", color: "black", opacity: "0.5" }} disabled >Save</IoSave>
                                                                        </td>
                                                                    </tr>
                                                                </>
                                                            )
                                                        })
                                                    }
                                                    {newRow &&
                                                        <tr>
                                                            <td>
                                                                <FormControl variant="standard" sx={{ m: 0 }}>
                                                                    <Select
                                                                        id="demo-simple-select-standard"
                                                                        value={sizeselect}
                                                                        onChange={handleChangeSelectSize}
                                                                        displayEmpty
                                                                        style={{ padding: "0px", width: "60px" }}
                                                                        inputProps={{ 'aria-label': 'Without label' }}
                                                                    >
                                                                        <MenuItem value="">
                                                                            <em>Size</em>
                                                                        </MenuItem>
                                                                        {sizes.map((name) => (
                                                                            name.options.map((opt) => (
                                                                                <MenuItem
                                                                                    key={opt}
                                                                                    value={opt}
                                                                                >
                                                                                    {opt}
                                                                                </MenuItem>
                                                                            ))
                                                                        ))}
                                                                    </Select>
                                                                </FormControl>
                                                            </td>
                                                            <td>
                                                                <FormControl variant="standard" sx={{ m: 0 }}>
                                                                    <input type='color' value={color}  onChange={handleChangeColor} />
                                                                </FormControl>
                                                            </td>
                                                            <td>
                                                                <FormControl variant="standard" sx={{ m: 0 }}>
                                                                    <TextField id="standard-basic" inputProps={{ 'aria-label': 'Without label' }} label=""  variant="standard" style={{ width: "60px", display: "flex", justifyContent: "center" }} type='number' value={quantity}  onChange={handleChangeQuantity} size='sm' />
                                                                </FormControl>
                                                            </td>
                                                            <td className='flex justify-evenly' >
                                                                <IoSave style={{ fontSize: "28px", color: "blue", cursor: "pointer" }} onClick={() => saveDataRow()} >Save</IoSave>
                                                                <RiDeleteBin5Fill style={{ fontSize: "28px", color: "red", cursor: "pointer" }} onClick={() => setNewRow(false)} >Delete</RiDeleteBin5Fill>
                                                            </td>
                                                        </tr>
                                                    }
                                                    {/* <tr className='font-bold bg-slate-300 text-wrap'>
                                                        <td>{TableAll.length > 0 && TableAll.map((table) => <spam className='p-2 ml-1 px-3 rounded-full' style={{ background: table.color }}>{"  "}</spam>)}</td>
                                                        <td>{TableAll.length > 0 && TableAll?.map((table) => Number(table.quantity)).reduce((a, b) => a + b)}</td>
                                                    </tr> */}
                                                </tbody>
                                            </table>
                                            {TableAll.length > 0 && !firstSize &&
                                                <div className="sm:col-span-12">
                                                    <Button variant="contained" className='my-3' disabled={newRow} color='success' onClick={() => setNewRow(true)} >Add New Row</Button>
                                                    {sizeWithOutDuplicate.map((size) =>
                                                        <div>
                                                            <p>{size}</p>
                                                        </div>
                                                    )}
                                                </div>
                                            }
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