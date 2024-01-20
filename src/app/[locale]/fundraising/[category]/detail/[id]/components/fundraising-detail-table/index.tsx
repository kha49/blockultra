'use client';

import { useParams, useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react';
import { getColumnsFundraising } from '../../config';
import { getFundraisingPathApi } from '../../../../config';
import { IResponseAxios } from '@/models/IResponse';
import { FetchFundraising } from '@/usecases/fundraising';
import { ORDER } from '@/helpers/constants';
import { Flex } from 'antd';
import HeadFilter from '../../../../components/head-filter';
import BaseTable from '@/components/BaseTable';

const FundraisingDetailTable = () => {
  const router = useRouter();
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

  const getTopbacker = useCallback(async () => {
    const url = getFundraisingPathApi(params.category);
    const response: IResponseAxios<any> = await FetchFundraising(url, {
      limit: pageSize,
      page: currentPage,
      sort_by: order.columnKey,
      sort_order: ORDER.ascend,
    });

    if (!response) return;
    const { data, total } = response;
    setData(data);
    setTotal(total!!);
  }, [pageSize, currentPage, order, params.category]);

  useEffect(() => {
    getTopbacker();
  }, [getTopbacker]);

  return (
    <Flex vertical gap={16} className='p-6 mt-6'>
      <HeadFilter />
      <BaseTable
        columns={columns}
        data={data}
        pageSize={pageSize}
        currentPage={currentPage}
        total={total}
        _onChangePage={_onChangePage}
        _onChangeSize={_onChangeSize}
        onRow={(record: any) => {
          return {
            onClick: () => {
              router.push(
                `/${params.locale}/fundraising/${params.category}/detail/${record.id}?name=${record.name}`
              );
              console.log('record', record);
            },
          };
        }}
      />
    </Flex>
  );
};

export default FundraisingDetailTable;
