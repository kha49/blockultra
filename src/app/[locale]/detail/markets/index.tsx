'use client';

import { Segmented, Pagination, Table } from 'antd';
import { useState } from 'react';
import SelectMarket from './select-market/SelectMarket';
import { ColumnsType } from 'antd/es/table';
import Image from 'next/image';
import SelectItemTable from '@/components/SelectItemTable';

const columns: ColumnsType<IMarket> = [
  {
    key: 'id',
    title: '#',
    width: 40,
    align: 'left',
    render: (_, value, index) => {
      return index + 1;
    },
  },
  {
    title: 'Exchange',
    dataIndex: 'exchange',
    key: 'exchange',
    width: 200,
    render: (_, { exchange }) => (
      <div className='flex items-center gap-2'>
        <Image src='/' alt={'icon'} width={24} height={24} />
        <span>{exchange.name}</span>
      </div>
    ),
  },
  {
    title: 'Tier',
    dataIndex: 'tier',
    key: 'tier',
    width: 200,
    render: (_, { tier }) => <>{tier}</>,
  },
  {
    title: 'Pair',
    dataIndex: 'paid',
    key: 'paid',
    width: 200,
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
    width: 200,
    render: (_, { price }) => <>${price}</>,
  },
  {
    title: 'Volume (24h)',
    dataIndex: 'volume24h',
    key: 'volume24h',
    width: 200,
    render: (_, { volume24h }) => <>${volume24h}</>,
  },
  {
    title: 'Market Share',
    dataIndex: 'ms',
    key: 'ms',
  },
];

const data: IMarket[] = [
  {
    exchange: {
      name: 'BTC',
      img: '/btc.png',
    },
    tier: 100.0,
    price: 345.65,
    paid: 345.65,
    volume24h: 345.67,
    ms: '0.15%',
  },
];

const Markets = () => {
  const tabs = [
    {
      id: 1,
      label: 'Spot',
    },
    {
      id: 2,
      label: 'Future',
    },
    {
      id: 3,
      label: 'Historical Data',
    },
  ];
  const [active, setActive] = useState<number>(1);
  const activeTab = (id: number) => {
    setActive(id);
  };

  const total = 1000;
  const pageSize = 10;
  const currentPage = 1;
  const _onChangePage = (page: number) => {};

  const _onChangeSize = (value: number) => {};

  const _renderRange = () => {
    const start = (currentPage - 1) * pageSize + 1;
    const end = start + data.length - 1;
    return (
      <span className='table-total'>
        {start} - {end} from {total}
      </span>
    );
  };

  return (
    <div className='fade-top box-shadow-common p-6'>
      <div className='flex items-center gap-4 mb-4'>
        {tabs.map((tab, index) => (
          <div
            key={index}
            onClick={() => activeTab(tab.id)}
            className={
              'w-auto h-auto rounded-xl py-3 px-5 gap-2 cursor-pointer text-xs md:text-base ' +
              (tab.id === active
                ? 'bg-gradient-to-b from-blue-500 to-indigo-900 text-white'
                : 'border')
            }
          >
            <p>{tab?.label}</p>
          </div>
        ))}
      </div>
      <div className='flex items-center justify-between flex-wrap gap-4 mb-5'>
        <SelectMarket />
        <div className='flex items-center justify-center w-full md:w-auto'>
          <Segmented
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
          <Table
            columns={columns}
            dataSource={data}
            pagination={{ position: ['none'], pageSize }}
          />
        </div>
        <div className='pt-6 flex items-center justify-between table-pagination'>
          <div className='hidden md:block'>{_renderRange()}</div>
          <div className='flex items-center justify-center w-full md:w-auto'>
            <Pagination
              total={total}
              pageSize={pageSize}
              current={currentPage}
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
};

export default Markets;
