/* eslint-disable import/no-unresolved */
import { Helmet } from 'react-helmet-async';

import { ProductsView } from 'src/sections/products/view';

// ----------------------------------------------------------------------

export default function ProductsPage() {
  return (
    <>
      <Helmet>
        <title> Products | Shoppy.io </title>
      </Helmet>

      <ProductsView />
    </>
  );
}
