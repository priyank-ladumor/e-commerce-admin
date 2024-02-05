/* eslint-disable perfectionist/sort-imports */
/* eslint-disable import/no-unresolved */
import { Helmet } from 'react-helmet-async'
import { Category } from 'src/sections/category/category';

export default function CategoryPage() {
    return (
        <>
            <Helmet>
                <title> Category | Shoppy.io </title>
            </Helmet>

            <Category />
        </>
    );
}
