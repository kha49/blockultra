import { Flex } from 'antd';
import Table, { ColumnsType } from 'antd/es/table';
import Link from 'next/link';
import { ReactNode } from 'react';

interface IData {
  id: number;
  name: ReactNode | string;
  price: string;
  period: string;
  volume: string;
  graph: string;
}

type TopDataProps = {
  title: string;
  data: IData[];
};

const TopData = ({ title }: TopDataProps) => {
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
        />
      </div>
    </Flex>
  );
};

export default TopData;

const columns: ColumnsType<IData> = [
  {
    key: 'id',
    title: '#',
    width: 56,
    align: 'left',
    render: (_, value) => {
      return value.id;
    },
  },
  {
    key: 'name',
    title: 'Name',
    width: 248,
    align: 'left',
    render: (_, value) => {
      return value.name;
    },
  },

  {
    key: 'price',
    title: 'Price',
    width: 151,
    align: 'right',
    render: (_, value) => {
      return value.price;
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
          {value.period}
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
      return value.volume;
    },
  },
];

const data: IData[] = [
  {
    id: 1,
    name: (
      <div className='flex items-center'>
        <svg
          width='32'
          height='32'
          viewBox='0 0 32 32'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <g clipPath='url(#clip0_596_42130)'>
            <path
              d='M16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32Z'
              fill='#F3BA2F'
            />
            <path
              d='M12.116 14.404L16 10.52L19.886 14.406L22.146 12.146L16 6L9.856 12.144L12.116 14.404ZM6 16L8.26 13.74L10.52 16L8.26 18.26L6 16ZM12.116 17.596L16 21.48L19.886 17.594L22.146 19.853L16 26L9.856 19.856L9.853 19.853L12.116 17.596ZM21.48 16L23.74 13.74L26 16L23.74 18.26L21.48 16ZM18.292 15.998H18.294V16L16 18.294L13.709 16.004L13.705 16L13.709 15.997L14.11 15.595L14.305 15.4L16 13.706L18.293 15.999L18.292 15.998Z'
              fill='white'
            />
          </g>
          <defs>
            <clipPath id='clip0_596_42130'>
              <rect width='32' height='32' fill='white' />
            </clipPath>
          </defs>
        </svg>
        <Link href='/detail' className='mx-2'>
          Bitcoin
        </Link>
        <span className='px-2 bg-[#EEF2F6] text-[#9FA4B7] leading-5'>BTC</span>
      </div>
    ),
    price: '$12.168',
    period: '+5.63%',
    volume: '$345.65B',
    graph: 'increase',
  },
];
