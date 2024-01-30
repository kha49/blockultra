import type { ColumnsType } from 'antd/es/table';
import {
  currencyFormat,
  nFormatter2,
  percentFormat2,
  renderSortIcon,
} from '@/helpers';
import Link from 'next/link';
import { get } from 'lodash';

const columns: ColumnsType<any> = [
  {
    key: 'id',
    title: '#',
    width: 24,
    align: 'left',
    fixed: true,
    render: (_, value, index) => {
      return index + 1;
    },
  },
  {
    key: 'name',
    title: 'Name',
    width: 216,
    align: 'left',
    fixed: true,
    sortIcon: renderSortIcon,
    sorter: false,
    render: (_, value) => {
      const imageSource = get(value, 'image.x60', '');

      return (
        <div className='flex items-center gap-2'>
          <img src={imageSource} alt={value.name} className='w-7 h-7' />
          <div className='flex items-start gap-1 justify-start flex-col md:flex-row'>
            <Link
              href={`/en/detail/${value.key}`}
              className='md:mx-2 text-grey-700 hover:text-primary-500 truncate max-w-[55px] md:max-w-[160px]'
            >
              {value.name}
            </Link>
            <span className='px-2 rounded py-0 bg-grey-200 text-grey-500 leading-5 coin-code'>
              {value.symbol}
            </span>
          </div>
        </div>
      );
    },
  },
  // {
  //   key: 'rate',
  //   title: 'Rate',
  //   width: 91,
  //   align: 'left',
  //   render: (_, value) => {
  //     return (
  //       <p className='inline-flex items-center'>
  //         <span className='mr-1'>{value.rate}</span> <IconStar />
  //       </p>
  //     );
  //   },
  // },
  {
    key: 'price',
    title: 'Price',
    width: 119,
    align: 'right',
    sortIcon: renderSortIcon,
    sorter: false,
    render: (_, value) => {
      return currencyFormat(value.price, '$');
    },
  },
  {
    key: 'average24h',
    title: '24h %',
    width: 135,
    align: 'right',
    sortIcon: renderSortIcon,
    sorter: false,
    render: (_, value) => {
      return percentFormat2(value.average24h);
    },
  },
  {
    key: 'volume24h',
    title: 'Volume (24h)',
    width: 154,
    align: 'right',
    sortIcon: renderSortIcon,
    sorter: false,
    render: (_, value) => {
      return nFormatter2(value.volume24h, 2, '$');
    },
  },
  {
    key: 'marketCap',
    title: 'Market Cap',
    width: 154,
    align: 'right',
    sortIcon: renderSortIcon,
    sorter: false,
    render: (_, value) => {
      return nFormatter2(value.marketCap, 2, '$');
    },
  },
  {
    key: 'graph',
    title: 'Price Graph (7d)',
    width: 229,
    align: 'right',
    sortIcon: renderSortIcon,
    sorter: false,
    render: (_, value) => {
      return (
        <div className='flex items-center justify-end'>
          <img
            width={136}
            height={40}
            src={`data:image/svg+xml;base64,${value.chart}`}
          />
        </div>
      );
    },
  },
];

export const trendingMobileColumnsKey = ['name', 'price', 'average24h'];

export default columns;
