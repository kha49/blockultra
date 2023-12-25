import { IconStar } from '@/assets/icons';
import { useEffect, useState } from 'react';
import './style.scss';
import { Pagination, Table, Tabs } from 'antd';
import type { PaginationProps } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { FetchTrendings } from '../../../usecases/home';
import { caculatorAverage24h } from '@/helpers/functions';

const columns: ColumnsType<any> = [
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
    width: 248,
    align: 'left',
    render: (_, value) => {
      return (
        <p className='inline-flex items-center'>
          <img src={value.image.icon} width={32} />
          <span className='ml-2'>{value.name}</span>
        </p>
      );
    },
  },
  {
    key: 'rate',
    title: 'Rate',
    width: 91,
    align: 'left',
    render: (_, value) => {
      return (
        <p className='inline-flex items-center'>
          <span className='mr-1'>{value.rate}</span> <IconStar />
        </p>
      );
    },
  },
  {
    key: 'price',
    title: 'Price',
    width: 151,
    align: 'right',
    render: (_, value) => {
      return value.price['USD'];
    },
  },
  {
    key: 'period',
    title: '24h %',
    width: 167,
    align: 'right',
    render: (_, value) => {
      return (
        <p
          style={{ color: value.graph === 'increase' ? '#1AB369' : '#FA3363' }}
        >
          {value.average24}
        </p>
      );
    },
  },
  {
    key: 'volume',
    title: 'Volume (24h)',
    width: 186,
    align: 'right',
    render: (_, value) => {
      return value.volume24h;
    },
  },
  {
    key: 'marketCap',
    title: 'Market Cap',
    width: 168,
    align: 'right',
    render: (_, value) => {
      return value.marketCap;
    },
  },
  {
    key: 'graph',
    title: 'Price Graph (7d)',
    width: 261,
    align: 'right',
    render: (_, value) => {
      return (
        <div className='flex items-center justify-end'>
          <img src={`data:image/svg+xml;base64,${value.chart}`} />
        </div>
      );
    },
  },
];

const IconFire = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
    >
      <path
        d='M19.5 14.0003C19.5 18.1354 16.136 21.5003 12 21.5003C7.864 21.5003 4.5 18.1354 4.5 14.0003C4.5 11.7523 5.142 10.1513 6.646 8.64635C6.941 8.35035 7.275 8.05434 7.621 7.74834C9.037 6.49434 10.5 5.19737 10.5 2.99937C10.5 2.81537 10.602 2.64533 10.764 2.55833C10.926 2.47133 11.123 2.48036 11.277 2.58336C11.337 2.62336 16.915 6.44633 14.055 13.0143C14.726 12.6393 15.529 12.0243 16.022 11.0693C16.338 10.4573 16.499 9.76137 16.499 8.99937C16.499 8.79637 16.622 8.61336 16.81 8.53636C16.996 8.45936 17.213 8.50336 17.356 8.64836C18.719 10.0334 19.5 11.9844 19.5 14.0003Z'
        fill='url(#paint0_linear_2870_33418)'
      />
      <defs>
        <linearGradient
          id='paint0_linear_2870_33418'
          x1='12'
          y1='2.49902'
          x2='12'
          y2='21.5003'
          gradientUnits='userSpaceOnUse'
        >
          <stop stop-color='#FAA93F' />
          <stop offset='1' stop-color='#F04636' />
        </linearGradient>
      </defs>
    </svg>
  );
};

const Trending = () => {
  const [params, setParams] = useState({
    search_key: '',
    sort_by: '',
    sort_order: '',
    limit: 0,
    page: 0,
  });
  const [trendings, setTrendings] = useState();
  const [total, setTotal] = useState();
  const showTotal = (total: number) => `Total ${total} items`;
  function getTrendings(params: any) {
    FetchTrendings(params).then((res: any) => {
      res.data.map((item: any) => {
        const average24 = caculatorAverage24h(item.price, item.histPrices);
        item.average24 = average24;
        return item;
      });
      setTrendings(res.data);
      setTotal(res.total);
    });
  }
  const onChange: PaginationProps['onChange'] = (pageNumber) => {
    setParams({ ...params, page: pageNumber });
  };

  const onShowSizeChange: PaginationProps['onShowSizeChange'] = (
    current,
    pageSize
  ) => {
    const newParam = { ...params, page: current, limit: pageSize };
    setParams(newParam);
  };

  useEffect(() => {
    getTrendings(params);
  }, [params]);

  const tabs = [
    'Trending Coins',
    'Real World Assets',
    'Zero Knowledge (ZK)',
    'Binance Launchpad ',
  ];

  return (
    <div className='tab-trending'>
      <Tabs
        defaultActiveKey='1'
        items={tabs.map((label, i) => {
          const id = String(i + 1);
          return {
            key: id,
            label: label,
            children: (
              <div className='overflow-x-auto'>
                <Table
                  columns={columns}
                  dataSource={trendings}
                  pagination={{ position: ['none'] }}
                  rowKey='id'
                />
                <div className='p-6 flex items-center justify-center'>
                  <Pagination
                    total={total}
                    showTotal={(total) => showTotal(total)}
                    showSizeChanger
                    showQuickJumper
                    onChange={onChange}
                    onShowSizeChange={onShowSizeChange}
                  />
                </div>
              </div>
            ),
            icon: <IconFire />,
          };
        })}
      />
    </div>
  );
};

export default Trending;
