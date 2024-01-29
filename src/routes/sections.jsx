/* eslint-disable import/no-duplicates */
/* eslint-disable import/no-unresolved */
import { lazy, Suspense } from 'react';
// eslint-disable-next-line import/no-duplicates
import { Navigate } from 'react-router-dom';
import { Outlet, useRoutes } from 'react-router-dom';

// eslint-disable-next-line import/no-unresolved
import Login from 'src/pages/Login';
// eslint-disable-next-line import/no-unresolved
import DashboardLayout from 'src/layouts/dashboard';

export const IndexPage = lazy(() => import('src/pages/app'));
// eslint-disable-next-line import/no-unresolved
export const UserPage = lazy(() => import('src/pages/user'));
export const ProductsPage = lazy(() => import('src/pages/products'));

// ----------------------------------------------------------------------

export default function Router() {
  const auth = localStorage.getItem("token")
  const routes = useRoutes([
    {
      element: (
        <DashboardLayout>
          <Suspense>
            {auth ? <Outlet /> : <Navigate to="/login" replace />}
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        { element: <IndexPage />, index: true },
        { path: 'user', element: <UserPage /> },
        { path: 'products', element: <ProductsPage /> },
      ],
    },
    {
      path: '/login',
      element: <Login />,
    },
    // {
    //   path: '*',
    //   element: <Navigate to="/404" replace />,
    // },
  ]);

  return routes;
}
