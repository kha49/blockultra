'use client';
import { Flex, Pagination, Table, Tag } from 'antd';
import { ColumnsType } from 'antd/es/table';
import Image from 'next/image';
import React from 'react';
import SelectItemTable from '@/components/SelectItemTable';
import './styles.scss';
import HeadFilter from '../head-filter';
import { IIeoIdoData } from '../../types';
import DataGroup from '@/components/DataGroup';
import BankersModal from '../bankers-modal';
import LaunchpadModal from '../launchpad-modal';

const columns: ColumnsType<IIeoIdoData> = [
  {
    title: 'Project',
    dataIndex: 'project',
    key: 'project',
    render: (_, { project }) => (
      <Flex align={'center'} gap={8}>
        <Image src={project.icon} alt={'icon'} width={24} height={24} />
        <span>{project.name}</span>
        <Tag className={'bg-[#F1F4F7]'} bordered={false}>
          {project.tag}
        </Tag>
        {project.isHot && (
          <Image alt='hot' src={'/hot.svg'} width={12} height={12} />
        )}
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
    render: (_, { backers }) => (
      <BankersModal data={backers}>
        {({ onOpen }) => <DataGroup data={backers} onClick={onOpen} />}
      </BankersModal>
    ),
  },
  {
    title: 'Category',
    dataIndex: 'category',
    key: 'category',
  },
  {
    title: 'Launchpad',
    dataIndex: 'launchpadList',
    key: 'launchpadList',
    render: (_, { launchpadList }) => (
      <LaunchpadModal data={launchpadList}>
        {({ onOpen }) => <DataGroup data={launchpadList} onClick={onOpen} />}
      </LaunchpadModal>
    ),
  },
  {
    title: 'Start Date',
    dataIndex: 'startedDate',
    key: 'startedDate',
  },
];

const data: IIeoIdoData[] = [
  {
    project: {
      name: 'BTC',
      icon: '/coin-info/wallets-1.png',
      tag: 'BTC',
      isHot: true,
    },
    initialCap: 100.0,
    totalRaise: 345.65,
    backers: Array.from(Array(5)).map((_, idx) => ({
      avatarUrl: 'https://picsum.photos/200/300?random=' + idx,
      name: 'launchpad ' + idx,
      group: 'Group ' + (idx % 2 ? 1 : 2),
    })),
    launchpadList: Array.from(Array(5)).map((_, idx) => ({
      avatarUrl: 'https://picsum.photos/200/300?random=' + idx,
      name: 'launchpad ' + idx,
    })),
    category: 'GameFi',
    startedDate: '2021-09-01',
  },
];

export const IeoIdoTable = () => {
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
