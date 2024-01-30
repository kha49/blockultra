import type { ColumnsType } from 'antd/es/table';
import Link from 'next/link';
import {
  nFormatter,
  percentFormat,
  renderColumnId,
  renderSortIcon,
} from '@/helpers';
import { get, round } from 'lodash';
import ReactECharts from 'echarts-for-react';
import { COLOR_CHART } from '@/helpers/constants';
import { CoreCellName } from '@/components/core-table/core-cell-name';

const columns: ColumnsType<IHomeCategory> = [
  renderColumnId(),
  {
    key: 'name',
    title: 'Name',
    width: 288,
    align: 'left',
    fixed: true,
    render: (value) => (
      <CoreCellName
        imagesUrl={value.rankedCoins}
        name={value.name}
        symbol={value.symbol}
        link={`/en/categories/${value.id}`}
      />
    ),
    sortIcon: renderSortIcon,
    sorter: true,
  },
  {
    key: 'avgPriceChange',
    title: 'Avg Price Change (24h)',
    width: 158,
    align: 'right',
    render: (_, value) => {
      return (
        <div className={'text-center min-[500px]:text-right'}>
          {percentFormat(value.avgPriceChange['24H'])}
        </div>
      );
    },
    sortIcon: renderSortIcon,
    sorter: true,
  },
  {
    key: 'market_cap',
    title: 'Market Cap',
    width: 158,
    align: 'right',
    render: (_, value) => {
      const { marketCapChangeIn24h } = value;
      return (
        <p className='flex flex-col justify-end'>
          {nFormatter(value.market_cap, 2, '$')}
          {percentFormat(marketCapChangeIn24h)}
        </p>
      );
    },
    sortIcon: renderSortIcon,
    sorter: true,
  },
  {
    key: 'volume24h',
    title: 'Volume (24h)',
    align: 'right',
    width: 158,
    render: (_, value) => {
      const { volumeChangeIn24h } = value;
      return (
        <p className='flex flex-col justify-end'>
          {nFormatter(value.volume24h, 2, '$')}
          {percentFormat(volumeChangeIn24h)}
        </p>
      );
    },
    sortIcon: renderSortIcon,
    sorter: true,
  },
  {
    key: 'dominance',
    title: 'Dominance',
    align: 'right',
    width: 158,
    render: (_, value) => {
      return (
        <span className='text-grey-700'>
          {round(value.dominance, 2) !== 0 ? round(value.dominance, 2) : '0.00'}
          %
        </span>
      );
    },
    sortIcon: renderSortIcon,
    sorter: true,
  },
  {
    key: 'gainers',
    title: 'Gainers',
    align: 'right',
    width: 158,
    render: (_, value) => {
      return (
        <div className='flex items-center justify-end'>
          <ReactECharts
            style={{
              height: 40,
              width: 40,
            }}
            option={{
              option: {
                tooltips: { enabled: false },
                hover: { mode: null },
              },
              emphasis: {
                scale: false,
              },
              series: [
                {
                  name: 'Access From',
                  type: 'pie',
                  radius: ['40%', '70%'],
                  avoidLabelOverlap: false,
                  label: {
                    show: false,
                    position: 'center',
                  },
                  emphasis: {
                    scale: false,
                  },
                  labelLine: {
                    show: false,
                  },
                  data: [
                    {
                      value: value.losers,
                      name: 'losers',
                      itemStyle: {
                        color: COLOR_CHART.RADICAL_RED,
                      },
                    },
                    {
                      value: value.gainers,
                      name: 'Gainers',
                      itemStyle: {
                        color: COLOR_CHART.CRAYOLA,
                      },
                    },
                  ],
                },
              ],
            }}
          />
          <span className='ml-1 w-[54px] text-left'>
            {round((value.gainers / (value.gainers + value.losers)) * 100, 2)}%
          </span>
        </div>
      );
    },
    sortIcon: renderSortIcon,
    sorter: true,
  },
];

export const categoriesMobileColumnsKey = ['name', 'avgPriceChange'];

export default columns;