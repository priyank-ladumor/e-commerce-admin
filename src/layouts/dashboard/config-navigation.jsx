/* eslint-disable import/no-duplicates */
/* eslint-disable perfectionist/sort-imports */
/* eslint-disable import/no-unresolved */
import SvgColor from 'src/components/svg-color';
import { MdCategory } from "react-icons/md";
import { MdFormatSize  } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'dashboard',
    path: '/',
    icon: icon('ic_analytics'),
  },
  {
    title: 'user',
    path: '/user',
    icon: icon('ic_user'),
  },
  {
    title: 'product',
    path: '/products',
    icon: icon('ic_cart'),
  },
  {
    title: 'category',
    path: '/category',
    icon: <MdCategory style={{fontSize:"24px"}} />,
  },
  {
    title: 'size',
    path: '/size',
    icon: <MdFormatSize  style={{fontSize:"24px"}} />,
  },
  {
    title: 'order',
    path: '/order',
    icon: <FaEdit  style={{fontSize:"24px"}} />,
  }
];

export default navConfig;
