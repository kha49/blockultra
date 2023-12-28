import { IconBitcoin } from '@/assets/icons/home/gainers/IconBitcoin';
import { renderSortIcon } from '@/helpers';
import { Flex } from 'antd';
import Table, { ColumnsType } from 'antd/es/table';
import { isArray } from 'lodash';
import Link from 'next/link';
import { ReactNode, useState } from 'react';

interface IData {
  id: number;
  name: ReactNode | string;
  price: string;
  period: string;
  volume: string;
  graph: string;
  icon?: string | JSX.Element;
  code?: string;
}

type TopDataProps = {
  title: string;
  data: IData[];
};

const TopData = ({ title }: TopDataProps) => {
  const [order, setOrder] = useState({
    columnKey: '',
    order: '',
  });

  return (
    <Flex className='flex-1 flex-col gap-4'>
      <h4 className='font-bold text-[#333747] text-[20px] tracking-[0] leading-[28px] whitespace-nowrap'>
        {title}
      </h4>
      <div className='overflow-x-auto'>
        <Table
          columns={columns}
          dataSource={data}
          pagination={{ position: ['none'] }}
          rowKey='id'
          onChange={(_page, _filter, sort) => {
            const itemSort = isArray(sort) ? sort[0] : sort;
            setOrder({
              columnKey: itemSort.columnKey
                ? itemSort.columnKey.toString()
                : '',
              order: itemSort.order ? itemSort.order.toString() : '',
            });
          }}
          showSorterTooltip={false}
        />
      </div>
    </Flex>
  );
};

export default TopData;

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
        <div className='flex items-center'>
          {value.icon}
          <Link href='/en/detail' className='mx-2'>
            {value.name}
          </Link>
          <span className='px-2 bg-[#EEF2F6] text-[#9FA4B7] leading-5'>
            {value.code}
          </span>
        </div>
      );
    },
    sortIcon: renderSortIcon,
    sorter: true,
  },

  {
    key: 'price',
    title: 'Price',
    width: 151,
    align: 'right',
    render: (_, value) => {
      return value.price.USD;
    },
    sortIcon: renderSortIcon,
    sorter: true,
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
    sortIcon: renderSortIcon,
    sorter: true,
  },
  {
    key: 'volume',
    title: 'Volume (24h)',
    width: 186,
    align: 'right',
    render: (_, value) => {
      return value.volume24h;
    },
    sortIcon: renderSortIcon,
    sorter: true,
  },
];

const data: IData[] = [
  ...Array.from(Array(20).keys()).map((e) => ({
    id: e + 1,
    name: 'Bitcoin',
    icon: <IconBitcoin />,
    code: 'BTC',
    price: '$12.168',
    period: e % 2 ? '+5.63%' : '-10.10%',
    volume: '$345.65B',
    graph: e % 2 ? 'increase' : 'down',
  })),
];
