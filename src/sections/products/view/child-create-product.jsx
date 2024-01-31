/* eslint-disable no-plusplus */
/* eslint-disable prefer-const */
/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable no-lonely-if */
/* eslint-disable no-empty */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-shadow */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable arrow-body-style */
/* eslint-disable react/prop-types */
/* eslint-disable perfectionist/sort-imports */
/* eslint-disable react/jsx-fragments */
import * as React from 'react';
import { useState } from "react"
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { SketchPicker } from 'react-color'
import { FaEdit } from "react-icons/fa";

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


function ColorModal({ color }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const saveColor = (clr) => {
    color = clr.hex;
    console.log(color, "color");
  }
  return (
    <React.Fragment>
      <Button onClick={handleOpen}>Add Color</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 280 }}>
          <h2 className='flex text-lg font-semibold'>Selected Color: <spam className='p-3 rounded-full ml-2' style={{ background: color }}>{"   "}</spam></h2>
          <SketchPicker className='mt-3' onChange={(clr) => saveColor(clr)} />

          <div className='mt-3 flex justify-between'>
            <Button onClick={handleClose}>Close</Button>
            <Button variant="contained" color='success' onClick={() => handleClose()}>Save</Button>
          </div>
        </Box>
      </Modal>
    </React.Fragment>
  );
}

export default function SizesTableModal({ selectedNames }) {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const table = []
  // const [color, setColor] = useState("")
  let color;
  const [quantity, setQuantity] = React.useState(0);
  const [TableAll, setTableAll] = useState([])
  console.log(color, "color");

  const saveData = (sizes) => {
    const filterTable = table.filter((tbl) => tbl.size === sizes)
    if (table.length === 0) {
      table.push({ "size": sizes, "quantity": quantity, "color": color })
    } else {
      if (filterTable.length === 0) {
        table.push({ "size": sizes, "quantity": quantity, "color": color })
      }
    }

    const filterTable2 = TableAll.filter((tbl) => tbl.size === sizes)
    if (TableAll.length === 0) {
      TableAll.push({ "size": sizes, "quantity": quantity, "color": color })
    } else {
      if (filterTable2.length === 0) {
        TableAll.push({ "size": sizes, "quantity": quantity, "color": color })
      }
    }
    if (TableAll.length === 0) {
      setTableAll(table)
    }
    setQuantity(0)

    for (let i = 0; i < selectedNames.length; i++) {
      if (selectedNames[i] === sizes) {
        selectedNames.splice(i, 1);
        console.log(selectedNames, "selectedNames");
      }
    }
    console.log(TableAll, "TableAll");
  }
  console.log(TableAll, "TableAll");
  return (
    <div>
      <Button onClick={handleOpen} variant="outlined" fullWidth size='large' className='mt-1'>Add Colors And Quantity</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, maxWidth: "800px", overflowX: "auto" }} className="style_modal2">
          <table style={{ width: "100%" }}>
            <thead>
              <tr>
                <th>Sizes</th>
                <th>Colors</th>
                <th>Quantity</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {TableAll.length > 0 &&
                TableAll.map((table) => {
                  return (
                    <>
                      <tr>
                        <td>
                          {table.size}
                        </td>
                        <td>
                          <ColorModal selectedNames={selectedNames} color={color} />
                        </td>
                        <td>
                          {table.quantity}
                        </td>
                        <td>
                          {/* <FaEdit>edit</FaEdit> */}
                          {/* <Button variant="contained" color='success' onClick={() => saveData(sizes)} id={sizes} >Save</Button> */}
                        </td>
                      </tr>
                    </>
                  )
                })
              }
              {
                selectedNames.map((sizes) => {
                  return (
                    <>
                      <tr>
                        <td>
                          {sizes}
                        </td>
                        <td>
                          <ColorModal selectedNames={selectedNames} />
                        </td>
                        <td>
                          <input type='number' min={0} onClick={e => handleChanges(e, sizes)} defaultValue={0} onChange={e => setQuantity(e.target.value)} id={sizes} />
                        </td>
                        <td>
                          <FaEdit>edit</FaEdit>
                          <Button variant="contained" color='success' onClick={() => saveData(sizes)} id={sizes} >Save</Button>
                        </td>
                      </tr>
                    </>
                  )
                })
              }
            </tbody>
          </table>
        </Box>
      </Modal>
    </div>
  );
}
