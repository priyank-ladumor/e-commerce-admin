/* eslint-disable import/no-extraneous-dependencies */
// eslint-disable-next-line perfectionist/sort-imports
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
/* eslint-disable import/no-unresolved */
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Drawer from '@mui/material/Drawer';
import Avatar from '@mui/material/Avatar';
import { alpha } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import ListItemButton from '@mui/material/ListItemButton';

import { usePathname } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { useResponsive } from 'src/hooks/use-responsive';

import Logo from 'src/components/logo';
import Scrollbar from 'src/components/scrollbar';

import { NAV } from './config-layout';
import navConfig from './config-navigation';
// eslint-disable-next-line perfectionist/sort-imports, import/extensions
import { adminLoginData } from "../../store/action/authAction.js"
// ----------------------------------------------------------------------


// sidemenu 
// sidemenu 
// sidemenu 
// sidemenu 
// sidemenu 
// sidemenu 

export default function Nav({ openNav, onCloseNav }) {
  const pathname = usePathname();
  const upLg = useResponsive('up', 'lg');

  const dispatch = useDispatch()
  const { adminLoginDatas } = useSelector((state) => state.auth)
  const auth = localStorage.getItem("token")

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

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderAccount = (
    <Box
      sx={{
        my: 3,
        mx: 2.5,
        py: 2,
        px: 2.5,
        display: 'flex',
        borderRadius: 1.5,
        alignItems: 'center',
        bgcolor: (theme) => alpha(theme.palette.grey[500], 0.12),
      }}
    >
      {/* admin pic and name for sidebar */}
      {adminData &&
        <Avatar
          src={adminData?.photoURL}
          alt={adminData.firstName}
          sx={{
            width: 36,
            height: 36,
            border: (theme) => `solid 2px ${theme.palette.background.default}`,
          }}
        >
          {adminData.firstName.charAt(0).toUpperCase()}
          {adminData.lastName.charAt(0).toUpperCase()}
        </Avatar>}
      <Box sx={{ ml: 2 }}>
        {adminData &&
          <>
            <Typography variant="subtitle2">
              {adminData.firstName.charAt(0).toUpperCase() + adminData.firstName.slice(1)}
              {" "}
              {adminData.lastName.charAt(0).toUpperCase() + adminData.lastName.slice(1)}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {adminData.role}
            </Typography>
          </>}
      </Box>
      {/* admin pic and name  */}

    </Box>
  );

  // sidebar menu  list items
  const renderMenu = (
    <Stack component="nav" spacing={0.5} sx={{ px: 2 }}>
      {navConfig.map((item) => (
        <NavItem key={item.title} item={item} />
      ))}
    </Stack>
  );
  // sidebar menu  list items

  const renderContent = (
    auth &&
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': {
          height: 1,
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      {/* logo for admin panel and company name */}
      <NavLink to="/">
        <div className='flex items-center'>
          <Logo sx={{ mt: 3, ml: 4 }} />
          <p className='text-3xl font-semibold ms-3 -mb-4'>Shoppy.io</p>
        </div>
      </NavLink>
      {/* logo for admin panel */}

      {renderAccount}

      {renderMenu}

      <Box sx={{ flexGrow: 1 }} />

    </Scrollbar>
  );


  return (
    <Box
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV.WIDTH },
        background: "white",
        // boxShadow: "15px 0px 10px -15px #111",
        // boxShadow: "rgba(17, 17, 26, 0.1) 0px 0px 16px",
        boxShadow: "rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px",
        color: "black",
      }}
    >
      {upLg ? (
        <Box
          sx={{
            height: 1,
            position: 'fixed',
            width: NAV.WIDTH,
            // borderRight: (theme) => `dashed 1px ${theme.palette.divider}`,
          }}
        >
          {renderContent}
        </Box>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          PaperProps={{
            sx: {
              width: NAV.WIDTH,
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}

Nav.propTypes = {
  openNav: PropTypes.bool,
  onCloseNav: PropTypes.func,
};

// ----------------------------------------------------------------------

function NavItem({ item }) {
  const pathname = usePathname();

  const active = item.path === pathname;
  const auth = localStorage.getItem("token")

  return (
    auth &&
    <ListItemButton
      component={RouterLink}
      href={item.path}
      sx={{
        minHeight: 44,
        borderRadius: 0.75,
        typography: 'body2',
        color: 'text.secondary',
        textTransform: 'capitalize',
        fontWeight: 'fontWeightMedium',
        ...(active && {
          color: 'primary.main',
          fontWeight: 'fontWeightSemiBold',
          bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
          '&:hover': {
            bgcolor: (theme) => alpha(theme.palette.primary.main, 0.16),
          },
        }),
      }}
    >
      <Box component="span" sx={{ width: 24, height: 24, mr: 2 }}>
        {item.icon}
      </Box>

      <Box component="span">{item.title} </Box>
    </ListItemButton>
  );
}

NavItem.propTypes = {
  item: PropTypes.object,
};
