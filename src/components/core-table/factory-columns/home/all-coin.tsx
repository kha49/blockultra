import type { ColumnsType } from 'antd/es/table';
import { get } from 'lodash';
import {
  currencyFormat,
  nFormatter,
  percentFormat,
  renderSortIcon,
  renderColumnId,
} from '@/helpers';
import { CoreCellName } from '@/components/core-table/core-cell-name';
import { changeImageUrl } from '@/helpers/functions';

const columns: ColumnsType<any> = [
  renderColumnId(),
  {
    key: 'name',
    title: 'Name',
    width: 216,
    align: 'left',
    fixed: true,
    render: (value) => (
      <CoreCellName
        imagesUrl={[get(value, 'image.x60', '')]}
        name={value.name}
        symbol={value.symbol}
        link={`/en/detail/${value.key}`}
      />
    ),
    sortIcon: renderSortIcon,
    sorter: true,
  },
  {
    key: 'price',
    title: 'Price',
    width: 120,
    align: 'right',
    render: (value) => currencyFormat(value.price, '$'),
    sortIcon: renderSortIcon,
    sorter: true,
  },
  {
    key: 'average24h',
    title: '24h %',
    width: 135,
    align: 'right',
    render: (value) => percentFormat(value.average24h),
    sorter: true,
  },
  {
    key: 'volume24h',
    title: 'Volume (24h)',
    width: 154,
    align: 'right',
    render: (value) => nFormatter(value.volume24h, 2, '$'),
    sorter: true,
  },
  {
    key: 'marketCap',
    title: 'Market Cap',
    width: 135,
    align: 'right',
    render: (value) => nFormatter(+value.marketCap, 2, '$'),
    sorter: true,
  },
  {
    key: 'chart',
    title: 'Price Graph (7d)',
    width: 229,
    align: 'right',
    render: (value) => (
      <div className='flex items-center justify-end'>
        <img
          alt='chart'
          width={136}
          height={40}
          src={changeImageUrl(value.chart)}
        />
      </div>
    ),
  },
];

export const allCoinsMobileColumnsKey = ['name', 'price', 'average24h'];

export default columns;
