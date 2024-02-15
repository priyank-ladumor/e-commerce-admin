/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable perfectionist/sort-imports */
/* eslint-disable react/prop-types */
/* eslint-disable import/no-unresolved */
import PropTypes from 'prop-types';
import * as React from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { FaRupeeSign } from "react-icons/fa";

import Label from 'src/components/label';
import { ColorPreview } from 'src/components/color-utils';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProductAction } from 'src/store/action/productAction';
import Swal from 'sweetalert2';

// ----------------------------------------------------------------------

export default function ShopProductCard({ product, setdelProductPopUp, delProductPopUp }) {
  const dispatch = useDispatch()
  const { deleteProductMSG } = useSelector((state) => state.product)

  const renderStatus = (
    product && product.createdAt.split("T")[0] === new Date().toISOString().split("T")[0] &&
    <Label
      variant="filled"
      color='info'
      sx={{
        zIndex: 9,
        top: 16,
        right: 16,
        position: 'absolute',
        textTransform: 'uppercase',
      }}
    >
      new
    </Label>
  );

  React.useEffect(() => {
    if (delProductPopUp && deleteProductMSG) {
      <div className='swal2-container'>
        {Swal.fire({
          position: "top-end",
          icon: "success",
          title: deleteProductMSG,
          showConfirmButton: false,
          timer: 2500
        })}
      </div>
      setdelProductPopUp(false)
    }
  }, [deleteProductMSG])

  const renderDelProductIcon = (
    product &&
    <IconButton aria-label="delete" variant="filled"
      color='error'
      onClick={() => [dispatch(deleteProductAction(product._id)), setdelProductPopUp(!delProductPopUp)]}
      sx={{
        zIndex: 9,
        top: 6,
        background: "white",
        left: 6,
        position: 'absolute',
        textTransform: 'uppercase',
      }}
    >
      <DeleteIcon />
    </IconButton>
  );

  const renderImg = (
    product &&
    <Box
      component="img"
      alt={product?.title}
      src={product?.thumbnail[0]}
      sx={{
        top: 0,
        width: 1,
        height: 1,
        objectFit: 'cover',
        position: 'absolute',
      }}
    />
  );

  const renderPrice = (
    <Typography variant="subtitle1 flex">
      <Typography
        component="span"
        variant="body1"
        sx={{
          color: 'text.disabled',
          textDecoration: 'line-through',
        }}
      >
        {/* {product?.price && FaRupeeSign(product?.price)} */}
        <div className='flex items-center justify-center'>
          <FaRupeeSign style={{ fontSize: "16px" }} />{product?.price}
        </div>
      </Typography>
      &nbsp;
      {/* {fCurrency(product?.discountPrice)} */}
      <div className='flex  items-center justify-center'>
        <FaRupeeSign style={{ fontSize: "16px" }} />{product?.discountPrice}
      </div>
    </Typography>
  );

  const Pcolors = product && product.sizesAndColor.map((clr) => clr.color)
  const rmvSameClr = [...new Set(Pcolors)];
  return (
    <Card>
      <Box sx={{ pt: '100%', position: 'relative' }}>
        {renderStatus && renderStatus}
        {renderDelProductIcon}
        {renderImg}
      </Box>
      <Stack spacing={2} sx={{ p: 3 }}>
        <Link color="inherit" underline="hover" variant="subtitle2" noWrap>
          {product.title}
        </Link>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <ColorPreview colors={rmvSameClr} />
          {renderPrice}
        </Stack>
      </Stack>
    </Card>
  );
}

ShopProductCard.propTypes = {
  product: PropTypes.object,
};
