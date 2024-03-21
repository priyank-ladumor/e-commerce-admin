/* eslint-disable perfectionist/sort-imports */
/* eslint-disable import/no-unresolved */
import { Helmet } from 'react-helmet-async'
import LogoView from 'src/sections/logo/logo';

export default function LogoPage() {
    return (
        <>
            <Helmet>
                <title> Logo | Shoppy.io </title>
            </Helmet>

            <LogoView />
        </>
    );
}
