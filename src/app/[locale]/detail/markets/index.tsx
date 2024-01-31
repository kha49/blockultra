'use client';

import { Segmented, Pagination, Table } from 'antd';
import { useState, useEffect } from 'react';
import SelectMarket from './select-market/SelectMarket';
import { ColumnsType } from 'antd/es/table';
import Image from 'next/image';
import SelectItemTable from '@/components/SelectItemTable';
import {
  currencyFormat,
  nFormatter,
  percentFormat,
  renderRangePaging,
  renderSortIcon,
} from '@/helpers';
import { FetchHistoricals, FetchSpot } from '@/usecases/coin-info';
import { SegmentedValue } from 'antd/es/segmented';
import BUDatePicker from './DatePicker';
import { isArray } from 'lodash';
import { ORDER } from '@/helpers/constants';
import CommonTable from '@/components/CommonTable/common-table';
import moment from 'moment';

const changeImageUrl = (logo: string) => {
  if (!logo) return '';
  if (logo.includes('img.api.cryptorank.io')) {
    return logo.replace('img.api.cryptorank.io', 'img.cryptorank.io');
  } else return logo;
 }

const columns: ColumnsType<ISpot> = [
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
    title: 'Exchange',
    dataIndex: 'exchange',
    key: 'exchangeName',
    width: 216,
    sortIcon: renderSortIcon,
    sorter: true,
    align: 'left',
    fixed: true,
    render: (_, { name, icon }) => (
      <div className='flex items-center gap-2'>
        { icon ?  (
          <Image src={changeImageUrl(icon)} alt={'icon'} width={32} height={32} />
        ) : '' }
        <span className='text-sm text-grey-700 font-bold font-jb'>{name}</span>
      </div>
    ),
  },
  {
    title: 'Tier',
    dataIndex: 'tier',
    key: 'tier',
    align: 'left',
    width: 72,
    sortIcon: renderSortIcon,
    sorter: false,
    render: (_, { tier }) => <div className='text-sm text-grey-700 font-semibold font-jsb'>{tier ? tier : '-'}</div>,
  },
  {
    title: 'Pair',
    dataIndex: 'paid',
    key: 'symbol',
    width: 198,
    align: 'right',
    sortIcon: renderSortIcon,
    sorter: true,
    render: (_, { pair }) => <div className='text-sm text-grey-700 font-semibold font-jsb'>{pair ? pair : '-'}</div>,
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'usdLast',
    align: 'right',
    width: 198,
    sortIcon: renderSortIcon,
    sorter: true,
    render: (_, { price }) => <div className='text-sm text-grey-700 font-semibold font-jsb'>{currencyFormat(price, '$')}</div>,
  },
  {
    title: 'Volume (24h)',
    dataIndex: 'volume24h',
    key: 'usdVolume',
    align: 'right',
    width: 198,
    sortIcon: renderSortIcon,
    sorter: true,
    render: (_, { volume24h }) => <div className='text-sm text-grey-700 font-semibold font-jsb'>{nFormatter(volume24h, 2, '$')}</div>,
  },
  {
    title: 'Market Share',
    dataIndex: 'exchangePercentVolume',
    key: 'exchangePercentVolume',
    width: 198,
    align: 'right',
    sortIcon: renderSortIcon,
    sorter: true,
    render: (_, { marketShare }) => <div className='text-sm text-grey-700 font-semibold font-jsb'>{percentFormat(marketShare)}</div>,
  },
];

