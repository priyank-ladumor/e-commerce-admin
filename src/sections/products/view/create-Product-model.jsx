/* eslint-disable react/jsx-boolean-value */
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
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { FaTrash } from "react-icons/fa"
import ListSubheader from '@mui/material/ListSubheader';
import Alert from '@mui/material/Alert';
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTheme } from '@mui/material/styles';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
// import { SketchPicker } from 'react-color'
// import { IoIosColorPalette } from "react-icons/io";
import { ThreeDots } from 'react-loader-spinner'
import { RiDeleteBin5Fill } from "react-icons/ri";
import { MdEditSquare } from "react-icons/md";
import { IoSave } from "react-icons/io5";
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import FormHelperText from '@mui/material/FormHelperText';
import Iconify from 'src/components/iconify';
import Swal from 'sweetalert2'
import { CTable } from '@coreui/react'
import { CTableBody } from '@coreui/react'
import { CTableDataCell } from '@coreui/react'
import { CTableHead } from '@coreui/react'
import { CTableHeaderCell } from '@coreui/react'
import { CTableRow } from '@coreui/react'
import {
    OutlinedInput,
    InputLabel,
    MenuItem,
    Select,
} from "@mui/material";
import { createProductAction } from 'src/store/action/productAction';
import Autocomplete from '@mui/material/Autocomplete';
import { getSecondLvlCategoriesAction, getThirdLvlCategoriesAction, getTopLvlCategoriesAction } from 'src/store/action/categoriesAction';
import { getSizesAction } from 'src/store/action/sizeAction';

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


const schema = yup.object({
    title: yup
        .string()
        .min(4, "title must be above 4 characters")
        .max(25, "title must be with in 25 characters")
        .required("please enter title"),
    price: yup.number().min(50, "price must be above 50").typeError("please enter price").required(),
    brand: yup.string().min(2).max(24).required("Please enter product brand"),
    // topLevelCategory: yup.string().min(2).max(24).matches(/^\S*$/, "No whitespaces allowed").required("Please enter product top level category"),
    // secondLevelCategory: yup.string().min(2).max(24).matches(/^\S*$/, "No whitespaces allowed").required("Please enter product second level category"),
    // thirdLevelCategory: yup.string().min(2).max(24).matches(/^\S*$/, "No whitespaces allowed").required("Please enter product third level category"),
    description: yup.string().min(40).max(800).required("Please enter product description"),
});

