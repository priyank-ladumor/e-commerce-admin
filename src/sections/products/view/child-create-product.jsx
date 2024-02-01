// /* eslint-disable spaced-comment */
// /* eslint-disable react-hooks/exhaustive-deps */
// /* eslint-disable new-cap */
// /* eslint-disable no-plusplus */
// /* eslint-disable prefer-const */
// /* eslint-disable react/jsx-no-duplicate-props */
// /* eslint-disable no-lonely-if */
// /* eslint-disable no-empty */
// /* eslint-disable no-restricted-syntax */
// /* eslint-disable no-shadow */
// /* eslint-disable no-undef */
// /* eslint-disable no-unused-vars */
// /* eslint-disable react/jsx-no-useless-fragment */
// /* eslint-disable arrow-body-style */
// /* eslint-disable react/prop-types */
// /* eslint-disable perfectionist/sort-imports */
// /* eslint-disable react/jsx-fragments */
// import * as React from 'react';
// import { useState } from "react"
// import Box from '@mui/material/Box';
// import Modal from '@mui/material/Modal';
// import Button from '@mui/material/Button';
// // import { SketchPicker } from 'react-color'

// const style = {
//   position: 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   bgcolor: 'background.paper',
//   border: '2px solid #000',
//   boxShadow: 24,
//   p: 3,
// };

// export default function SizesTableModal({ selectedNames, setSize, sizeColorQuantity }) {
//   const [open, setOpen] = React.useState(false);

//   const handleOpen = () => {
//     setOpen(true);
//   };
//   const handleClose = () => {
//     setOpen(false);
//   };

//   const table = []
//   const [color, setColor] = useState(0)
//   const [quantity, setQuantity] = React.useState(0);
//   const [otherSize, setotherSize] = React.useState([]);
//   const [TableAll, setTableAll] = useState([])
//   const [firstSize, setfirstSize] = useState()
//   const [editTableSize, setEditTableSize] = useState([])

//   // for first save input and other disable sizes input array separates 
//   React.useEffect(() => {
//     if (selectedNames?.length > 0) {
//       setfirstSize(selectedNames[0])
//     }
//     if (firstSize) {
//       const copyWithoutFirstElement = selectedNames.slice(1);
//       setotherSize(copyWithoutFirstElement)
//       if (firstSize === otherSize[0]) {
//         const copyWithoutFirstElement = otherSize.slice(1);
//         setotherSize(copyWithoutFirstElement)
//       }
//     }
//   }, [selectedNames, firstSize])

//   //for getting table all data bcz reload/state remove it
//   React.useEffect(() => {
//     if (sizeColorQuantity) {
//       if (TableAll.length === 0) {
//         setTableAll(sizeColorQuantity)
//       }
//     }
//   }, [sizeColorQuantity])

//   const saveData = (sizes, clr, quant) => {

//     const id = Math.floor(Math.random() * 100)

//     //create single table input array
//     if (editTableSize && quant && quantity === 0) {
//       const filterTable = table.filter((tbl) => tbl.size === sizes)
//       if (table.length === 0) {
//         table.push({ "size": sizes, "quantity": quant, "color": color, "id": id })
//       } else {
//         if (filterTable.length === 0) {
//           table.push({ "size": sizes, "quantity": quant, "color": color, "id": id })
//         }
//       }
//     }else if (editTableSize && clr && color === 0) {
//       const filterTable = table.filter((tbl) => tbl.size === sizes)
//       if (table.length === 0) {
//         table.push({ "size": sizes, "quantity": quantity, "color": clr, "id": id })
//       } else {
//         if (filterTable.length === 0) {
//           table.push({ "size": sizes, "quantity": quantity, "color": clr, "id": id })
//         }
//       }
//     }
//     else {
//       const filterTable = table.filter((tbl) => tbl.size === sizes)
//       if (table.length === 0) {
//         table.push({ "size": sizes, "quantity": quantity, "color": color, "id": id })
//       } else {
//         if (filterTable.length === 0) {
//           table.push({ "size": sizes, "quantity": quantity, "color": color, "id": id })
//         }
//       }
//     }

//     // create all table data input array
//     const filterTable2 = TableAll.filter((tbl) => tbl.size === sizes)
//     if (TableAll.length === 0) {
//       TableAll.push({ "size": sizes, "quantity": quantity, "color": color, "id": id })
//     } else {
//       if (filterTable2.length === 0) {
//         TableAll.push({ "size": sizes, "quantity": quantity, "color": color, "id": id })
//       }
//     }
//     if (TableAll.length === 0) {
//       setTableAll(table)
//     }
//     //after save first input default quantity set 0
 

//     //for removing the already filled size input
//     for (let i = 0; i < selectedNames.length; i++) {
//       if (selectedNames[i] === sizes) {
//         selectedNames.splice(i, 1);
//       }
//     }
//     // for first save input and other disable sizes input array separates 
//     setfirstSize(selectedNames[0])

//     //for tranfering the data of child to parent product form
//     if (TableAll.length > 0) {
//       setSize(TableAll)
//     }

//     //edited data set empty array because after edited input we have to remove it showing 
//     setEditTableSize([])
//     console.log(TableAll,"TableAll");
//   }

//   const deleteSizes = (id, size) => {
//     const removedSizes = TableAll.filter((ele) => ele.id !== id);
//     setTableAll(removedSizes);
//     setSize(TableAll)
//     if (removedSizes) {
//       setSize(TableAll)
//     }
//     if (removedSizes.length === 0) {
//       setSize([])
//     }
//   }

