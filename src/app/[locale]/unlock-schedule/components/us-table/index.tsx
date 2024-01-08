'use client';
import { Avatar, Flex, Pagination, Progress, Table, Tag, Tooltip } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { UsHeader } from './us-header';
import { IUnlockData } from '../../types';
import Image from 'next/image';
import clsx from 'clsx';
import React, { useCallback, useEffect, useState } from 'react';
import SelectItemTable from '@/components/SelectItemTable';
import { IResponseAxios } from '@/models/IResponse';
import { FetchTokenUnlock } from '@/usecases/token-unlock';
import { ORDER } from '@/helpers/constants';

const columns: ColumnsType<any> = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (_, { name, image }) => {
      debugger;
      return (
        <Flex align={'center'} gap={8}>
          <Image src={name.icon} alt={'icon'} width={24} height={24} />
          <span>{name}</span>
          <Tag className={'bg-[#F1F4F7]'} bordered={false}>
            {name.tag}
          </Tag>
        </Flex>
      );
    },
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
    render: (_, { price }) => {
      return (
        <Flex vertical align={'center'} gap={8}>
          <span>{price}</span>
          <span
            className={clsx(
              'font-bold',
              price > 0 ? 'text-green-500' : 'text-red-500'
            )}
          >
            {price}%
          </span>
        </Flex>
      );
    },
  },
  {
    title: 'Market Cap',
    dataIndex: 'marketCap',
    key: 'marketCap',
    render: (_, { marketCap }) => <>${marketCap}B</>,
  },
  // {
  //   title: 'Launchpad',
  //   dataIndex: 'launchpadList',
  //   key: 'launchpadList',
  //   render: (_, { launchpadList }) => (
  //     <>
  //       <Avatar.Group
  //         maxCount={3}
  //         maxPopoverTrigger='click'
  //         size='large'
  //         maxStyle={{
  //           color: '#f56a00',
  //           backgroundColor: '#fde3cf',
  //           cursor: 'pointer',
  //         }}
  //       >
  //         {launchpadList.map((item) => (
  //           <Avatar src={item.avatarUrl} key={item.avatarUrl} />
  //         ))}
  //       </Avatar.Group>
  //     </>
  //   ),
  // },
  {
    title: 'IDO/IEO ROI',
    dataIndex: 'roi',
    key: 'roi',
    render: (_, { roi }) => <>{roi ? `${roi}x` : 'N/A'}</>,
  },
  // {
  //   title: 'Unlock Progress',
  //   dataIndex: 'process',
  //   key: 'process',
  //   render: (_, { process }) => (
  //     <Tooltip
  //       title={
  //         <Flex vertical className={'text-[#333747]'}>
  //           <Flex align={'center'} gap={8}>
  //             <span>Unlocked</span>
  //             <span>{process.unlock.ratio}%</span>
  //             <span className={'text-[#9FA4B7]'}>
  //               {process.unlock.name} {process.unlock.value}M
  //             </span>
  //           </Flex>
  //           <Flex align={'center'} gap={8}>
  //             <span>Locked</span>
  //             <span>{process.lock.ratio}%</span>
  //             <span className={'text-[#9FA4B7]'}>
  //               {process.lock.name} {process.lock.value}M
  //             </span>
  //           </Flex>
  //         </Flex>
  //       }
  //       color={'white'}
  //     >
  //       <span>{process.value}%</span>
  //       <Progress percent={process.value} showInfo={false} />
  //     </Tooltip>
  //   ),
  // },
  // {
  //   title: 'Next Unlock',
  //   dataIndex: 'nextUnlock',
  //   key: 'nextUnlock',
  //   render: (_, { nextUnlock }) => (
  //     <Flex gap={44}>
  //       <Flex className={'text-md'} vertical gap={8}>
  //         <span className={'font-semibold text-[#333747]'}>
  //           ${nextUnlock.value}M
  //         </span>
  //         <span className={'text-[#9FA4B7]'}>
  //           {nextUnlock.ratio} of {nextUnlock.name}
  //         </span>
  //       </Flex>

  //       <Flex className={'text-md'} gap={8}>
  //         <Flex vertical align={'center'} className={'w-[42px]'}>
  //           <Tag bordered={false} className={'text-black mr-0'}>
  //             {nextUnlock.time.d}
  //           </Tag>
  //           <span className={'text-[#9FA4B7]'}>D</span>
  //         </Flex>

  //         <span>:</span>

  //         <Flex vertical align={'center'} className={'w-[42px]'}>
  //           <Tag
  //             bordered={false}
  //             className={'text-black w-full text-center mr-0'}
  //           >
  //             {nextUnlock.time.h}
  //           </Tag>
  //           <span className={'text-[#9FA4B7]'}>H</span>
  //         </Flex>

  //         <span>:</span>

  //         <Flex vertical align={'center'} className={'w-[42px]'}>
  //           <Tag
  //             bordered={false}
  //             className={'text-black w-full text-center mr-0'}
  //           >
  //             {nextUnlock.time.m}
  //           </Tag>
  //           <span className={'text-[#9FA4B7]'}>M</span>
  //         </Flex>
  //       </Flex>
  //     </Flex>
  //   ),
  // },
];

export const UsTable = () => {
  const [data, setData] = useState<IUnlockData[]>([]);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [order, setOrder] = useState({
    columnKey: '',
    order: '',
  });

  const getTokenUnlock = useCallback(async () => {
    const response: IResponseAxios<IUnlockData> = await FetchTokenUnlock({
      limit: pageSize,
      page: currentPage,
      sort_by: order.columnKey,
      sort_order: ORDER[order.order],
    });

    if (!response) return;
    const { data, total } = response;
    setData(data);
    setTotal(total!!);

    /* #endregion */
  }, [pageSize, currentPage, order]);

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

  useEffect(() => {
    getTokenUnlock();
  }, [getTokenUnlock, pageSize, currentPage, order]);

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
            size='small'
          />
        </div>
        <div>
          <SelectItemTable onChange={_onChangeSize} />
        </div>
      </div>
    </div>
  );
};