// const sizes = [
//     {
//         label: 'sizes',
//         options: [
//             'XS',
//             'S',
//             'M',
//             'L',
//             'XL',
//             'XLL',
//             'XXS'
//         ],
//     },
// ];

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

    const { createProductPending, createProductData } = useSelector((state) => state.product)

    const {
        register,
        handleSubmit,
        clearErrors,
        formState: { errors },
        reset,
    } = useForm({
        resolver: yupResolver(schema),
    });
    const { getSizesDATA } = useSelector((state) => state.size)

    const [open, setOpen] = React.useState(false);
    const [images, setimages] = useState([]);
    const [imgerr, setimgerr] = useState();
    const [imglenerr, setimglenerr] = useState();
    const [thumbnail, setthumbnail] = useState([]);
    const [thumbnailerr, setthumbnailerr] = useState();

    const [selectedNames, setSelectedNames] = useState([]);
    const [getSizeData, setgetSizeData] = useState()



    // const navigate = useNavigate();
    const dispatch = useDispatch();

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

    useEffect(() => {
        dispatch(getSizesAction())
    }, [])
    useEffect(() => {
        if (getSizesDATA?.length > 0) {
            setgetSizeData(getSizesDATA)
        }
        console.log(getSizeData, "in size");
    }, [getSizesDATA])

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


    const deleteimgs = (delitem) => {
        const handleDelete = images.filter((item, id) => item !== delitem);
        setimages(handleDelete);
    };
    const deletethumbnail = (delitem) => {
        const handleDelete2 = thumbnail.filter((item, id) => item !== delitem);
        setthumbnail(handleDelete2);
    };

    const table = []
    const [color, setColor] = useState("")
    const [quantity, setQuantity] = React.useState("");

    //other sizes means sizes[1,2..]
    const [otherSize, setotherSize] = React.useState([]);

    //sizeColorQuantity Array
    const [TableAll, setTableAll] = useState([])

    //for first(size[0]) input filed for showing data to save from sizes 
    const [firstSize, setfirstSize] = useState()

    //for edit size
    const [editTableSize, setEditTableSize] = useState([])

    //for error
    const [error, seterror] = useState()

    //for table new row
    const [newRow, setNewRow] = useState(false)

    //size select input
    const [sizeselect, setsizeselect] = React.useState('');

    //for top/second/third category input
    const [topCategory, settopCategory] = useState("")
    const [secondCategory, setsecondCategory] = useState("")
    const [thirdCategory, setthirdCategory] = useState("")

    //for top/second/third category input Error
    const [thirdCategoryError, setthirdCategoryError] = useState("")

    //for top/second/third categories data
    const [topCategoryData, settopCategoryData] = useState("")
    const [secondCategoryData, setsecondCategoryData] = useState("")
    const [thirdCategoryData, setthirdCategoryData] = useState("")

    //for second/third parent id
    const [secondParentId, setsecondParentId] = useState("")
    const [thirdParentId, setthirdParentId] = useState("")

    const { getTopLvlCategoriesData, getSecondLvlCategoriesData, getThirdLvlCategoriesData } = useSelector(state => state.categories)

    React.useEffect(() => {
        if (thirdCategory?.length > 0) {
            setthirdCategoryError("")
        }
    }, [thirdCategory])

    React.useEffect(() => {
        const secondParent = topCategoryData && topCategory && topCategoryData.content.filter((data) => data.name === topCategory)
        if (secondParent) {
            setsecondParentId(secondParent[0]._id)
        }
        const thirdParent = secondCategoryData && secondCategory && secondCategoryData.content.filter((data) => data.name === secondCategory)
        if (thirdParent) {
            setthirdParentId(thirdParent[0]._id)
        }
    }, [topCategory, secondCategory])

    React.useEffect(() => {
        const item = {
            pageNumber: 0,
            pageSize: 0
        }
        dispatch(getTopLvlCategoriesAction(item))
    }, [])

    React.useEffect(() => {
        if (secondParentId) {
            const query = `?parentCategory=${secondParentId}`
            dispatch(getSecondLvlCategoriesAction(query))
        }
    }, [secondParentId])

    React.useEffect(() => {
        if (thirdParentId) {
            const item = {
                pageSize: 0,
                pageNumber: 0,
                parentCategory: thirdParentId
            }
            dispatch(getThirdLvlCategoriesAction(item))
        }
    }, [thirdParentId])

    React.useEffect(() => {
        if (getTopLvlCategoriesData) {
            settopCategoryData(getTopLvlCategoriesData)
        }
        if (getSecondLvlCategoriesData && secondParentId !== "") {
            setsecondCategoryData(getSecondLvlCategoriesData)
        }
        if (getThirdLvlCategoriesData && thirdParentId !== "") {
            setthirdCategoryData(getThirdLvlCategoriesData)
        }
    }, [getTopLvlCategoriesData, getSecondLvlCategoriesData, secondParentId, thirdParentId, getThirdLvlCategoriesData])

    const getSizeFromTable = TableAll && TableAll?.map((ele) => ele.size);

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
        if (color.length > 0 && quantity.length > "") {
            //create single table input array
            if (editTableSize && quant && quantity === 0) {
                if (table.length === 0) {
                    table.push({ "size": sizes, "quantity": quant, "color": color, "id": id })
                } else {
                    table.push({ "size": sizes, "quantity": quant, "color": color, "id": id })
                }
            } else if (editTableSize && clr && color === "") {
                if (table.length === 0) {
                    table.push({ "size": sizes, "quantity": quantity, "color": clr, "id": id })
                } else {
                    table.push({ "size": sizes, "quantity": quantity, "color": clr, "id": id })
                }
            }
            else {
                // const filterTable = table.filter((tbl) => tbl.size === sizes)
                if (table.length === 0) {
                    table.push({ "size": sizes, "quantity": quantity, "color": color, "id": id })
                } else {
                    // if (filterTable.length === 0) {
                    table.push({ "size": sizes, "quantity": quantity, "color": color, "id": id })
                    // }
                }
            }

            // create all table data input array
            // const filterTable2 = TableAll && TableAll.filter((tbl) => tbl.size === sizes)
            if (TableAll.length === 0) {
                TableAll.push({ "size": sizes, "quantity": quantity, "color": color, "id": id })
            } else {
                // if (filterTable2.length === 0) {
                TableAll.push({ "size": sizes, "quantity": quantity, "color": color, "id": id })
                // }
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
        const removedSizes = TableAll && TableAll.filter((ele) => ele.id !== id);
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

        const removedSizes = TableAll && TableAll.filter((ele) => ele.id !== tableEdit.id);
        setTableAll(removedSizes);
    }

    const saveDataRow = () => {
        const id = Math.floor(Math.random() * 101010)
        if (color.length > 0 && quantity.length > 0 && sizeselect.length > 0) {
            TableAll.push({ "size": sizeselect, "quantity": quantity, "color": color, "id": id })
            seterror("")
        } else {
            seterror("Please enter color or quantity or size");
        }
        setColor("")
        setsizeselect("")
        setQuantity("")
    }

    // const sizesFromTableAll = TableAll && TableAll.map((table) => table.size);
    // const sizeWithOutDuplicate = sizesFromTableAll && sizesFromTableAll.filter((v, i) => sizesFromTableAll.indexOf(v) === i);

    const handleChangeSelectSize = (event) => {
        setsizeselect(event.target.value);
    };
    const handleChangeColor = (event) => {
        setColor(event.target.value)
    }
    const handleChangeQuantity = (event) => {
        setQuantity(event.target.value)
    }

    const [openSwal, setOpenSwal] = useState(false)

    const onSubmit = (data) => {
        const item = {
            title: data.title,
            brand: data.brand,
            topLevelCategory: topCategory,
            secondLevelCategory: secondCategory,
            thirdLevelCategory: thirdCategory,
            price: data.price,
            discountPercentage: data.discountPercentage,
            description: data.description,
            sizesAndColor: TableAll,
            thumbnail: thumbnail,
            images: images,
        }

        if (images.length > 0 && TableAll.length > 0 && thumbnail.length > 0 && topCategory?.length > 0 && secondCategory?.length > 0 && thirdCategory?.length > 0) {
            dispatch(createProductAction(item))
            reset();
            settopCategory("")
            setsecondCategory("")
            setthirdCategory("")
            setimages("")
            setthumbnail("")
            setTableAll([])
            setOpenSwal(true)
            setsecondParentId("")
            setthirdParentId("")
        }
    }
    useEffect(() => {
        if (createProductData && openSwal) {
            handleClose();
            <div className='swal2-container'>
                {Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Product created successfully",
                    showConfirmButton: false,
                    timer: 3000
                })}
            </div>
        }
    }, [createProductData])

    const [sizeValidation, setsizeValidation] = useState("")
    const validation = () => {
        if (images?.length === 0) {
            const err2 = "You need to provide an image";
            setimgerr(err2);
        }
        if (thumbnail?.length === 0) {
            const err2 = "You need to provide an image";
            setthumbnailerr(err2);
        }
        if (!getSizeFromTable[0]) {
            setsizeValidation("Please select product sizes")
        }
        if (thirdCategory?.length === 0) {
            setthirdCategoryError("Please enter product top,second and third level category")
        }
    };

    useEffect(() => {
        if (getSizeFromTable[0]) {
            setsizeValidation("")
        }
    }, [getSizeFromTable])

    const onReset = () => {
        reset();
        setimages([]);
        setimgerr("")
        setimglenerr("")
        setthumbnail([]);
        setthumbnailerr("")
        setsizeValidation("")
        setTableAll([])
        //size select input none
        setSelectedNames([])
        settopCategory("")
        setsecondCategory("")
        setthirdCategory("")
        setthirdCategoryError("")
        setsecondParentId("")
        setthirdParentId("")
    };

    return (
        <div>
            <Button onClick={handleOpen} style={{ color: "white" }} className='py-2' variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />}>New Product</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} className="style_modal">
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        <div className='text-4xl font-bold flex justify-between'>
                            <h2 className="text-3xl font-semibold leading-7 text-gray-900">Add New Product</h2>
                            <IoClose onClick={() => handleClose()} style={{ cursor: "pointer" }} />
                        </div>
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 6, minWidth: "210px", maxHeight: "80vh", overflowY: "auto" }}>
                        <form className='-mt-4 p-4' onSubmit={handleSubmit(onSubmit)}>
                            <div className="pb-12">
                                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-12">
                                    <div className="sm:col-span-6">
                                        <FormControl fullWidth sx={{ m: 0 }} size="large" >
                                            <TextField
                                                error={errors && errors.title?.message}
                                                id="standard-error-helper-text"
                                                label="Title"
                                                type='text'
                                                {...register("title")}
                                                helperText={errors && errors.title?.message}
                                                variant="outlined"
                                            />
                                        </FormControl>
                                    </div>
                                    <div className="sm:col-span-6">
                                        <FormControl fullWidth sx={{ m: 0 }} size="large" >
                                            <TextField
                                                error={errors && errors.brand?.message}
                                                id="standard-error-helper-text"
                                                label="Brand"
                                                type='text'
                                                {...register("brand")}
                                                helperText={errors && errors.brand?.message}
                                                variant="outlined" />
                                        </FormControl>
                                    </div>
                                    {/* 
                                    <div className="sm:col-span-6">
                                        <FormControl fullWidth sx={{ m: 0 }} size="large" >
                                            <TextField
                                                error={errors && errors.topLevelCategory?.message}
                                                id="standard-error-helper-text"
                                                label="Top Level Category"
                                                type='text'
                                                {...register("topLevelCategory")}
                                                helperText={errors && errors.topLevelCategory?.message}
                                                variant="outlined"
                                            />
                                        </FormControl>
                                    </div> */}

                                    <div className="sm:col-span-6">
                                        <Autocomplete
                                            value={topCategory}
                                            onChange={(event, newValue) => [
                                                setsecondCategoryData(""),
                                                setthirdCategory(""),
                                                setthirdCategoryData(""),
                                                setthirdParentId(""),
                                                settopCategory(newValue),
                                                setsecondParentId(""),
                                                setsecondCategory("")
                                            ]}
                                            id="controllable-states-demo"
                                            options={topCategoryData && topCategoryData?.content.map((data) =>
                                                data.name
                                            )}
                                            sx={{ width: "100%" }}
                                            renderInput={(params) => <TextField {...params} label="Top Level Category" />}
                                        />
                                    </div>

                                    {/* <div className="sm:col-span-6">
                                        <FormControl fullWidth sx={{ m: 0 }} size="large" >
                                            <TextField
                                                error={errors && errors.secondLevelCategory?.message}
                                                id="standard-error-helper-text"
                                                label="Second Level Category"
                                                type='text'
                                                {...register("secondLevelCategory")}
                                                helperText={errors && errors.secondLevelCategory?.message}
                                                variant="outlined" />
                                        </FormControl>
                                    </div> */}

                                    <div className="sm:col-span-6">
                                        <Autocomplete
                                            value={secondCategory}
                                            onChange={(event, newValue) => [
                                                setthirdCategoryData(""),
                                                setsecondCategory(newValue),
                                                setthirdParentId(""),
                                                setthirdCategory("")
                                            ]}
                                            disabled={secondParentId.length === 0}
                                            id="controllable-states-demo"
                                            options={secondCategoryData && secondCategoryData?.content.map((data) =>
                                                data.name
                                            )}
                                            sx={{ width: "100%" }}
                                            renderInput={(params) => <TextField  {...params} label="Second Level Category" />}
                                        />
                                    </div>

                                    {/* <div className="sm:col-span-6">
                                        <FormControl fullWidth sx={{ m: 0 }} size="large" >
                                            <TextField
                                                error={errors && errors.thirdLevelCategory?.message}
                                                id="standard-error-helper-text"
                                                label="Third Level Category"
                                                type='text'
                                                {...register("thirdLevelCategory")}
                                                helperText={errors && errors.thirdLevelCategory?.message}
                                                variant="outlined"
                                            />
                                        </FormControl>
                                    </div> */}

                                    <div className="sm:col-span-6">
                                        <Autocomplete
                                            value={thirdCategory}
                                            onChange={(event, newValue) => [
                                                setthirdCategory(newValue)
                                            ]}
                                            disabled={thirdParentId.length === 0}
                                            id="controllable-states-demo"
                                            options={thirdCategoryData && thirdCategoryData?.content.map((data) =>
                                                data.name
                                            )}
                                            sx={{ width: "100%" }}
                                            renderInput={(params) => <TextField error={thirdCategoryError} helperText={thirdCategoryError && thirdCategoryError} {...params} label="Third Level Category" />}
                                        />
                                    </div>

                                    <div className="sm:col-span-6">
                                        <FormControl sx={{ m: 0, width: "100%" }}>
                                            <InputLabel id="demo-multiple-name-label" error={sizeValidation && sizeValidation}>Sizes</InputLabel>
                                            <Select
                                                error={sizeValidation && sizeValidation}
                                                labelId="demo-multiple-name-label"
                                                multiple
                                                id="demo-multiple-name"
                                                {...register("sizes")}
                                                value={TableAll.length > 0 ? removeDuplicates(getSizeFromTable) : selectedNames}
                                                onChange={handleChange}
                                                input={<OutlinedInput label="Sizes" />}
                                                renderValue={(selected) => selected.join(', ')}
                                                MenuProps={MenuProps}
                                                disabled={getSizeFromTable.length > 0}
                                            >

                                                <ListSubheader ><div className='text-lg text-700'>Sizes:</div></ListSubheader>
                                                {getSizeData && getSizeData.map((name) => (
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
                                            {sizeValidation && <FormHelperText className='' style={{ color: "red", opacity: "0.8" }} >{sizeValidation}</FormHelperText>}
                                        </FormControl>
                                    </div>

                                    {(selectedNames?.length > 0 || getSizeFromTable.length > 0 || editTableSize.length > 0) &&
                                        <div className=" sm:col-span-12" style={{ width: "100%", overflowX: "auto" }}>
                                            {error && <Alert severity="error" className='flex justify-center' >{error}</Alert>}
                                            <CTable striped className='table table-bordered border-primary'>
                                                <CTableHead color="dark">
                                                    <CTableRow className=''>
                                                        <CTableHeaderCell scope="col">Sizes</CTableHeaderCell>
                                                        <CTableHeaderCell scope="col">Colors</CTableHeaderCell>
                                                        <CTableHeaderCell scope="col">Quantity</CTableHeaderCell>
                                                        <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
                                                    </CTableRow>
                                                </CTableHead>
                                                <CTableBody color="light">
                                                    {editTableSize.length > 0 &&
                                                        editTableSize.map((table) => {
                                                            return (
                                                                <>
                                                                    <CTableRow>
                                                                        <CTableDataCell>{table.size}</CTableDataCell>
                                                                        <CTableDataCell><input type='color' defaultValue={table.color} onChange={handleChangeColor} /></CTableDataCell>
                                                                        <CTableDataCell> <TextField style={{ width: "60px", display: "flex", justifyContent: "center", textAlign: "center" }} inputProps={{ min: 0 }} type='number' defaultValue={table.quantity} onChange={handleChangeQuantity} id="standard-basic" label="" variant="standard" /></CTableDataCell>
                                                                        <CTableDataCell>
                                                                            <IoSave style={{ fontSize: "28px", color: "blue", cursor: "pointer" }} onClick={() => [saveData(table.size, table.color, table.quantity)]} >Save</IoSave>
                                                                        </CTableDataCell>
                                                                    </CTableRow>
                                                                </>
                                                            )
                                                        })
                                                    }

                                                    {TableAll.length > 0 &&
                                                        TableAll.map((table) => {
                                                            return (
                                                                <>
                                                                    <CTableRow color="light">
                                                                        <CTableDataCell>
                                                                            {table.size}
                                                                        </CTableDataCell>
                                                                        <CTableDataCell><spam className='p-2 px-3 rounded-full' style={{ background: table.color }}>{"  "}</spam></CTableDataCell>
                                                                        <CTableDataCell>
                                                                            {table.quantity}
                                                                        </CTableDataCell>
                                                                        <CTableDataCell className='flex'>
                                                                            {/* <div className='flex justify-center items-center'> */}
                                                                            <MdEditSquare style={{ fontSize: "28px", color: "black", cursor: "pointer" }} onClick={() => [editSizes(table), setNewRow(false)]}>Edit</MdEditSquare>
                                                                            <RiDeleteBin5Fill className='ms-3' style={{ fontSize: "28px", color: "red", cursor: "pointer" }} onClick={() => deleteSizes(table.id, table.size)} >Delete</RiDeleteBin5Fill>
                                                                            {/* </div> */}
                                                                        </CTableDataCell>
                                                                    </CTableRow>
                                                                </>
                                                            )
                                                        })
                                                    }
                                                    {/* if edit is not enable then it will show  */}
                                                    {editTableSize.length === 0 && firstSize &&
                                                        <CTableRow>
                                                            <CTableDataCell>{firstSize}</CTableDataCell>
                                                            <CTableDataCell><input type='color' value={color} onChange={handleChangeColor} /></CTableDataCell>
                                                            <CTableDataCell> <TextField style={{ width: "60px", display: "flex", justifyContent: "center" }} inputProps={{ min: 0 }} type='number' value={quantity} onChange={handleChangeQuantity} id="standard-basic" label="" variant="standard" /></CTableDataCell>
                                                            <CTableDataCell>
                                                                <IoSave style={{ fontSize: "28px", color: "blue", cursor: "pointer" }} onClick={() => saveData(firstSize)} >Save</IoSave>
                                                            </CTableDataCell>
                                                        </CTableRow>
                                                    }
                                                    {/* if edit is enable then it will show  */}
                                                    {firstSize && editTableSize.length > 0 &&
                                                        <CTableRow>
                                                            <CTableDataCell>{firstSize}</CTableDataCell>
                                                            <CTableDataCell><input type='color' disabled onChange={handleChangeColor} /></CTableDataCell>
                                                            <CTableDataCell> <TextField style={{ width: "60px", display: "flex", justifyContent: "center" }} disabled type='number' defaultValue={table.quantity} onChange={handleChangeQuantity} id="standard-basic" label="" variant="standard" /></CTableDataCell>
                                                            <CTableDataCell>
                                                                <IoSave style={{ fontSize: "28px", color: "black", opacity: "0.5", cursor: "pointer" }} disabled color='success' >Save</IoSave>
                                                            </CTableDataCell>
                                                        </CTableRow>
                                                    }
                                                    {otherSize &&
                                                        otherSize.map((sizes) => {
                                                            return (
                                                                <>
                                                                    <CTableRow>
                                                                        <CTableDataCell>
                                                                            {sizes}
                                                                        </CTableDataCell>
                                                                        <CTableDataCell><input type='color' disabled style={{ opacity: "0.5" }} /></CTableDataCell>
                                                                        <CTableDataCell> <TextField style={{ width: "60px", display: "flex", justifyContent: "center", boxShadow: "none", textAlign: "center" }} disabled type='number' defaultValue={0} onChange={e => setQuantity(e.target.value)} className="standard-basic2" label="" variant="standard" /></CTableDataCell>
                                                                        <CTableDataCell>
                                                                            <IoSave style={{ fontSize: "28px", color: "black", opacity: "0.5" }} disabled >Save</IoSave>
                                                                        </CTableDataCell>
                                                                    </CTableRow>
                                                                </>
                                                            )
                                                        })
                                                    }
                                                    {newRow &&
                                                        <CTableRow>
                                                            <CTableDataCell>
                                                                <FormControl variant="standard" sx={{ m: 0 }}>
                                                                    <Select
                                                                        id="demo-simple-select-standard"
                                                                        value={sizeselect}
                                                                        onChange={handleChangeSelectSize}
                                                                        displayEmpty
                                                                        style={{ padding: "0px", width: "65px" }}
                                                                        inputProps={{ 'aria-label': 'Without label' }}
                                                                    >
                                                                        <MenuItem value="">
                                                                            <em>Sizes</em>
                                                                        </MenuItem>
                                                                        {getSizeData && getSizeData.map((name) => (
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
                                                            </CTableDataCell>
                                                            <CTableDataCell>
                                                                <FormControl variant="standard" sx={{ m: 0 }}>
                                                                    <input type='color' value={color} onChange={handleChangeColor} />
                                                                </FormControl>
                                                            </CTableDataCell>
                                                            <CTableDataCell>
                                                                <FormControl variant="standard" sx={{ m: 0 }}>
                                                                    <TextField id="standard-basic" inputProps={{ min: 0 }} variant="standard" style={{ width: "60px", display: "flex", justifyContent: "center" }} type='number' value={quantity} onChange={handleChangeQuantity} size='sm' />
                                                                </FormControl>
                                                            </CTableDataCell>
                                                            <CTableDataCell className='flex' >
                                                                <IoSave style={{ fontSize: "28px", color: "blue", cursor: "pointer" }} onClick={() => saveDataRow()} >Save</IoSave>
                                                                <RiDeleteBin5Fill className='ms-3' style={{ fontSize: "28px", color: "red", cursor: "pointer" }} onClick={() => setNewRow(false)} >Delete</RiDeleteBin5Fill>
                                                            </CTableDataCell>
                                                        </CTableRow>
                                                    }
                                                </CTableBody>
                                            </CTable>

                                            {TableAll.length > 0 && !firstSize &&
                                                <div className="sm:col-span-12">
                                                    <Button variant="outlined" className='' disabled={newRow} color='primary' onClick={() => setNewRow(true)} >Add New Row</Button>
                                                </div>
                                            }
                                        </div>
                                    }
                                    {thumbnail?.length === 0 &&
                                        <div className="sm:col-span-6">
                                            <label htmlFor="uploadimg" style={{ minHeight: "52px", display: "flex", alignItems: "center", fontWeight: "bold", borderColor: thumbnailerr && "red", color: thumbnailerr && "red", opacity: thumbnailerr ? 0.6 : 0.4 }} className=" btn-img d-flex-align-items-center justify-content-center btn btn-outline-secondary col-12">Upload Product Thumbnail</label>
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
                                            {(thumbnailerr) && (
                                                <p className='-mt-5' style={{ color: "red", opacity: "0.8", fontSize: "12px", marginLeft: "15px" }}>
                                                    {thumbnailerr}
                                                </p>
                                            )}
                                        </div>}
                                    {thumbnail?.length > 0 &&
                                        <>
                                            <p className=' sm:col-span-12 pt-3 flex justify-center text-2xl font-bold bg-[#f0f0f0]' >Thumbnail </p>
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
                                        </>
                                    }

                                    {images?.length === 0 &&
                                        <div className="sm:col-span-6">
                                            <label htmlFor="uploadimg2" style={{ minHeight: "52px", display: "flex", alignItems: "center", borderColor: (imglenerr || imgerr) && "red", color: (imglenerr || imgerr) && "red", fontWeight: "bold", opacity: (imglenerr || imgerr) ? 0.6 : 0.4 }} className=" btn-img d-flex-align-items-center justify-content-center btn btn-outline-secondary col-12">Upload Product Images</label>
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
                                                <p className='-mt-5' style={{ color: "red", opacity: "0.8", fontSize: "12px", marginLeft: "15px" }}>
                                                    {imgerr || imglenerr}
                                                </p>
                                            )}
                                        </div>}
                                    {images?.length > 0 &&
                                        <>
                                            <p className='-mt-4 sm:col-span-12 pt-3 flex justify-center text-2xl font-bold bg-[#f0f0f0]' >Product Images </p>
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
                                        </>
                                    }
                                    <div className="sm:col-span-6">
                                        <FormControl fullWidth sx={{ m: 0 }} size="large" >
                                            <TextField
                                                error={errors && errors.price?.message}
                                                id="standard-error-helper-text"
                                                label="Price"
                                                inputProps={{ min: 0 }}
                                                type='number'
                                                {...register("price")}
                                                helperText={errors && errors.price?.message}
                                                variant="outlined"
                                            />
                                        </FormControl>
                                    </div>
                                    <div className="sm:col-span-6">
                                        <FormControl fullWidth sx={{ m: 0 }} size="large" >
                                            <TextField
                                                error={errors && errors.discountPercentage?.message}
                                                id="standard-error-helper-text"
                                                label="Discount percentage"
                                                type='number'
                                                inputProps={{ min: 0, max: 90 }}
                                                {...register("discountPercentage")}
                                                helperText={errors && errors.discountPercentage?.message}
                                                variant="outlined"
                                            />
                                        </FormControl>
                                    </div>
                                    <div className="sm:col-span-12">
                                        <FormControl fullWidth sx={{ m: 0 }} size="large" >
                                            <TextField
                                                error={errors && errors.description?.message}
                                                id="standard-error-helper-text"
                                                label="Description"
                                                placeholder='Description'
                                                type='text'
                                                InputProps={{
                                                    inputComponent: TextareaAutosize,
                                                    inputProps: {
                                                        style: {
                                                            resize: "auto",
                                                            minHeight: "100px",

                                                        }
                                                    }
                                                }}
                                                {...register("description")}
                                                helperText={errors && errors.description?.message}
                                                variant="outlined"
                                            />
                                        </FormControl>
                                    </div>
                                </div>
                            </div>
                            <div className='flex justify-between'>
                                <Button type='reset' color="error" onClick={() => [
                                    clearErrors(),
                                    onReset(),
                                ]} variant="contained">Cancel</Button>
                                <Button type='submit' onClick={validation} color="success" variant="contained">
                                    {createProductPending ?
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
                                        "Add Product"
                                    }
                                </Button>
                            </div>
                        </form>
                    </Typography>
                </Box>
            </Modal>
        </div>
    );
}