//   const editSizes = (tableEdit) => {
//     setEditTableSize([{
//       size: tableEdit.size,
//       color: tableEdit.color,
//       quantity: tableEdit.quantity,
//     }])
//     setQuantity(tableEdit.quantity)
//     setColor(tableEdit.color)

//     const removedSizes = TableAll.filter((ele) => ele.id !== tableEdit.id);
//     setTableAll(removedSizes);
//   }

//   //for tranfering the data of child to parent product form
//   React.useEffect(() => {
//     if (TableAll.length > 0) {
//       setSize(TableAll)
//     }
//   }, [TableAll, table])

//   return (
//     <div>
//       <Button onClick={handleOpen} variant="outlined" fullWidth size='large' className='mt-1'>Add Colors And Quantity</Button>
//       <Modal
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="parent-modal-title"
//         aria-describedby="parent-modal-description"
//       >
//         <Box sx={{ ...style, maxWidth: "600px", overflowX: "auto" }} className="style_modal2">
//           <p className='text-2xl font-bold mb-6 flex justify-center' >Add Colors And Quantity Table</p>
//           <table style={{ width: "100%" }}>
//             <thead>
//               <tr>
//                 <th>Sizes</th>
//                 <th>Colors</th>
//                 <th>Quantity</th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {editTableSize.length > 0 &&
//                 editTableSize.map((table) => {
//                   return (
//                     <>
//                       <tr>
//                         <td>{table.size}</td>
//                         <td><input type='color' defaultValue={table.color} onChange={e => setColor(e.target.value)} /></td>
//                         <td> <input type='number' min={0} defaultValue={table.quantity} onChange={e => setQuantity(e.target.value)} /></td>
//                         <td>
//                           <Button variant="contained" color='success' onClick={() => [saveData(table.size, table.color, table.quantity), setSize(TableAll)]} >Save</Button>
//                         </td>
//                       </tr>
//                     </>
//                   )
//                 })
//               }

//               {TableAll.length > 0 &&
//                 TableAll.map((table) => {
//                   return (
//                     <>
//                       <tr>
//                         <td>
//                           {table.size}
//                         </td>
//                         <td><spam className='p-2 px-3 rounded-full' style={{ background: table.color }}>{"  "}</spam></td>
//                         <td>
//                           {table.quantity}
//                         </td>
//                         <td className='flex justify-between' >
//                           <Button variant="contained" color='info' onClick={() => [editSizes(table)]}>Edit</Button>
//                           <Button variant="contained" color='error' onClick={() => deleteSizes(table.id, table.size)} >Delete</Button>
//                         </td>
//                       </tr>
//                     </>
//                   )
//                 })
//               }
//               {firstSize && editTableSize.length === 0 &&
//                 <tr>
//                   <td>{firstSize}</td>
//                   <td><input type='color' onChange={e => setColor(e.target.value)} /></td>
//                   <td> <input type='number' min={0} defaultValue={0} onChange={e => setQuantity(e.target.value)} /></td>
//                   <td>
//                     <Button variant="contained" color='success' onClick={() => [saveData(firstSize), setSize(TableAll)]} >Save</Button>
//                   </td>
//                 </tr>
//               }
//               {firstSize && editTableSize.length > 0 &&
//                 <tr>
//                   <td>{firstSize}</td>
//                   <td><input type='color' disabled onChange={e => setColor(e.target.value)} /></td>
//                   <td> <input type='number' disabled min={0} defaultValue={0} onChange={e => setQuantity(e.target.value)} /></td>
//                   <td>
//                     <Button variant="contained" disabled color='success' onClick={() => [saveData(firstSize), setSize(TableAll)]} >Save</Button>
//                   </td>
//                 </tr>
//               }
//               {otherSize &&
//                 otherSize.map((sizes) => {
//                   return (
//                     <>
//                       <tr>
//                         <td>
//                           {sizes}
//                         </td>
//                         <td><input type='color' disabled style={{ opacity: "0.5" }} /></td>
//                         <td>
//                           <input type='number' min={0} defaultValue={0} disabled />
//                         </td>
//                         <td>
//                           <Button variant="contained" color='success' disabled onClick={() => saveData(sizes)}>Save</Button>
//                         </td>
//                       </tr>
//                     </>
//                   )
//                 })
//               }
//             </tbody>
//           </table>
//           <Button variant="contained" className='mt-3' color='success' onClick={() => lockSize()} >Add New Row</Button>
//         </Box>
//       </Modal>
//     </div>
//   );
// }



// // function ColorModal({ color }) {
// //   const [open, setOpen] = React.useState(false);
// //   const handleOpen = () => {
// //     setOpen(true);
// //   };
// //   const handleClose = () => {
// //     setOpen(false);
// //   };
// //   const saveColor = (clr) => {
// //     color = clr.hex;
// //   }
// //   return (
// //     <React.Fragment>
// //       <Button onClick={handleOpen}>Add Color</Button>
// //       <Modal
// //         open={open}
// //         onClose={handleClose}
// //         aria-labelledby="child-modal-title"
// //         aria-describedby="child-modal-description"
// //       >
// //         <Box sx={{ ...style, width: 280 }}>
// //           <h2 className='flex text-lg font-semibold'>Selected Color: <spam className='p-3 rounded-full ml-2' style={{ background: color }}>{"   "}</spam></h2>
// //           <SketchPicker className='mt-3' onChange={(clr) => saveColor(clr)} />

// //           <div className='mt-3 flex justify-between'>
// //             <Button onClick={handleClose}>Close</Button>
// //             <Button variant="contained" color='success' onClick={() => handleClose()}>Save</Button>
// //           </div>
// //         </Box>
// //       </Modal>
// //     </React.Fragment>
// //   );
// // }