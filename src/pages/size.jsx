/* eslint-disable perfectionist/sort-imports */
/* eslint-disable import/no-unresolved */
import { Helmet } from 'react-helmet-async'
import { SizeView } from 'src/sections/size/Size';

export default function SizePage() {
    return (
        <>
            <Helmet>
                <title> Size | Shoppy.io </title>
            </Helmet>

            <SizeView />
        </>
    );
}
