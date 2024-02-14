/* eslint-disable use-isnan */
/* eslint-disable react/jsx-boolean-value */
/* eslint-disable no-nested-ternary */
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
import TextField from '@mui/material/TextField';

import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import {
  MenuItem,
  Select,
} from "@mui/material";
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import ProductCard from '../product-card';
import ProductFilters from '../product-filters';
import ProductModal from './create-Product-model';
import { useDispatch, useSelector } from 'react-redux';
import { getFilterProductAction } from 'src/store/action/productAction';
import Pagination from '@mui/material/Pagination';
import { useSearchParams } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { getSecondLvlCategoriesAction, getTopLvlCategoriesAction } from 'src/store/action/categoriesAction';
import { Bars } from 'react-loader-spinner'
import { getSizesAction } from 'src/store/action/sizeAction';

// ----------------------------------------------------------------------

export default function ProductsView() {
  const dispatch = useDispatch()
  const location = useLocation()
  const { getTopLvlCategoriesData, getSecondLvlCategoriesData } = useSelector((state) => state.categories)
  const { getSizesDATA } = useSelector((state) => state.size)
  const { getFilterProductDATA, createProductData, getFilterProductPENDING } = useSelector((state) => state.product)

  const [usesearch, setUsesearch] = useSearchParams()

  const locationPageNumber = +usesearch.get("pageNumber") === 0 ? (+usesearch.get("pageNumber") + 1) : +usesearch.get("pageNumber")
  const locationPageSize = +usesearch.get("pageSize") === 0 ? 12 : +usesearch.get("pageSize")
  const locationSort = usesearch.get("sort") === null ? "" : usesearch.get("sort")
  const locationColor = usesearch.get("color") === null ? "" : usesearch.get("color")
  const locationGender = usesearch.get("gender") === null ? "" : usesearch.get("gender")
  const locationAvailable = usesearch.get("available") === null ? "" : usesearch.get("available")
  const locationCategory = usesearch.get("category") === null ? "" : usesearch.get("category")
  const locationSearch = usesearch.get("search") === null ? "" : usesearch.get("search")
  const locationMaxPrice = +usesearch.get("maxPrice") === 0 ? "" : usesearch.get("maxPrice")
  const locationMinPrice = +usesearch.get("minPrice") === 0 ? "" : usesearch.get("minPrice")
  const locationMinDiscount = +usesearch.get("minDiscount") === 0 ? "" : usesearch.get("minDiscount")
  const locationSizes = (usesearch.get("sizes") === 0 || usesearch.get("sizes") === null) ? "" : usesearch.get("sizes")

  const [pageNumber, setpageNumber] = useState(locationPageNumber);
  const [pageSize, setpageSize] = useState(locationPageSize);
  const [sort, setsort] = useState(locationSort);
  const [sizes, setsizes] = useState(locationSizes);
  const [color, setcolor] = useState(locationColor);
  const [available, setavailable] = useState(locationAvailable);
  const [topCategory, settopCategory] = useState(locationGender)
  const [secondCategory, setsecondCategory] = useState(locationCategory)
  const [maxPrice, setmaxPrice] = useState(locationMaxPrice);
  const [minPrice, setminPrice] = useState(locationMinPrice);
  const [minDiscount, setminDiscount] = useState(locationMinDiscount);
  const [search, setSearch] = useState(locationSearch);

  const [gettoplvl, setgettoplvl] = useState("")
  const [getsizedata, setgetsizedata] = useState("")
  // for category find
  const [parentId, setparentId] = useState("")
  const [getsecondlvl, setgetsecondlvl] = useState("")

  useEffect(() => {
    dispatch(getTopLvlCategoriesAction())
  }, [])

  useEffect(() => {
    if (getTopLvlCategoriesData) {
      setgettoplvl(getTopLvlCategoriesData?.content)
    }
  }, [getTopLvlCategoriesData])

  useEffect(() => {
    // const query = `?pageNumber=0&pageSize=0`
    // const secondparentId = gettoplvl && gettoplvl.map((ele) => ele)
    const query = `?parentCategory=${parentId}`
    dispatch(getSecondLvlCategoriesAction(query))
  }, [parentId])

  useEffect(() => {
    if (getSecondLvlCategoriesData) {
      setgetsecondlvl(getSecondLvlCategoriesData?.content)
    }
  }, [getSecondLvlCategoriesData])

  useEffect(() => {
    dispatch(getSizesAction())
  }, [])

  useEffect(() => {
    if (getSizesDATA) {
      setgetsizedata(getSizesDATA)
    }
  }, [getSizesDATA])

  const [openFilter, setOpenFilter] = useState(false);

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  useEffect(() => {
    setUsesearch({ pageSize, pageNumber, sort, gender: topCategory, category: secondCategory, color, minPrice, maxPrice, sizes, available, minDiscount, search })
  }, [location.search, pageSize, pageNumber, sort, topCategory, secondCategory, color, minPrice, maxPrice, sizes, available, minDiscount, search])

  useEffect(() => {
    dispatch(getFilterProductAction(location.search))
  }, [createProductData, location.search])


  const [getProducts, setgetProducts] = useState()


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
    window.scrollTo(0, 0)
  }, [getProducts])

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Products</Typography>

        {/* create product form modal  */}
        <ProductModal />
      </Stack>
      <div className='block' >
        <div className='flex items-center float-start'>
          <TextField className='' onChange={e => [setSearch(e.target.value.trim().toLowerCase()), setpageNumber(1), setpageSize(12)]} value={search} placeholder='Search Products By Title' style={{ width: "200px", display: "flex", justifyContent: "center", textAlign: "center" }} type='text' id="standard-basic" label="" variant="standard" />
          {search.length > 0 && <Button className='ms-2' onClick={() => [setSearch(""), setpageNumber(1), setpageSize(12)]} type='button' color="error" variant="contained" size='small'>Clear</Button>}
        </div>
        <Stack
          direction="row"
          alignItems="center"
          flexWrap="wrap-reverse"
          justifyContent="flex-end"
          sx={{ mb: 5 }}
        >
          {/* <Stack direction="row" spacing={1} className='flex items-center' flexShrink={0} sx={{ my: 1 }}> */}

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
                  <MenuItem value="8">
                    <em>8</em>
                  </MenuItem>
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
            <span className=' font-semibold mx-3 flex items-center'>Sort By:
              <FormControl variant="standard" className='ms-1' sx={{ m: 0 }}>
                <Select
                  id="demo-simple-select-standard"
                  value={sort}
                  onChange={handleChangeSort}
                  displayEmpty
                  style={{ padding: "0px", width: sort.length > 0 ? "145px" : "61px" }}
                  inputProps={{ 'aria-label': 'Without label' }}
                >
                  <MenuItem value="">
                    <em>none</em>
                  </MenuItem>
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
              gettoplvl={gettoplvl}
              settopCategory={settopCategory}
              topCategory={topCategory}
              getsecondlvl={getsecondlvl}
              setsecondCategory={setsecondCategory}
              secondCategory={secondCategory}
              parentId={parentId}
              setparentId={setparentId}
              setcolor={setcolor}
              color={color}
              setmaxPrice={setmaxPrice}
              setminPrice={setminPrice}
              getsizedata={getsizedata}
              sizes={sizes}
              setsizes={setsizes}
              available={available}
              setavailable={setavailable}
              minDiscount={minDiscount}
              setminDiscount={setminDiscount}
            />
          {/* </Stack> */}
        </Stack>
      </div>

      <Grid container spacing={3} className="mb-5" >
        {
          getFilterProductPENDING ?
            <div className='flex justify-center items-center  h-80 w-[100%]'>
              <Bars
                visible={true}
                height="80"
                width="80"
                ariaLabel="magnifying-glass-loading"
                wrapperStyle={{}}
                wrapperClass="magnifying-glass-wrapper"
                glassColor="#c0efff"
                color="blue"
              />
            </div>
            :
            getProducts && getProducts.content.length > 0 ?
              getProducts.content.map((product) => (
                <Grid key={product.id} xs={12} sm={6} md={3}>
                  <ProductCard product={product} />
                </Grid>
              ))
              :
              <div className='flex justify-center items-center bg-red-100 h-60 w-[100%]'>
                <span className='font-bold' style={{ fontSize: "35px" }} >No filtered product found</span>
              </div>
        }
      </Grid>

      <Stack spacing={2} className='flex items-center justify-center mt-10' >
        <Pagination count={getProducts && getProducts?.totalPages} page={pageNumber} onChange={handleChangePageNumber} showFirstButton showLastButton />
      </Stack>
    </Container>
  );
}
