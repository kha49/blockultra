import { Flex, Pagination, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import HeadFilter from '../HeadFilter';
import { categoryColumns } from './config';
import { useParams } from 'next/navigation';
import SelectItemTable from '@/components/SelectItemTable';
import { faker } from '@faker-js/faker';

const mockData = [
  {
    id: 1,
    name: 'Bitcoin',
    symbol: 'BTC',
    icon: 'https://img.cryptorank.io/coins/150x150.bitcoin1524754012028.png',
    rate: 4.8,
    price: 10000,
    hours: 5.5,
    volume24h: 1000000,
    marketCap: 1000000,
    priceGraph: [...Array(20)].map(() => faker.number.int({ min: 0, max: 60 })),
  },
];

export default function CategoryTable() {
  const params = useParams<{ locale: string; id: string }>();

  const [data, setData] = useState<any[]>(mockData);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);

  const _onChangePage = (page: number) => {
    setCurrentPage(page);
  };

  const _onChangeSize = (value: number) => {
    setCurrentPage(1);
    setPageSize(value);
  };

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
    <div className='mt-4 category-table'>
      <Flex vertical gap={16} className={'p-6'}>
        <HeadFilter />
        <Table
          columns={categoryColumns}
          dataSource={data as any}
          pagination={false}
          className='overflow-x-auto overflow-y-hidden'
        />
        <div className='pt-6 flex items-center justify-center table-pagination pagination-mobile'>
          <Pagination
            total={total}
            pageSize={pageSize}
            current={currentPage}
            onChange={_onChangePage}
            showSizeChanger={false}
          />
        </div>
        <div className='pt-6 flex flex-wrap gap-6 items-center justify-between table-pagination'>
          <div>{_renderRange()}</div>
          <div className='pagination-desktop'>
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
      </Flex>
    </div>
  );
}
