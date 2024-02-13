/* eslint-disable object-shorthand */
/* eslint-disable import/no-duplicates */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable perfectionist/sort-named-imports */
/* eslint-disable import/order */
/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
/* eslint-disable perfectionist/sort-imports */
/* eslint-disable import/no-unresolved */
import { useEffect, useState } from 'react';

import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import {
  MenuItem,
  Select,
} from "@mui/material";
import FormControl from '@mui/material/FormControl';
// import Button from '@mui/material/Button';
import ProductCard from '../product-card';
import ProductFilters from '../product-filters';
import ProductModal from './create-Product-model';
import { useDispatch, useSelector } from 'react-redux';
import { getFilterProductAction } from 'src/store/action/productAction';
import Pagination from '@mui/material/Pagination';
import { useSearchParams } from "react-router-dom";
import { useLocation } from 'react-router-dom';

// ----------------------------------------------------------------------

export default function ProductsView() {
  const dispatch = useDispatch()
  const location = useLocation()
  const [usesearch, setUsesearch] = useSearchParams()

  const locationPageNumber = +usesearch.get("pageNumber") === 0 ? (+usesearch.get("pageNumber") + 1) : +usesearch.get("pageNumber")
  const locationPageSize = +usesearch.get("pageSize") === 0 ? 12 : +usesearch.get("pageSize")
  const locationSort = usesearch.get("sort") === null ? "high_to_low" : usesearch.get("sort")

  const { getFilterProductDATA, createProductData } = useSelector((state) => state.product)
  const [openFilter, setOpenFilter] = useState(false);


  const [pageNumber, setpageNumber] = useState(locationPageNumber);
  const [pageSize, setpageSize] = useState(locationPageSize);
  const [sort, setsort] = useState(locationSort);

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  const [getProducts, setgetProducts] = useState()

  useEffect(() => {
    dispatch(getFilterProductAction(location.search))
  }, [createProductData, location.search])

  useEffect(() => {
    if (getFilterProductDATA) {
      setgetProducts(getFilterProductDATA)
    }
  }, [getFilterProductDATA])

  const handleChangePageNumber = (event, value) => {
    setpageNumber(value)
  }
  const handleChangePageSize = (event, value) => {
    setpageSize(event.target.value)
  }
  const handleChangeSort = (event, value) => {
    setsort(event.target.value)
  }

  useEffect(() => {
    setUsesearch({ pageSize, pageNumber, sort })
  }, [location.search, pageSize, pageNumber, sort])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [getProducts])
  console.log(usesearch);

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Products</Typography>

        {/* create product form modal  */}
        <ProductModal />
      </Stack>

      <Stack
        direction="row"
        alignItems="center"
        flexWrap="wrap-reverse"
        justifyContent="flex-end"
        sx={{ mb: 5 }}
      >
        <Stack direction="row" spacing={1} className='flex items-center' flexShrink={0} sx={{ my: 1 }}>

          {/* pagesize  */}
          <span className='hide2 font-semibold flex items-center'>Products per page:
            <FormControl variant="standard" className='ms-1' sx={{ m: 0 }}>
              <Select
                id="demo-simple-select-standard"
                value={pageSize}
                onChange={handleChangePageSize}
                displayEmpty
                style={{ padding: "0px", width: "45px" }}
                inputProps={{ 'aria-label': 'Without label' }}
              >
                <MenuItem value="12">
                  <em>12</em>
                </MenuItem>
                <MenuItem value="16">
                  <em>16</em>
                </MenuItem>
                <MenuItem value="20">
                  <em>20</em>
                </MenuItem>
                <MenuItem value="24">
                  <em>24</em>
                </MenuItem>
              </Select>
            </FormControl>
          </span>

          {/* sort  */}
          <span className=' font-semibold flex items-center'>Sort By:
            <FormControl variant="standard" className='ms-1' sx={{ m: 0 }}>
              <Select
                id="demo-simple-select-standard"
                value={sort}
                onChange={handleChangeSort}
                displayEmpty
                style={{ padding: "0px", width: "145px" }}
                inputProps={{ 'aria-label': 'Without label' }}
              >
                <MenuItem value="high_to_low">
                  <em>Price: High-Low</em>
                </MenuItem>
                <MenuItem value="low_to_high">
                  <em>Price: Low-High</em>
                </MenuItem>
              </Select>
            </FormControl>
          </span>

          {/* filter  */}
          <ProductFilters
            openFilter={openFilter}
            onOpenFilter={handleOpenFilter}
            onCloseFilter={handleCloseFilter}
          />

        </Stack>
      </Stack>

      <Grid container spacing={3} className="mb-5" >
        {getProducts && getProducts?.content.map((product) => (
          <Grid key={product.id} xs={12} sm={6} md={3}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>

      <Stack spacing={2} className='flex items-center justify-center mt-10' >
        <Pagination count={getProducts && getProducts?.totalPages} page={pageNumber} onChange={handleChangePageNumber} showFirstButton showLastButton />
      </Stack>
    </Container>
  );
}
