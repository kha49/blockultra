import { ColumnsType } from 'antd/es/table';
import { Flex, Tag } from 'antd';
import Image from 'next/image';
import { nFormatter, percentFormat } from '@/helpers';
import { CategoryCoinsType } from '../../types';
import { IconStar } from '@/assets/icons';
import Link from 'next/link';
import { changeImageUrl } from '@/helpers/functions';

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

export const categoryColumns: ColumnsType<CategoryCoinsType> = [
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
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    sorter: true,
    fixed: true,
    width: 200,
    render: (_, { name, image, symbol, key }) => (
      <Flex align={'center'} gap={8}>
        <img
          src={changeImageUrl(image.icon)}
          alt={'icon'}
          width={24}
          height={24}
        />
        <Link
          href={`/en/detail/${key}`}
          className='mx-2 text-grey-700 hover:text-primary-500 truncate max-w-[160px]'
        >
          {name}
        </Link>
        <Tag>{symbol}</Tag>
      </Flex>
    ),
  },
  {
    title: 'Rate',
    dataIndex: 'rate',
    key: 'rate',
    sorter: false,
    width: 60,
    render: (value) =>
      value ? (
        <div className='flex items-center gap-1'>
          <span>{value}</span>
          <IconStar />
        </div>
      ) : (
        <>-</>
      ),
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
    sorter: true,
    width: 120,
    render: (price) => nFormatter(price, 2, '$'),
  },
  {
    title: '24h %',
    dataIndex: 'priceChangeIn24h',
    width: 120,
    sorter: true,
    key: 'priceChangeIn24h',
    render: (value) => percentFormat(value),
  },
  {
    title: 'Volume (24h)',
    dataIndex: 'volume24h',
    sorter: true,
    width: 120,
    key: 'volume24h',
    render: (volume) => nFormatter(Number(volume), 2, '$'),
  },
  {
    title: 'Market Cap',
    dataIndex: 'marketCap',
    width: 120,
    sorter: true,
    key: 'marketCap',
    render: (marketCap) => nFormatter(marketCap, 2, '$'),
  },
  {
    title: 'Price Graph (7d)',
    dataIndex: 'chart',
    key: 'chart',
    width: 261,
    align: 'right',
    render: (value) => {
      try {
        return (
          <div className='flex items-center justify-end'>
            <img
              alt='chart'
              width={200}
              height={52}
              src={changeImageUrl(value)}
            />
          </div>
        );
      } catch (error) {
        return null;
      }
    },
  },
];
