import Link from 'next/link';
import { ReactNode, useCallback, useEffect, useState } from 'react';
import './style.scss';
import { Checkbox, Pagination, Select, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { FetchList, SearchCoinsInFilter } from '@/usecases/exchange';
import { get, cloneDeep, isArray, random } from 'lodash';
import SelectItemTable from '@/components/SelectItemTable';
import FilterCustom from '@/components/FilterCustom';
import ReactECharts from 'echarts-for-react';
import {
  ICustomTagProp,
  IOptionAny,
  IOptionCustom,
} from '@/components/FilterCustom/props';
import {
  renderSortIcon,
  nFormatter,
  percentFormat,
  renderRangePaging,
} from '@/helpers';
import { IExchangeSpot } from './props';
import { COLOR_CHART, ORDER } from '@/helpers/constants';
import { useDebounce } from 'usehooks-ts';
import { ISearchFilter } from '../coinTableInfo/props';

const columns: ColumnsType<IExchangeSpot> = [
  {
    key: 'id',
    title: '#',
    width: 56,
    align: 'left',
    render: (_, value, index) => {
      return index + 1;
    },
  },
  {
    key: 'name',
    title: 'Name',
    width: 223,
    align: 'left',
    render: (_, value) => {
      return (
        <span className='table-header'>
          <Link href={`exchange/${value.key}`}>
            <div className='inline-flex items-center'>
              <img src={value.icon} alt={value.name} className='w-8 h-8' />
              <div className='mx-2 text-zinc-700 text-sm font-bold  hover:text-primary-500'>
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
    width: 109,
    align: 'left',
    render: (_, value) => {
      return (
        <p className='inline-flex items-center'>
          <span className=''>{value.tier}</span>
        </p>
      );
    },
  },
  {
    key: 'volumn24h',
    title: 'Volumn (24h)',
    width: 211,
    align: 'right',
    render: (_, value) => {
      return (
        <div>
          <p className='text-zinc-700 text-sm font-semibold'>
            {nFormatter(value.volumn24h, 2, '$')}
          </p>
          {percentFormat(value.volumn24hPercent, 'text-sm font-bold')}
        </div>
      );
    },
    sortIcon: renderSortIcon,
    sorter: true,
  },
  {
    key: 'coins',
    title: 'Coins',
    width: 185,
    align: 'left',
    render: (_, value) => {
      return <p>{value.currenciesCount}</p>;
    },
  },
  {
    key: 'country',
    title: 'Country',
    width: 142,
    align: 'center',
    render: (_, value: any) => {
      return (
        <div className='flex justify-center items-center'>{value.country}</div>
      );
    },
  },
  {
    key: 'marketShare',
    title: 'Market Share',
    width: 228,
    align: 'center',
    render: (_, value) => {
      return (
        <div className='flex items-center justify-center'>
          <ReactECharts
            style={{
              height: 32,
              width: 32,
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
                  labelLine: {
                    show: false,
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
          <span className='ml-1'>{value.percentVolume} %</span>
        </div>
      );
    },
  },
  {
    key: 'graph',
    title: 'Volume Graph (7d)',
    width: 230,
    align: 'right',
    render: (_, value) => {
      try {
        return (
          <div className='flex items-center justify-start h-10'>
            {/* <ReactECharts option={option} /> */}
          </div>
        );
      } catch (error) {
        return null;
      }
    },
  },
];

const Spot = () => {
  const [data, setData] = useState<IExchangeSpot[]>([]);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(999);
  const [order, setOrder] = useState({
    columnKey: '',
    order: '',
  });
  const [keyFilter, setKeyFilter] = useState<string[]>([]);
  const debouncedValue = useDebounce<string[]>(keyFilter, 300);

  const getCoins = useCallback(async () => {
    const response: any = await FetchList({
      limit: pageSize,
      page: currentPage,
      sort_by: order.columnKey,
      sort_order: ORDER[order.order as keyof typeof ORDER],
      search_key: keyFilter.join(','),
    });

    if (!response) return;
    const { data, total } = response;
    setData(data);
    setTotal(total!!);

    /* #endregion */
  }, [pageSize, currentPage, order, debouncedValue]);

  useEffect(() => {
    getCoins();
  }, [getCoins, pageSize, currentPage, order, debouncedValue]);

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
      <div className='table-price desktop-show overflow-x-auto'>
        <Table
          columns={columns}
          dataSource={data}
          pagination={{ position: ['none'], pageSize }}
          onChange={(_page, _filter, sort) => {
            const itemSort = isArray(sort) ? sort[0] : sort;
            setOrder({
              columnKey: itemSort.columnKey
                ? itemSort.columnKey.toString()
                : '',
              order: itemSort.order ? itemSort.order.toString() : '',
            });
          }}
          // sortDirections={['ascend', 'descend']}
          showSorterTooltip={false}
        />
      </div>

      <div className='table-pagination mobile-show pt-6 flex items-center justify-center'>
        <Pagination
          total={total}
          pageSize={pageSize}
          current={currentPage}
          onChange={_onChangePage}
          showSizeChanger={false}
        />
      </div>

      <div className='table-pagination pt-6 px-3 flex items-center justify-between'>
        <div className='text-center text-zinc-700 text-sm font-jm leading-tight'>
          {renderRangePaging(currentPage, pageSize, data.length, total)}
        </div>

        <div className='desktop-show table-pagination'>
          <Pagination
            total={total}
            pageSize={pageSize}
            current={currentPage}
            onChange={_onChangePage}
            showSizeChanger={false}
          />
        </div>

        <div>
          <SelectItemTable onChange={_onChangeSize} />
        </div>
      </div>
    </div>
  );
};
export default Spot;
