import type { ColumnsType } from 'antd/es/table';
import {
  currencyFormat,
  nFormatter2,
  percentFormat2,
  renderColumnId,
  renderSortIcon,
} from '@/helpers';
import Link from 'next/link';
import { get } from 'lodash';
import { CoreCellName } from '@/components/core-table/core-cell-name';

const columns: ColumnsType<any> = [
  renderColumnId(),
  {
    key: 'name',
    title: 'Name',
    width: 216,
    align: 'left',
    fixed: true,
    sortIcon: renderSortIcon,
    sorter: false,
    render: (value) => (
      <CoreCellName
        imagesUrl={[get(value, 'image.x60', '')]}
        name={value.name}
        symbol={value.symbol}
        link={`/en/detail/${value.key}`}
      />
    ),
  },

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
