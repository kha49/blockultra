'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import './style.scss';
import { Checkbox, Select, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { FetchList, SearchCoinsInFilter } from '@/usecases/exchange';
import FilterCustom from '@/components/FilterCustom';
import ReactECharts from 'echarts-for-react';
import BaseTable from '@/components/BaseTable';
import {
  ICustomTagProp,
  IOptionAny,
  IOptionCustom,
} from '@/components/FilterCustom/props';
import { renderSortIcon, nFormatter, percentFormat } from '@/helpers';
import { IExchangeSpot } from '../props';
import { COLOR_CHART, ORDER } from '@/helpers/constants';
import { useDebounce } from 'usehooks-ts';
import { ISearchFilter } from '../props';
import { isArray } from 'lodash';

const columns: ColumnsType<IExchangeSpot> = [
  {
    key: 'id',
    title: '#',
    width: 50,
    align: 'left',
    fixed: true,
    render: (_, value, index) => {
      return index + 1;
    },
  },
  {
    key: 'name',
    title: 'Name',
    width: 294,
    align: 'left',
    fixed: true,
    render: (_, value) => {
      return (
        <span className='table-header'>
          <Link href={`spot/${value.key2}`}>
            <div className='inline-flex items-center'>
              <img src={value.icon} alt={value.name} className='w-8 h-8' />
              <div className='mx-2 text-grey-700 text-sm font-bold font-jb hover:text-primary-500 truncate max-w-full'>
                {value.name}
              </div>
            </div>
          </Link>
        </span>
      );
    },
    sortIcon: renderSortIcon,
    sorter: true,
  },
  {
    key: 'tier',
    title: 'Tier',
    dataIndex: 'tier',
    width: 26,
    align: 'center',
    sorter: true,
    render: (_, value) => {
      return <p className='text-right font-jsb'>{value.tier ? value.tier : '-'}</p>;
    },
  },
  {
    key: 'volume24h',
    title: 'Volume (24h)',
    dataIndex: 'volume24h',
    width: 128,
    align: 'right',
    sorter: true,
    render: (_, value) => {
      return (
        <div className='text-right font-jsb'>
          <p className='text-grey-700 text-sm font-semibold'>
            {nFormatter(value.volume24h, 2, '$')}
          </p>
          {percentFormat(value.volumn24hPercent, 'text-sm font-bold')}
        </div>
      );
    },
    sortIcon: renderSortIcon,
  },
  {
    key: 'currenciesCount',
    title: 'Coins',
    width: 96,
    align: 'right',
    render: (_, value) => {
      return <p className='text-right font-jsb'>{value.currenciesCount}</p>;
    },
    sorter: true,
    sortIcon: renderSortIcon,
  },
  {
    key: 'country',
    title: 'Country',
    width: 130,
    align: 'center',
    render: (_, value: any) => {
      return value.country ? (
        <div className='flex justify-center items-center'>
          <img
            className='w-8 h-4.5'
            src={`/Flag/Country=${value.country}, Style=Flag, Radius=Off.svg`}
          />
          {/* <div>{value.country}</div> */}
        </div>
      ) : (
        <div className='text-grey-700'>-</div>
      );
    },
  },
  {
    key: 'marketShare',
    title: 'Market Share',
    dataIndex: 'marketShare',
    width: 148,
    align: 'left',
    sorter: false,
    render: (_, value) => {
      return (
        <div className='flex items-center gap-2'>
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
              grid: {
                left: 0,
                top: 0,
                right: 0,
                bottom: 0,
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
                  labelLine: {
                    show: false,
                  },
                  emphasis: {
                    focus: false,
                    scale: false,
                  },
                  data: [
                    {
                      value: value.percentVolume,
                      name: 'Gainers',
                      itemStyle: {
                        color: COLOR_CHART.CRAYOLA,
                      },
                    },
                    {
                      value: 100 - value.percentVolume,
                      name: 'losers',
                      itemStyle: {
                        color: COLOR_CHART.RADICAL_RED,
                      },
                    },
                  ],
                },
              ],
            }}
          />
          <span className='font-jsb'>{value.percentVolume}%</span>
        </div>
      );
    },
  },
  {
    key: 'graph',
    title: 'Volume Graph (7d)',
    dataIndex: 'graph',
    width: 162,
    align: 'right',
    sorter: false,
    render: (_, value) => {
      try {
        return (
          <div className='flex items-center justify-end relative'>
            <ReactECharts
              option={{
                title: {
                  show: false,
                },
                xAxis: {
                  type: 'category',
                  show: false,
                },
                yAxis: {
                  type: 'value',
                  show: false,
                },
                grid: {
                  left: 0,
                  top: 0,
                  right: 0,
                  bottom: 0,
                },
                series: [
                  {
                    data: value.dataChart.volumes,
                    type: 'line',
                    areaStyle: {
                      color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [
                          {
                            offset: 0,
                            color:
                              value.dataChart.volumes[99] -
                                value.dataChart.volumes[0] <
                              0
                                ? 'rgba(255, 0, 0, 0.5)'
                                : 'rgba(0, 128, 0, 0.5)',
                          },
                          {
                            offset: 1,
                            color:
                              value.dataChart.volumes[99] -
                                value.dataChart.volumes[0] <
                              0
                                ? 'rgba(255, 0, 0, 0)'
                                : 'rgba(0, 128, 0, 0)',
                          }, // Điểm cuối gradient color
                        ],
                      },
                    },
                    lineStyle: {
                      color:
                        value.dataChart.volumes[99] -
                          value.dataChart.volumes[0] <
                        0
                          ? 'rgba(255, 0, 0, 0.5)'
                          : 'rgba(0, 128, 0, 0.5)', // Màu xanh lá cây cho đường line
                    },
                    showSymbol: false,
                  },
                ],
              }}
              style={{ width: '240px', height: '62px' }}
            />
          </div>
        );
      } catch (error) {
        return null;
      }
    },
  },
];

