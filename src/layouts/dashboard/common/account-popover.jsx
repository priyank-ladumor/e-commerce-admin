/* eslint-disable no-shadow */
/* eslint-disable import/no-unresolved */
import { useState, useEffect } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useDispatch, useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Popover from '@mui/material/Popover';
import { alpha } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

// eslint-disable-next-line perfectionist/sort-imports
import { Logout } from 'src/store/slice/authSlice';
// eslint-disable-next-line perfectionist/sort-imports
import { useNavigate } from 'react-router-dom';
// eslint-disable-next-line perfectionist/sort-imports
import { adminLoginData } from 'src/store/action/authAction';

// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  // {
  //   label: 'Home',
  //   icon: 'eva:home-fill',
  // },
  // {
  //   label: 'Profile',
  //   icon: 'eva:person-fill',
  // },
  // {
  //   label: 'Settings',
  //   icon: 'eva:settings-2-fill',
  // },
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const { adminLogout, adminLoginDatas } = useSelector((state) => state.auth)

  const [open, setOpen] = useState(null);
  const navigate = useNavigate()
  const auth = localStorage.getItem("token")

  useEffect(() => {
    if (!auth && adminLogout === true) {
      navigate("/login")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [adminLogout, auth])

  const dispatch = useDispatch()
  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };
  const handleLogOut = () => {
    dispatch(Logout())
  }

  const [adminData, setAdminData] = useState()

  useEffect(() => {
    if (auth?.length > 0) {
      dispatch(adminLoginData())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth])

  useEffect(() => {
    if (adminLoginDatas) {
      setAdminData(adminLoginDatas)
    }
  }, [adminLoginDatas])

  return (
  
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          width: 40,
          height: 40,
          background: (theme) => alpha(theme.palette.grey[500], 0.08),
          ...(open && {
            background: (theme) =>
              `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
          }),
        }}
      >
        <Avatar
          src="https://res.cloudinary.com/dstojqsjz/image/upload/v1706514670/kdjq59glyogb1ped5d43.png"
          alt="admin url"
          sx={{
            width: 36,
            height: 36,
            border: (theme) => `solid 2px ${theme.palette.background.default}`,
          }}
        />
      </IconButton>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1,
            ml: 0.75,
            width: 200,
          },
        }}
      >
        {adminData
          && 
          <Box sx={{ my: 1.5, px: 2 }}>
            <Typography variant="subtitle2" noWrap>
              {adminData.firstName.charAt(0).toUpperCase() + adminData.firstName.slice(1)}
              {" "}
              {adminData.lastName.charAt(0).toUpperCase() + adminData.lastName.slice(1)}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
              {adminData.email}
            </Typography>
          </Box>}

        <Divider sx={{ borderStyle: 'dashed' }} />

        {MENU_OPTIONS.map((option) => (
          <MenuItem key={option.label} onClick={handleClose}>
            {option.label}
          </MenuItem>
        ))}

        <Divider sx={{ borderStyle: 'dashed', m: 0 }} />

        <MenuItem
          disableRipple
          disableTouchRipple
          onClick={handleLogOut}
          sx={{ typography: 'body2', color: 'error.main', py: 1.5, px: 9 }}
        >
          Logout
        </MenuItem>
      </Popover>
    </>
  );
}