const columnsHistoricals: ColumnsType<IHistorical> = [
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
    width: 100,
    sorter: true,
    sortIcon: renderSortIcon,
    render: (_, { date }) => <div className='text-sm text-grey-700 font-semibold font-jsb'>{date ? moment(date).format('DD MMM YYYY') : '-'}</div>,
  },
  {
    title: 'Open',
    dataIndex: 'open',
    key: 'open',
    width: 100,
    sorter: true,
    align: 'right',
    sortIcon: renderSortIcon,
    render: (_, { open }) => <div className='text-right text-sm text-grey-700 font-semibold font-jsb'>{open ? currencyFormat(open, '$') : '-'}</div>,
  },
  {
    title: 'High',
    dataIndex: 'high',
    key: 'high',
    width: 100,
    sorter: true,
    align: 'right',
    sortIcon: renderSortIcon,
    render: (_, { high }) => <div className='text-right text-sm text-grey-700 font-semibold font-jsb'>{high ? currencyFormat(high, '$') : '-'}</div>,
  },
  {
    title: 'Low',
    dataIndex: 'low',
    key: 'low',
    sorter: true,
    align: 'right',
    sortIcon: renderSortIcon,
    width: 100,
    render: (_, { low }) => <div className='text-right text-sm text-grey-700 font-semibold font-jsb'>{low ? currencyFormat(low, '$') : '-'}</div>,
  },
  {
    title: 'Close',
    dataIndex: 'close',
    key: 'close',
    sorter: true,
    align: 'right',
    sortIcon: renderSortIcon,
    width: 100,
    render: (_, { close }) => <div className='text-right text-sm text-grey-700 font-semibold font-jsb'>{close ? currencyFormat(close, '$') : '-'}</div>,
  },
  {
    title: 'Volume',
    dataIndex: 'volume',
    key: 'volume',
    sorter: true,
    align: 'right',
    sortIcon: renderSortIcon,
    width: 100,
    render: (_, { volume }) => <div className='text-right text-sm text-grey-700 font-semibold font-jsb'>{volume ? nFormatter(volume, 2, '$') : '-'}</div>,
  },
  {
    title: 'Market Cap',
    dataIndex: 'marketcap',
    key: 'marketcap',
    sorter: true,
    align: 'right',
    sortIcon: renderSortIcon,
    width: 100,
    render: (_, { marketcap }) => <div className='text-right text-sm text-grey-700 font-semibold font-jsb'>{marketcap ? nFormatter(marketcap, 2, '$') : '-'}</div>,
  },
];

const Markets = (props: any) => {
  const tabs = [
    {
      id: 1,
      label: 'Spot',
      enable: true,
    },
    {
      id: 2,
      label: 'Future',
      enable: false,
    },
    {
      id: 3,
      label: 'Historical Data',
      enable: true,
    },
  ];
  const [active, setActive] = useState<number>(1);
  const activeTab = (id: number) => {
    if (id != 2) setActive(id);
  };

  return (
    <div className='fade-top box-shadow-common p-6'>
      <div className='flex items-center gap-4 mb-4'>
        {tabs.map((tab, index) => (
          <div
            key={index}
            onClick={() => activeTab(tab.id)}
            className={
              'w-auto h-auto rounded-xl py-3 px-5 gap-2 cursor-pointer text-xs md:text-sm ' +
              (tab.id === active
                ? 'bg-gradient-to-b from-blue-500 to-indigo-900 text-white'
                : 'border ') +
              (tab.enable ? '' : 'disable')
            }
          >
            <p>{tab?.label}</p>
          </div>
        ))}
      </div>
      {active == 1 && <Spot slug={props.slug} />}
      {active == 3 && <Historical slug={props.slug} />}
    </div>
  );
};

