import type { ColumnsType } from 'antd/es/table';
import { get } from 'lodash';
import Link from 'next/link';
import {
  currencyFormat,
  nFormatter,
  percentFormat,
  renderSortIcon,
} from '@/helpers';

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
    sortIcon: renderSortIcon,
    sorter: true,
  },
  {
    key: 'price',
    title: 'Price',
    width: 120,
    align: 'right',
    render: (_, value) => {
      return currencyFormat(value.price, '$');
    },
    sortIcon: renderSortIcon,
    sorter: true,
  },
  {
    key: 'average24h',
    title: '24h %',
    width: 135,
    align: 'right',
    render: (_, value) => {
      return percentFormat(value.average24h);
    },
    sorter: true,
  },
  {
    key: 'volume24h',
    title: 'Volume (24h)',
    width: 154,
    align: 'right',
    render: (_, value: any) => {
      return nFormatter(value.volume24h, 2, '$');
    },
    sorter: true,
  },
  {
    key: 'marketCap',
    title: 'Market Cap',
    width: 135,
    align: 'right',
    render: (_, value) => {
      return nFormatter(Number(value.marketCap), 2, '$');
    },
    sorter: true,
  },
  {
    key: 'chart',
    title: 'Price Graph (7d)',
    width: 229,
    align: 'right',
    render: (_, value) => {
      try {
        return (
          <div className='flex items-center justify-end'>
            <img
              alt='chart'
              width={136}
              height={40}
              src={`data:image/svg+xml;base64,${value.chart}`}
            />
          </div>
        );
      } catch (error) {
        return null;
      }
    },
  },
];

export const allCoinsMobileColumnsKey = ['name', 'price', 'average24h'];

export default columns;
