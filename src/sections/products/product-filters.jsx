/* eslint-disable no-unneeded-ternary */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable arrow-body-style */
/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable perfectionist/sort-imports */
/* eslint-disable import/no-unresolved */
import PropTypes from 'prop-types';
import * as React from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Radio from '@mui/material/Radio';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
// import Checkbox from '@mui/material/Checkbox';
// import FormGroup from '@mui/material/FormGroup';
import RadioGroup from '@mui/material/RadioGroup';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import { CompactPicker } from 'react-color'
import Slider from '@mui/material/Slider';
import TextField from '@mui/material/TextField';


// import { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { getTopLvlCategoriesAction } from 'src/store/action/categoriesAction';

// ----------------------------------------------------------------------



// ----------------------------------------------------------------------

export default function ProductFilters({ openFilter, onOpenFilter, onCloseFilter, gettoplvl, settopCategory, topCategory,
  getsecondlvl, setsecondCategory, secondCategory, parentId, setparentId, setcolor, color, setmaxPrice, setminPrice
}) {

  const renderGender = (
    <Stack spacing={1}>
      <FormControl>
        <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          name="radio-buttons-group"
          value={topCategory}
          onChange={e => [settopCategory(e.target.value), setsecondCategory("")]}
        >
          {
            gettoplvl?.length > 0 && gettoplvl.map((ele) =>
              <FormControlLabel value={ele.name} control={<Radio />} onClick={() => setparentId(ele._id)} label={ele.name.charAt(0).toUpperCase() + ele.name.slice(1)} />
            )
          }
        </RadioGroup>
      </FormControl>
    </Stack>
  );


  const renderCategory = (
    parentId &&
    <Stack spacing={1}>
      <FormControl>
        <FormLabel id="demo-radio-buttons-group-label">Category</FormLabel>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          name="radio-buttons-group"
          value={secondCategory}
          onChange={e => setsecondCategory(e.target.value)}
        >
          {
            getsecondlvl?.length > 0 && getsecondlvl.map((ele) => {
              return (
                <FormControlLabel value={ele.name} control={<Radio />} label={ele.name.includes("kids_") ? ele.name.split("kids_")[1].charAt(0).toUpperCase() + ele.name.split("kids_")[1].slice(1) : ele.name.split("men_" && "_")[1].charAt(0).toUpperCase() + ele.name.split("men_" && "_")[1].slice(1)} />
              )
            }
            )
          }
        </RadioGroup>
      </FormControl>
    </Stack>
  );

  const renderColors = (
    <Stack spacing={1}>
      <FormLabel id="demo-radio-buttons-group-label">Colors</FormLabel>
      <CompactPicker color={color} onChange={(clr) => setcolor(clr.hex)} />
    </Stack>
  );

  const [MIN, SetMIN] = React.useState(0)
  const [MAX, SetMAX] = React.useState(10000)
  const [price, setprice] = React.useState([MIN, MAX])
  const marks = [
    {
      value: MIN,
      label: '',
    },
    {
      value: MAX,
      label: '',
    },
  ];

  const handleChange = (_, newValue) => {
    setprice(newValue);
    SetMIN(newValue[0]);
    SetMAX(newValue[1]);
    setminPrice(newValue[0])
    setmaxPrice(newValue[1])
  };

  React.useEffect(() => {
    setprice([MIN, MAX])
  }, [MIN, MAX])


  const handlecngMIN = (e) => {
    setminPrice(e.target.value.trim())
    SetMIN(e.target.value.trim())
    setprice([MIN, MAX])
  }
  const handlecngMAX = (e) => {
    setmaxPrice(e.target.value.trim())
    SetMAX(e.target.value.trim())
    setprice([MIN, MAX])
  }
  const renderPrice = (
    <Stack spacing={1}>
      <FormLabel id="demo-radio-buttons-group-label">Price</FormLabel>
      <Box sx={{ width: 240 }}>
        <Slider
          marks={marks}
          step={10}
          value={price}
          valueLabelDisplay="auto"
          min={0}
          max={MAX > 10000 ? MAX : 10000}
          onChange={handleChange}
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <div className='flex items-center'>
            <TextField className='mb-2 me-2' inputProps={{ min: 0 }}
              type='number' onChange={e => handlecngMIN(e)} label="Min" value={MIN} style={{ width: "50px", display: "flex", justifyContent: "center", textAlign: "center" }} id="standard-basic" variant="standard" />
          </div>
          <div className='flex items-center'>
            <TextField className='mb-2 me-2' inputProps={{ min: 10 }}
              type='number' onChange={e => handlecngMAX(e)} value={MAX} style={{ width: "50px", display: "flex", justifyContent: "center", textAlign: "center" }} id="standard-basic" label="Max" variant="standard" />
          </div>
        </Box>
      </Box>
    </Stack>
  );

  const renderRating = (
    <Stack spacing={1}>
      <FormLabel id="demo-radio-buttons-group-label">Size</FormLabel>

    </Stack>
  );

  return (
    <>
      <Button
        disableRipple
        color="inherit"
        endIcon={<Iconify icon="ic:round-filter-list" />}
        onClick={onOpenFilter}
      >
        Filters&nbsp;
      </Button>

      <Drawer
        anchor="right"
        open={openFilter}
        onClose={onCloseFilter}
        PaperProps={{
          sx: { width: 280, border: 'none', overflow: 'hidden' },
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ px: 1, py: 2 }}
        >
          <Typography variant="h6" sx={{ ml: 1 }}>
            Filters
          </Typography>
          <IconButton onClick={onCloseFilter}>
            <Iconify icon="eva:close-fill" />
          </IconButton>
        </Stack>

        <Divider />

        <Scrollbar>
          <Stack spacing={3} sx={{ p: 2 }}>
            {renderGender}

            {renderCategory}

            {renderColors}

            {renderPrice}

            {renderRating}
          </Stack>
        </Scrollbar>

        <Box sx={{ p: 3 }}>
          <Button
            fullWidth
            size="large"
            type="submit"
            color="inherit"
            variant="outlined"
            onClick={() => [setparentId(""), settopCategory(""), setsecondCategory(""), setcolor(""), setprice([0, 10000]), SetMIN(0), SetMAX(10000),
            setmaxPrice(""), setminPrice("")]}
            startIcon={<Iconify icon="ic:round-clear-all" />}
          >
            Clear All
          </Button>
        </Box>
      </Drawer>
    </>
  );
}

ProductFilters.propTypes = {
  openFilter: PropTypes.bool,
  onOpenFilter: PropTypes.func,
  onCloseFilter: PropTypes.func,
};
