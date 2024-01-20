import { ColumnsType } from 'antd/es/table';
import { Flex, Tag } from 'antd';
import Image from 'next/image';
import { nFormatter } from '@/helpers';
import { StarIcon } from '@heroicons/react/24/outline';
import GraphLine from '../graph-line';

export const FundraisingCategory = {
  FundingRounds: 'funding-rounds',
  TopBackers: 'top-backers',
  Overview: 'overview',
};

export const getBreadcrumbConfig = () => {
  return [
    {
      title: 'BlockUltra',
    },
    {
      title: 'Categories',
    },
    {
      title: 'Currency',
    },
  ];
};

export const categoryColumns: ColumnsType<any> = [
  {
    title: '#',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    fixed: true,
    render: (_, { name, icon }) => (
      <Flex align={'center'} gap={8}>
        <Image src={icon} alt={'icon'} width={24} height={24} />
        <span>{name}</span>
        <Tag>BTC</Tag>
      </Flex>
    ),
  },
  {
    title: 'Rate',
    dataIndex: 'rate',
    key: 'rate',
    render: (value) =>
      value ? (
        <div className='flex items-center gap-1'>
          <span>{value}</span>
          <svg
            width='16'
            height='16'
            viewBox='0 0 16 16'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <g clip-path='url(#clip0_3574_233858)'>
              <path
                d='M8.00002 0.400391L10.45 5.40038L16 6.2004L12 10.1004L12.95 15.6004L8.00002 13.0004L3.05002 15.6004L4.00001 10.1004L0 6.2004L5.55001 5.40038L8.00002 0.400391Z'
                fill='#FFD243'
              />
              <path
                d='M8.00079 8.0004V0.400391L5.55078 5.40038L8.00079 8.0004Z'
                fill='#FFB845'
              />
              <path
                d='M16 6.20041L8 8.00041L10.45 5.40039L16 6.20041Z'
                fill='#FFB845'
              />
              <path d='M8 8L12.95 15.6L12 10.1L8 8Z' fill='#FFB845' />
              <path
                d='M3.05078 15.6L8.00078 8V13L3.05078 15.6Z'
                fill='#FFB845'
              />
              <path
                d='M8.00002 8.00117L0 6.20117L4.00001 10.1012L8.00002 8.00117Z'
                fill='#FFB845'
              />
            </g>
            <defs>
              <clipPath id='clip0_3574_233858'>
                <rect width='16' height='16' fill='white' />
              </clipPath>
            </defs>
          </svg>
        </div>
      ) : null,
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
    render: (price) => nFormatter(price, 2, ''),
  },
  {
    title: '24h %',
    dataIndex: 'hours',
    key: 'hours',
    render: (hours) => (
      <span className={hours > 0 ? 'text-green-500' : 'text-red-500'}>
        {hours > 0 ? '+' : '-'}
        {hours}%
      </span>
    ),
  },
  {
    title: 'Volume (24h)',
    dataIndex: 'volume',
    key: 'volume24h',
    render: (volume) => nFormatter(volume, 2, 'B'),
  },
  {
    title: 'Market Cap',
    dataIndex: 'marketCap',
    key: 'marketCap',
    render: (marketCap) => nFormatter(marketCap, 2, 'B'),
  },
  {
    title: 'Price Graph (7d)',
    dataIndex: 'priceGraph',
    key: 'priceGraph',
    render: (priceGraph) => (
      <GraphLine data={priceGraph} color='#FA3363' height={50} width={136} />
    ),
  },
];
