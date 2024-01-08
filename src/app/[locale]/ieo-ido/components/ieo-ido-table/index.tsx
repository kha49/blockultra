'use client';
import { Flex, Pagination, Table, Tag } from 'antd';
import { ColumnsType } from 'antd/es/table';
import Image from 'next/image';
import React, { useCallback, useEffect, useState } from 'react';
import SelectItemTable from '@/components/SelectItemTable';
import './styles.scss';
import HeadFilter from '../head-filter';
import { IIeoIdoData } from '../../types';
import DataGroup from '@/components/DataGroup';
import BankersModal from '../bankers-modal';
import LaunchpadModal from '../launchpad-modal';
import { IResponseAxios } from '@/models/IResponse';
import { ORDER } from '@/helpers/constants';
import { FetchIeoIdoUpcoming } from '@/usecases/ieo-ido';

const columns: ColumnsType<any> = [
  {
    title: 'Project',
    dataIndex: 'project',
    key: 'project',
    render: (_, { name, image, tag, isHot }) => (
      <Flex align={'center'} gap={8}>
        {/* <Image src={image} alt={'icon'} width={24} height={24} /> */}
        <span>{name}</span>
        <Tag className={'bg-[#F1F4F7]'} bordered={false}>
          {tag}
        </Tag>
        {isHot && <Image alt='hot' src={'/hot.svg'} width={12} height={12} />}
      </Flex>
    ),
  },
  {
    title: 'Initial Cap',
    dataIndex: 'initialCap',
    key: 'initialCap',
    render: (_, { initialCap }) => <>${initialCap}M</>,
  },
  {
    title: 'Total Raise',
    dataIndex: 'totalRaise',
    key: 'totalRaise',
    render: (_, { totalRaise }) => <>${totalRaise}M</>,
  },
  {
    title: 'Backers',
    dataIndex: 'backers',
    key: 'backers',
    render: (_, { funds }) => (
      <BankersModal data={funds}>
        {({ onOpen }) => <DataGroup data={funds} onClick={onOpen} />}
      </BankersModal>
    ),
  },
  {
    title: 'Category',
    dataIndex: 'category',
    key: 'category',
    render: (_, { category }) => <>{category.name}</>,
  },
  {
    title: 'Launchpad',
    dataIndex: 'launchpadList',
    key: 'launchpadList',
    render: (_, { launchpads }) => (
      <LaunchpadModal data={launchpads}>
        {({ onOpen }) => <DataGroup data={launchpads} onClick={onOpen} />}
      </LaunchpadModal>
    ),
  },
  {
    title: 'Start Date',
    dataIndex: 'startedDate',
    key: 'startedDate',
    render: (_, { start_date }) => <>{start_date}</>,
  },
];

export const IeoIdoTable = () => {
  const [data, setData] = useState<IIeoIdoData[]>([]);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);

  const [order, setOrder] = useState({
    columnKey: '',
    order: '',
  });

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

  const getIeoIdoUpComing = useCallback(async () => {
    const response: IResponseAxios<IIeoIdoData> = await FetchIeoIdoUpcoming({
      limit: pageSize,
      page: currentPage,
      sort_by: order.columnKey,
      sort_order: ORDER[order.order],
    });

    if (!response) return;
    const { data, total } = response;
    setData(data);
    setTotal(total!!);
  }, [pageSize, currentPage, order]);

  useEffect(() => {
    getIeoIdoUpComing();
  }, [getIeoIdoUpComing, pageSize, currentPage, order]);

  return (
    <Flex vertical gap={16} className={'ieo-ido-table'}>
      <HeadFilter />
      <Table
        columns={columns}
        dataSource={data}
        pagination={{ position: ['none'], pageSize }}
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

      <div className='pt-6 flex items-center justify-between table-pagination'>
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
  );
};
