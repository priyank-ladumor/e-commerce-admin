/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable perfectionist/sort-named-imports */
/* eslint-disable perfectionist/sort-imports */
/* eslint-disable import/no-unresolved */
import PropTypes from 'prop-types';
import { forwardRef, useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';

import { RouterLink } from 'src/routes/components';
import { useDispatch, useSelector } from 'react-redux';
import { getLogoAction } from 'src/store/action/bannerLogoAction';

// ----------------------------------------------------------------------

const Logo = forwardRef(({ disabledLink = false, sx, ...other }, ref) => {
  const [getLogo, setgetLogo] = useState("")
  const dispatch = useDispatch()
  const { getLogoDATA, addLogoMSG } = useSelector((state) => state.bannerLogo)

  useEffect(() => {
    dispatch(getLogoAction())
  }, [addLogoMSG])

  useEffect(() => {
    if (getLogoDATA) {
      setgetLogo(getLogoDATA)
    }
  }, [getLogoDATA])

  const logo = (
    <Box
      ref={ref}
      component="div"
      sx={{
        width: 40,
        height: 40,
        display: 'inline-flex',
        ...sx,
      }}
      {...other}
    >
      <img
        className="h-15 w-12 rounded-xl"
        src={getLogo?.logo}
        alt="Your Company"
      />
    </Box>
  );

  if (disabledLink) {
    return logo;
  }

  return (
    <Link component={RouterLink} href="/" sx={{ display: 'contents' }}>
      {logo}
    </Link>
  );
});

Logo.propTypes = {
  disabledLink: PropTypes.bool,
  sx: PropTypes.object,
};

export default Logo;
