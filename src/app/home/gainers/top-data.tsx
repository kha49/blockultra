import {
  currencyFormat,
  nFormatter,
  percentFormat,
  renderSortIcon,
} from '@/helpers';
import { ColumnsType } from 'antd/es/table';
import { isArray } from 'lodash';
import Link from 'next/link';
import { useState } from 'react';
import { IGainer } from './props';
import CommonTable from '@/components/CommonTable/common-table';

type TopDataProps = {
  title: string;
  data: IGainer[];
  onChangeOrder: ({
    columnKey,
    order,
  }: {
    columnKey: string;
    order: string;
  }) => void;
};

const TopData = ({ title, data, onChangeOrder }: TopDataProps) => {
  const [order, setOrder] = useState({
    columnKey: '',
    order: '',
  });
  return (
    <div className='flex-1 flex-col gap-4'>
      <h4 className='font-bold text-[#333747] text-[20px] tracking-[0] leading-[28px] mb-4 whitespace-nowrap'>
        {title}
      </h4>
      <div className='overflow-x-auto hide-scroll'>
        <CommonTable
          fixedWidth={true}
          columns={columns}
          dataSource={data}
          pagination={{ position: ['none'] }}
          rowKey='id'
          // onChange={(_page, _filter, sort) => {
          //   const itemSort = isArray(sort) ? sort[0] : sort;
          //   const newOr = {
          //     columnKey: itemSort.columnKey
          //       ? itemSort.columnKey.toString()
          //       : '',
          //     order: itemSort.order ? itemSort.order.toString() : '',
          //   };
          //   setOrder(newOr);
          //   onChangeOrder(newOr);
          // }}
          showSorterTooltip={false}
        />
      </div>
    </div>
  );
};

export default TopData;

const columns: ColumnsType<any> = [
  {
    key: 'id',
    title: '#',
    width: 24,
    align: 'left',
    render: (_, value, index) => {
      return index + 1;
    },
  },
  {
    key: 'name',
    title: 'Name',
    width: 186,
    align: 'left',
    sorter: (a, b) => a.name.localeCompare(b.name),
    sortDirections: ['ascend', 'descend'],
    render: (_, value) => {
      return (
        <div className='flex items-center'>
          <img width={32} height={32} alt={value.name} src={value.image.x60} />
          {value.icon}
          <p className='textover-ellipsis'>
            <Link href={`/en/detail/${value.key}`} className='mx-2'>
              {value.name}
            </Link>
          </p>

          {value.symbol ? (
            <span className='ml-2 px-2 rounded py-0 bg-[#EEF2F6] text-[#9FA4B7] leading-5 text-xs'>
              {value.symbol}
            </span>
          ) : null}
        </div>
      );
    },
    sortIcon: renderSortIcon,
  },

  {
    key: 'price',
    title: 'Price',
    width: 90,
    align: 'right',
    sorter: (a, b) => a.price - b.price,
    sortDirections: ['ascend', 'descend'],
    render: (_, value) => {
      return currencyFormat(value.price, '$', {
        numberRound: 4,
        isAutoZero: true,
        addToolTip: true,
      });
    },
    sortIcon: renderSortIcon,
    // sorter: true,
  },
  {
    key: 'priceChangeIn24',
    title: '24h %',
    width: 74,
    align: 'right',
    sorter: (a, b) => a.priceChangeIn24 - b.priceChangeIn24,
    render: (_, value) => {
      return percentFormat(value.priceChangeIn24);
    },
    sortIcon: renderSortIcon,
  },
  {
    key: 'volume24h',
    title: 'Volume (24h)',
    width: 100,
    align: 'right',
    render: (_, value) => {
      return nFormatter(value.volume24h, 2, '$');
    },
    sortIcon: renderSortIcon,
    sorter: (a, b) => a.volume24h - b.volume24h,
  },
];
