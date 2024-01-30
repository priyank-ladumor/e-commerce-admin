/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
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
import { useState } from "react"

import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
// import { useNavigate } from 'react-router-dom';
// eslint-disable-next-line perfectionist/sort-imports
// import { useDispatch } from 'react-redux';
import ListSubheader from '@mui/material/ListSubheader';

import { useTheme } from '@mui/material/styles';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import { SketchPicker } from 'react-color'
import { IoIosColorPalette } from "react-icons/io";


import {
    OutlinedInput,
    InputLabel,
    MenuItem,
    Select,
} from "@mui/material";

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

export const ChildProductModal = () => {
    const [selectedNames, setSelectedNames] = useState([]);
    const [clropen, setclropen] = useState(false)

    const [color, setColor] = useState([])
    console.log(color, "color");

    const theme = useTheme();
    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        console.log(value, "value");
        setSelectedNames(
            typeof value === 'string' ? value.split(',') : value
        );
    };

    return (
        <div>
            <form>
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-12">
                    <div className=" sm:col-span-4">
                        <FormControl fullWidth sx={{ m: 0 }} size="large" className='text-lg text-700 mt-3' >
                            {!clropen ?
                                <div className='flex float-start'>
                                    <label htmlFor="favcolor " onClick={() => setclropen(!clropen)} className='mb-3 font-semibold cursor-pointer text-lg text-700 flex justify-center items-center float-start' >Select Color
                                        <IoIosColorPalette className='text-[28px] font-bold mr-1' type='button' />:
                                    </label>
                                    <p className=' text-black-700 p-3 h-10 ml-1 -mt-1 rounded-full' style={{ color: color[0], background: color[0] }} >{". "}</p>
                                </div>
                                :
                                <div className='flex float-start'>
                                    <label htmlFor="favcolor " onClick={() => setclropen(!clropen)} className='mb-3 font-semibold cursor-pointer text-lg text-700 flex justify-center items-center float-start' >Close
                                        <IoIosColorPalette className='text-[28px] font-bold mr-1' type='button' />:
                                    </label>
                                    <p className=' text-black-700 p-3 h-10 ml-1 -mt-1 rounded-full' style={{ color: color[0], background: color[0] }} >{". "}</p>
                                </div>
                            }
                            {clropen && <SketchPicker className='mt-3' onChange={(color) => setColor([color.hex])} />}
                        </FormControl>
                    </div>
                    <div className="sm:col-span-4">
                        <FormControl sx={{ m: 0, width: "100%" }}>
                            <InputLabel id="demo-multiple-name-label">Sizes</InputLabel>
                            <Select
                                labelId="demo-multiple-name-label"
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

                    <div className=" sm:col-span-4">
                        <FormControl fullWidth sx={{ m: 0 }} size="large" >
                            <TextField
                                // error={errors && errors.email?.message}
                                id="standard-error-helper-text"
                                label="Quantity"
                                type='number'
                                // {...register("email")}
                                // helperText={errors && errors.email?.message}
                                variant="outlined"
                            />
                        </FormControl>
                    </div>
                </div>
            </form>
        </div>
    )
}





