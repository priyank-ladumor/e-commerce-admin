
/* eslint-disable import/no-extraneous-dependencies */
import * as React from 'react';
import { IoClose } from "react-icons/io5";

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';



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
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

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
                    <Typography id="modal-modal-description" sx={{ mt: 6 }}>
                        vrg
                    </Typography>
                </Box>
            </Modal>
        </div>
    );
}



