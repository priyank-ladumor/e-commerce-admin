/* eslint-disable perfectionist/sort-imports */
/* eslint-disable import/no-unresolved */
import { Helmet } from 'react-helmet-async'
import BannerView from 'src/sections/banner/banner';

export default function BannerPage() {
    return (
        <>
            <Helmet>
                <title> Banner | Shoppy.io </title>
            </Helmet>

            <BannerView />
        </>
    );
}