const ExchangeTable = () => {
  const [data, setData] = useState<IExchangeSpot[]>([]);
  const [pageSize, setPageSize] = useState(50);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(999);
  const [order, setOrder] = useState({
    columnKey: 'volume24h',
    order: 'desc',
  });
  const [keyFilter, setKeyFilter] = useState<string[]>([]);
  const debouncedValue = useDebounce<string[]>(keyFilter, 300);

  const getCoins = async () => {
    const response: any = await FetchList({
      limit: pageSize,
      page: currentPage,
      sort_by: order.columnKey,
      sort_order: ORDER[order.order as keyof typeof ORDER],
      search_key: keyFilter.join(','),
    });

    if (!response) return;
    const { data, total } = response;
    if (data && data.length > 0) {
      const dataClone = data.map((item: any, index: number) => ({
        ...item,
        key2: item.key,
        key: index,
      }));
      setData(dataClone);
    } else {
      setData(data);
    }
    setTotal(total!!);

    /* #endregion */
  };

  useEffect(() => {
    getCoins();
  }, [pageSize, currentPage, order, debouncedValue]);

  const _onChangePage = (page: number) => {
    setCurrentPage(page);
  };

  const _onChangeSize = (value: number) => {
    setCurrentPage(1);
    setPageSize(value);
  };

  const _renderTag = (options: ICustomTagProp) => {
    const { value, closable, onClose, index, rawData } = options;
    const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
      event.preventDefault();
      event.stopPropagation();
    };

    if (index > 3) return <></>;

    if (index === 3)
      return (
        <Tag color='#5766ff' style={{ marginRight: 3 }}>
          ...
        </Tag>
      );
    return (
      <Tag
        color='#5766ff'
        onMouseDown={onPreventMouseDown}
        closable={closable}
        onClose={onClose}
        style={{ marginRight: 3 }}
      >
        {rawData.name ?? value}
      </Tag>
    );
  };

  const _getData = async ({ searchKey }: IOptionAny) => {
    const res: any = await SearchCoinsInFilter({
      search_key: searchKey,
    });
    if (!res) return [];

    return res.map((e: ISearchFilter) => ({
      id: e.key,
      name: e.name,
      code: e.key,
      thumb: '',
      isSelected: false,
    }));
  };

  const _renderOption = ({ name, code, checked }: IOptionCustom) => {
    return (
      <Select.Option isSelectOption={true} value={code} key={name}>
        <div className='flex pr-0 pl-0 mr-0 ml-0 select-coin-custom__item px-3 justify-between'>
          <div className=''>
            <span className='name mx-2'>{name}</span>
          </div>
          <div className='ant-checkbox'>
            {!checked ? (
              <Checkbox disabled className='hover:cursor-pointer' />
            ) : null}
          </div>
        </div>
      </Select.Option>
    );
  };

  const _onSelectFilter = (value: string[]) => {
    setKeyFilter(value);
  };

  return (
    <div className='home-table coin-tab'>
      <div className='filter flex justify-between mb-4'>
        <div className='flex'>
          <FilterCustom
            placeholder='Search'
            renderOption={_renderOption}
            renderTag={_renderTag}
            onChange={_onSelectFilter}
            getData={_getData}
            isSortSelected='alphabet'
          />
        </div>
      </div>
      <div className='table-price overflow-x-auto'>
        <BaseTable
          columns={columns}
          data={data}
          pageSize={pageSize}
          currentPage={currentPage}
          total={total}
          _onChangePage={_onChangePage}
          _onChangeSize={_onChangeSize}
          pagination={{ position: ['none'], pageSize }}
          onChange={(_page: any, _filter: any, sort: any[]) => {
            const itemSort = isArray(sort) ? sort[0] : sort;
            setOrder({
              columnKey: itemSort.columnKey
                ? itemSort.columnKey.toString()
                : 'volume24h',
              order: itemSort.order ? itemSort.order.toString() : 'ascend',
            });
          }}
        />
      </div>
    </div>
  );
};
export default ExchangeTable;
