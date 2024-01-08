'use client';
import { Flex, Pagination, Table } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import SelectItemTable from '@/components/SelectItemTable';
import './styles.scss';
import HeadFilter from '../head-filter';
import { getColumnsFundraising } from '../../config';
import { useParams } from 'next/navigation';
import { IResponseAxios } from '@/models/IResponse';
import { FetchTopBacker } from '@/usecases/fundraising';
import { ORDER } from '@/helpers/constants';

export const FunDTable = () => {
  const params = useParams<{ locale: string; category: string }>();

  const [data, setData] = useState<any[]>([]);
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

  const columns = getColumnsFundraising(params.category);

  const _renderRange = () => {
    const start = (currentPage - 1) * pageSize + 1;
    const end = start + data.length - 1;
    return (
      <span className='table-total'>
        {start} - {end} from {total}
      </span>
    );
  };

  const getTopbacker = useCallback(async () => {
    const response: IResponseAxios<any> = await FetchTopBacker({
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
    getTopbacker();
  }, [getTopbacker, pageSize, currentPage, order]);

  return (
    <Flex vertical gap={16} className={'fundraising'}>
      <HeadFilter />
      <Table
        columns={columns as any}
        dataSource={data as any}
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
