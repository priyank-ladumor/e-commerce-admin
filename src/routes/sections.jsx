/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
/* eslint-disable perfectionist/sort-imports */
/* eslint-disable import/no-duplicates */
/* eslint-disable import/no-unresolved */
import { lazy, Suspense } from 'react';
// eslint-disable-next-line import/no-duplicates
import { Navigate } from 'react-router-dom';
import { Outlet, useRoutes } from 'react-router-dom';
// import Swal from 'sweetalert2';
// eslint-disable-next-line import/no-unresolved
import Login from 'src/pages/Login';
// eslint-disable-next-line import/no-unresolved
import DashboardLayout from 'src/layouts/dashboard';
import CategoryPage from 'src/pages/Category';
import SizePage from 'src/pages/Size';
import OrderPage from 'src/pages/order';
import BannerPage from 'src/pages/banner';
import LogoPage from 'src/pages/logo';

export const IndexPage = lazy(() => import('src/pages/app'));
// eslint-disable-next-line import/no-unresolved
export const UserPage = lazy(() => import('src/pages/user'));
export const ProductsPage = lazy(() => import('src/pages/products'));

// ----------------------------------------------------------------------

export default function Router() {
  // const navigate = useNavigate()
  // useEffect(() => {
  //   !auth &&
  //     <div className='z-100' >
  //       {Swal.fire({
  //         title: "Are you sure Login?",
  //         text: "You won't be able to see this page without login!",
  //         icon: "warning",
  //         // showCancelButton: true,
  //         confirmButtonColor: "#3085d6",
  //         // cancelButtonColor: "#d33",
  //         confirmButtonText: "Go to login page"
  //       }).then((result) => {
  //         if (result.isConfirmed) {
  //           navigate("/login")
  //         }
  //       })}
  //     </div>
  // }, [])
  const auth = localStorage.getItem("token")
  const routes = useRoutes([
    {
      element: (
        <DashboardLayout>
          <Suspense>
            {auth ? <Outlet /> : <Navigate to="/login" replace />}
            {/* {auth?.length > 0 && <Outlet />} */}
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        { element: <IndexPage />, index: true },
        { path: 'user', element: <UserPage /> },
        { path: 'products', element: <ProductsPage /> },
        {
          path: '/category',
          element: <CategoryPage />,
        },
        {
          path: '/size',
          element: <SizePage />,
        },
        {
          path: '/order',
          element: <OrderPage />,
        },
        {
          path: '/banner',
          element: <BannerPage />,
        },
        {
          path: '/logo',
          element: <LogoPage />,
        }
      ],
    },
    !auth && {
      path: '/login',
      element: <Login />,
    },
    {
      path: '*',
      element: <h1>404</h1>,
      // element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
