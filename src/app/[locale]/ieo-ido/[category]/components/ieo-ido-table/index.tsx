'use client';
import { Flex, Pagination, Table } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import SelectItemTable from '@/components/SelectItemTable';
import './styles.scss';
import HeadFilter from '../head-filter';
import { IIeoIdoData } from '../../types';
import { IResponseAxios } from '@/models/IResponse';
import { ORDER } from '@/helpers/constants';
import { FetchIeoIdo } from '@/usecases/ieo-ido';
import { useParams } from 'next/navigation';
import {
  IeoIdoCategory,
  getIeoIdoApiPath,
  getIeoIdoColumns,
} from '../../config';

export const IeoIdoTable = () => {
  const { category = IeoIdoCategory.upcoming } = useParams<{
    category: string;
  }>();

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
    const response: IResponseAxios<IIeoIdoData> = await FetchIeoIdo(
      getIeoIdoApiPath(category),
      {
        limit: pageSize,
        page: currentPage,
        sort_by: order.columnKey,
        sort_order: ORDER[order.order],
      }
    );

    if (!response) return;
    const { data, total } = response;
    setData(data);
    setTotal(total!!);
  }, [pageSize, currentPage, order, category]);

  useEffect(() => {
    getIeoIdoUpComing();
  }, [getIeoIdoUpComing]);

  return (
    <Flex vertical gap={16} className={'ieo-ido-table'}>
      <HeadFilter />
      <Table
        columns={getIeoIdoColumns(category)}
        dataSource={data}
        pagination={false}
        className='overflow-x-auto overflow-y-hidden'
      />
      <div className='pt-6 flex-col md:flex-row flex items-center justify-center table-pagination pagination-mobile'>
        <Pagination
          total={total}
          pageSize={pageSize}
          current={currentPage}
          onChange={_onChangePage}
          showSizeChanger={false}
        />
      </div>

      <div className='pt-6 flex items-center gap-6 justify-between table-pagination'>
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
