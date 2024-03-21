/* eslint-disable perfectionist/sort-imports */
/* eslint-disable import/no-unresolved */
import { Helmet } from 'react-helmet-async'
import OrderView from 'src/sections/order/order';

export default function OrderPage() {
    return (
        <>
            <Helmet>
                <title> Order | Shoppy.io </title>
            </Helmet>

            <OrderView />
        </>
    );
}