export function Historical(props: any) {
  const total = 1000;
  const _onChangePage = (page: number) => {
    setPage(page);
  };

  const _onChangeSize = (value: number) => {
    setPageSize(value);
  };

  const [historicals, setHistoricals] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  const [order, setOrder] = useState({
    columnKey: '',
    order: '',
  });

  async function fetchHistoricals() {
    try {
      const res: any = await FetchHistoricals({
        coin_key: props.slug,
        limit: pageSize,
        page: page,
        date_from: dateFrom,
        date_to: dateTo,
        sort_by: order.columnKey,
        sort_order: ORDER[order.order],
      });
      setHistoricals(res.data);
    } catch (error) {
      return null;
    }
  }
  useEffect(() => {
    fetchHistoricals();
  }, [pageSize, page, dateFrom, dateTo, order]);

  return (
    <div>
      <div className='flex items-center justify-between flex-wrap gap-4 mb-5'>
        <div className='w-full max-w-[280px]'></div>
      </div>
      <div className='flex items-center justify-between flex-wrap gap-4 mb-5'>
        <BUDatePicker
          _onRangeDateChange={(from: any, to: any) => {
            setDateFrom(from);
            setDateTo(to);
            fetchHistoricals();
          }}
        ></BUDatePicker>
      </div>

      <div>
        <div className='overflow-x-scroll hide-scroll'>
          <CommonTable
            columns={columnsHistoricals}
            dataSource={historicals}
            pagination={{ position: ['none'], pageSize }}
            showSorterTooltip={false}
            onChange={(_page, _filter, sort) => {
              const itemSort = isArray(sort) ? sort[0] : sort;
              setOrder({
                columnKey: itemSort.columnKey
                  ? itemSort.columnKey.toString()
                  : '',
                order: itemSort.order ? itemSort.order.toString() : '',
              });
            }}
          />
        </div>
        <div className='pt-6 flex items-center justify-between table-pagination'>
          <div className='hidden md:block'>{renderRangePaging(page, pageSize, historicals.length, total)}</div>
          <div className='flex items-center justify-center w-full md:w-auto'>
            <Pagination
              total={total}
              pageSize={pageSize}
              current={page}
              onChange={_onChangePage}
              showSizeChanger={false}
            />
          </div>
          <div className='hidden md:block'>
            <SelectItemTable onChange={_onChangeSize} />
          </div>
        </div>
      </div>
    </div>
  );
}

export function Spot(props: any) {
  const _onChangePage = (page: number) => {
    setPage(page);
  };

  const _onChangeSize = (value: number) => {
    setPageSize(value);
  };

  const _onChangeType = (value: SegmentedValue) => {
    setType(value.toString());
  };

  const [spots, setSpots] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);
  const [type, setType] = useState('All');
  const [total, setTotal] = useState(0);

  const [order, setOrder] = useState({
    columnKey: '',
    order: '',
  });

  async function fetchSpots(searchKey?: string) {
    try {
      const res: any = await FetchSpot({
        coin_key: props.slug,
        limit: pageSize,
        page: page,
        type: type,
        search_key: searchKey || '',
        sort_by: order.columnKey,
        sort_order: ORDER[order.order as keyof typeof ORDER],
      });
      console.log('res', res)
      setSpots(res.data);
      setTotal(res?.total)
    } catch (error) {
      setSpots([]);
      return [];
    }
  }
  useEffect(() => {
    fetchSpots();
  }, [pageSize, page, type, order]);

  
  function onChangeSearchKey(searchKey: string) {
    fetchSpots(searchKey);
  }
  return (
    <div>
      <div className='flex items-center justify-between flex-wrap gap-4 mb-5'>
        <SelectMarket onChangeSearhKey={onChangeSearchKey} />
        <div className='flex items-center justify-center w-full md:w-auto'>
          <Segmented
            onChange={_onChangeType}
            className='items-center'
            options={[
              { value: 'all', label: 'All' },
              { value: 'cex', label: 'CEX' },
              { value: 'dex', label: 'DEX' },
            ]}
          />
        </div>
        <div className='w-full max-w-[280px]'></div>
      </div>
      <div>
        <div className='overflow-x-scroll hide-scroll'>
          <CommonTable
            columns={columns}
            dataSource={spots}
            pagination={{ position: ['none'], pageSize }}
            showSorterTooltip={false}
            onChange={(_page, _filter, sort) => {
              const itemSort = isArray(sort) ? sort[0] : sort;
              setOrder({
                columnKey: itemSort.columnKey
                  ? itemSort.columnKey.toString()
                  : '',
                order: itemSort.order ? itemSort.order.toString() : '',
              });
            }}
          />
        </div>
        <div className='pt-6 flex items-center justify-between table-pagination'>
          <div className='hidden md:block'>{renderRangePaging(page, pageSize, spots.length, total)}</div>
          <div className='flex items-center justify-center w-full md:w-auto'>
            <Pagination
              total={total}
              pageSize={pageSize}
              current={page}
              onChange={_onChangePage}
              showSizeChanger={false}
            />
          </div>
          <div className='hidden md:block'>
            <SelectItemTable onChange={_onChangeSize} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Markets;
