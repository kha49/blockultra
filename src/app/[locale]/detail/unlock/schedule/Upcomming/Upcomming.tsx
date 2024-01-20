import { IconArrowDown } from '@/assets/icons/IconArrowDown';
import IconCheckedCompleted from '@/assets/icons/IconCheckedCompleted';
import IconCircle from '@/assets/icons/IconCircle';
import Calendar from '@/components/Calendar/Calendar';
import CountdownTimer from '@/components/CountdownTimer/CountDownTimer';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';

const columns: ColumnsType<IUpcomming> = [
  {
    key: 'date',
    title: 'Date',
    align: 'left',
    width: 270,
    render: (_, value) => {
      return (
        <div className='flex items-center gap-4'>
          <Calendar />
          <IconCircle color='#F89152' />
          <span className='text-orange-400 text-sm font-medium font-jm'>
            20 hours left
          </span>
        </div>
      );
    },
  },
  {
    key: 'token',
    title: 'Tokens',
    width: 400,
    align: 'center',
    render: (_, value) => {
      return (
        <div className='text-center'>
          <div className='text-grey-700 text-sm mb-2 font-bold font-jb'>
            Ecosystem
          </div>
          <div className='text-xs font-medium text-grey-500'>20%</div>
        </div>
      );
    },
  },
  {
    key: 'value',
    title: 'Value',
    width: 300,
    align: 'center',
    render: (_, value) => {
      return (
        <div className='text-center'>
          <div className='text-grey-700 text-sm mb-2 font-bold font-jb'>
            Ecosystem
          </div>
          <div className='text-xs font-medium text-grey-500'>20%</div>
        </div>
      );
    },
  },
  {
    key: 'rounds',
    title: 'Rounds',
    align: 'center',
    render: (_, value) => {
      return (
        <div className='flex items-center gap-10'>
          <div className={false ? 'max-h-[40px] overflow-hidden' : ''}>
            <div className='flex gap-2 items-center text-grey-500 text-xs font-medium font-jm mb-2'>
              <span>Ecosystem</span>
              <span className='text-grey-500'>NBIT 50.05M</span>
            </div>
            <div className='flex gap-2 items-center text-grey-500 text-xs font-medium font-jm mb-2'>
              <span>Ecosystem</span>
              <span className='text-grey-500'>NBIT 50.05M</span>
            </div>
            <div className='flex gap-2 items-center text-grey-500 text-xs font-medium font-jm mb-2'>
              <span>Ecosystem</span>
              <span className='text-grey-500'>NBIT 50.05M</span>
            </div>
            <div className='flex gap-2 items-center text-grey-500 text-xs font-medium font-jm mb-2'>
              <span>Ecosystem</span>
              <span className='text-grey-500'>NBIT 50.05M</span>
            </div>
            <div className='flex gap-2 items-center text-grey-500 text-xs font-medium font-jm mb-2'>
              <span>Ecosystem</span>
              <span className='text-grey-500'>NBIT 50.05M</span>
            </div>
          </div>
          <div className='flex gap-2'>
            6 Rounds
            <IconArrowDown />
          </div>
        </div>
      );
    },
  },
];

const Upcomming = () => {
  const data = [
    {
      date: 1,
      tokens: 1,
      value: 1,
      rounds: 1,
    },
    {
      date: 1,
      tokens: 1,
      value: 1,
      rounds: 1,
    },
  ];
  return (
    <div>
      <div className='overflow-x-auto hide-scroll'>
        <Table
          columns={columns}
          dataSource={data}
          pagination={{ position: ['none'] }}
        />
      </div>
    </div>
  );
};

export default Upcomming;
