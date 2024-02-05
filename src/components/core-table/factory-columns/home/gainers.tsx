import type { ColumnsType } from 'antd/es/table';
import {
  currencyFormat,
  nFormatter,
  percentFormat,
  renderColumnId,
  renderSortIcon,
} from '@/helpers';
import { CoreCellName } from '@/components/core-table/core-cell-name';
import { get } from 'lodash';
import { changeImageUrl } from '@/helpers/functions';

const columns: ColumnsType<any> = [
  renderColumnId(),
  {
    key: 'name',
    title: 'Name',
    width: 186,
    align: 'left',
    sorter: true,
    render: (value) => (
      <CoreCellName
        imagesUrl={[changeImageUrl(get(value, 'image.x60', ''))]}
        name={value.name}
        symbol={value.symbol}
        link={`/en/detail/${value.key}`}
      />
    ),
    sortIcon: renderSortIcon,
  },
  {
    key: 'price',
    title: 'Price',
    width: 90,
    align: 'right',
    sorter: (a, b) => a.price - b.price,
    sortDirections: ['ascend', 'descend'],
    render: (_, value) => {
      return currencyFormat(value.price, '$', {
        numberRound: 2,
        isAutoZero: true,
        addToolTip: true,
      });
    },
    sortIcon: renderSortIcon,
    // sorter: true,
  },
  {
    key: 'priceChangeIn24',
    title: '24h %',
    width: 74,
    align: 'right',
    sorter: (a, b) => a.priceChangeIn24 - b.priceChangeIn24,
    render: (_, value) => {
      return percentFormat(value.priceChangeIn24);
    },
    sortIcon: renderSortIcon,
  },
  {
    key: 'volume24h',
    title: 'Volume (24h)',
    width: 100,
    align: 'right',
    render: (_, value) => {
      return nFormatter(value.volume24h, 2, '$');
    },
    sortIcon: renderSortIcon,
    sorter: (a, b) => a.volume24h - b.volume24h,
  },
];

export const gainersMobileColumnsKey = [
  'name',
  'initialCap',
  'priceChangeIn24',
];

export default columns;
