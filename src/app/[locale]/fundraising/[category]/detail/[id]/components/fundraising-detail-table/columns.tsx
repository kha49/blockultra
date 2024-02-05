import {
  renderSortIcon,
  currencyFormat,
  percentFormat,
  nFormatter,
} from '@/helpers';
import { ColumnsType } from 'antd/es/table';
import { get } from 'lodash';
import { IPortfolios } from '../../../../types';
import { roundsColumns } from '../../config';
import { changeImageUrl } from '@/helpers/functions';
import { CoreCellName } from '@/components/core-table/core-cell-name';

const columnPorfolio: ColumnsType<IPortfolios> = [
  {
    key: 'id',
    title: '#',
    align: 'left',
    fixed: true,

    render: (_, _value, index) => index + 1,
  },
  {
    key: 'name',
    title: 'Name',
    width: 248,
    align: 'left',
    fixed: true,
    render: (_, value) => (
      <CoreCellName
        imagesUrl={[get(value, 'logo.x60', '')]}
        name={value.name}
        symbol={value.ticker}
        link={`/en/detail/${value.key}`}
      />
    ),
    sortIcon: renderSortIcon,
    sorter: true,
  },
  {
    key: 'rating',
    title: 'Rate',
    align: 'center',
    render: () => {
      return '-';
    },
  },
  {
    key: 'price',
    title: 'Price',
    width: 200,
    align: 'right',
    render: (_, value) => {
      return currencyFormat(value.price, '$');
    },
    sortIcon: renderSortIcon,
    sorter: true,
  },
  {
    key: 'price24hPercent',
    title: '24h %',
    width: 167,
    align: 'right',
    render: (_, { price24hPercent }) => {
      return percentFormat(price24hPercent);
    },
    sorter: true,
  },
  {
    key: 'volume24h',
    title: 'Volume (24h)',
    width: 186,
    align: 'right',
    render: (_, value: any) => {
      return nFormatter(value.volume24h, 2, '$');
    },
    sorter: true,
  },
  {
    key: 'marketCap',
    title: 'Market Cap',
    width: 168,
    align: 'right',
    render: (_, value) => {
      return nFormatter(Number(value.marketCap), 2, '$');
    },
    sorter: true,
  },
];

export const tabFundraisingTable = {
  por: columnPorfolio,
  fun: roundsColumns,
};
