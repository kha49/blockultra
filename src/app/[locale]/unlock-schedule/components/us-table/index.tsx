'use client';
import { Avatar, Flex, Pagination, Progress, Table, Tag, Tooltip } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { UsHeader } from './us-header';
import { IUnlockData } from '../../types';
import Image from 'next/image';
import clsx from 'clsx';
import React from 'react';
import { values } from 'lodash';
import SelectItemTable from '@/components/SelectItemTable';

const columns: ColumnsType<IUnlockData> = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (_, { name }) => (
      <Flex align={'center'} gap={8}>
        <Image src={name.icon} alt={'icon'} width={24} height={24} />
        <span>{name.displayName}</span>
        <Tag className={'bg-[#F1F4F7]'} bordered={false}>
          {name.tag}
        </Tag>
      </Flex>
    ),
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
    render: (_, { price }) => (
      <Flex vertical align={'center'} gap={8}>
        <span>{price.value}</span>
        <span
          className={clsx(
            'font-bold',
            price.ratio > 0 ? 'text-green-500' : 'text-red-500'
          )}
        >
          {price.ratio}%
        </span>
      </Flex>
    ),
  },
  {
    title: 'Market Cap',
    dataIndex: 'marketCap',
    key: 'marketCap',
    render: (_, { marketCap }) => <>${marketCap}B</>,
  },
  {
    title: 'Launchpad',
    dataIndex: 'launchpadList',
    key: 'launchpadList',
    render: (_, { launchpadList }) => (
      <>
        <Avatar.Group
          maxCount={3}
          maxPopoverTrigger='click'
          size='large'
          maxStyle={{
            color: '#f56a00',
            backgroundColor: '#fde3cf',
            cursor: 'pointer',
          }}
        >
          {launchpadList.map((item) => (
            <Avatar src={item.avatarUrl} key={item.avatarUrl} />
          ))}
        </Avatar.Group>
      </>
    ),
  },
  {
    title: 'IDO/IEO ROI',
    dataIndex: 'roi',
    key: 'roi',
    render: (_, { roi }) => <>{roi ? `${roi}x` : 'N/A'}</>,
  },
  {
    title: 'Unlock Progress',
    dataIndex: 'process',
    key: 'process',
    render: (_, { process }) => (
      <Tooltip
        title={
          <Flex vertical className={'text-[#333747]'}>
            <Flex align={'center'} gap={8}>
              <span>Unlocked</span>
              <span>{process.unlock.ratio}%</span>
              <span className={'text-[#9FA4B7]'}>
                {process.unlock.name} {process.unlock.value}M
              </span>
            </Flex>
            <Flex align={'center'} gap={8}>
              <span>Locked</span>
              <span>{process.lock.ratio}%</span>
              <span className={'text-[#9FA4B7]'}>
                {process.lock.name} {process.lock.value}M
              </span>
            </Flex>
          </Flex>
        }
        color={'white'}
      >
        <span>{process.value}%</span>
        <Progress percent={process.value} showInfo={false} />
      </Tooltip>
    ),
  },
  {
    title: 'Next Unlock',
    dataIndex: 'nextUnlock',
    key: 'nextUnlock',
    render: (_, { nextUnlock }) => (
      <Flex gap={44}>
        <Flex className={'text-md'} vertical gap={8}>
          <span className={'font-semibold text-[#333747]'}>
            ${nextUnlock.value}M
          </span>
          <span className={'text-[#9FA4B7]'}>
            {nextUnlock.ratio} of {nextUnlock.name}
          </span>
        </Flex>

        <Flex className={'text-md'} gap={8}>
          <Flex vertical align={'center'} className={'w-[42px]'}>
            <Tag bordered={false} className={'text-black mr-0'}>
              {nextUnlock.time.d}
            </Tag>
            <span className={'text-[#9FA4B7]'}>D</span>
          </Flex>

          <span>:</span>

          <Flex vertical align={'center'} className={'w-[42px]'}>
            <Tag
              bordered={false}
              className={'text-black w-full text-center mr-0'}
            >
              {nextUnlock.time.h}
            </Tag>
            <span className={'text-[#9FA4B7]'}>H</span>
          </Flex>

          <span>:</span>

          <Flex vertical align={'center'} className={'w-[42px]'}>
            <Tag
              bordered={false}
              className={'text-black w-full text-center mr-0'}
            >
              {nextUnlock.time.m}
            </Tag>
            <span className={'text-[#9FA4B7]'}>M</span>
          </Flex>
        </Flex>
      </Flex>
    ),
  },
];

const data: IUnlockData[] = [
  {
    name: {
      displayName: 'BTC',
      icon: '/coin-info/wallets-1.png',
      tag: 'BTC',
    },
    price: {
      value: 0.00036,
      ratio: 5.63,
    },
    marketCap: 345.65,
    launchpadList: Array.from(Array(5)).map((_, idx) => ({
      avatarUrl: 'https://picsum.photos/200/300?random=' + idx,
    })),
    roi: 123,
    process: {
      value: 15.32,
      lock: {
        ratio: 15.32,
        name: 'NBIT',
        value: 618.22,
      },
      unlock: {
        ratio: 84.68,
        name: 'NBIT',
        value: 618.22,
      },
    },
    nextUnlock: {
      value: 58.28,
      ratio: 0.55,
      name: 'M.Cap',
      time: {
        d: 169,
        h: 26,
        m: 18,
      },
    },
  },
];

export const UsTable = () => {
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
    <div className={'us-table'}>
      <UsHeader />
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
    </div>
  );
};
