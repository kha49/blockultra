'use client';
import { Flex, Pagination, Table } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import SelectItemTable from '@/components/SelectItemTable';
import './styles.scss';
import HeadFilter from '../head-filter';
import { IIeoIdoData, IIeoIdoFilterType } from '../../types';
import { IResponseAxios } from '@/models/IResponse';
import { ORDER } from '@/helpers/constants';
import { FetchIeoIdo } from '@/usecases/ieo-ido';
import { useParams, useRouter } from 'next/navigation';
import {
  IeoIdoCategory,
  IeoIdoStatus,
  getIeoIdoApiPath,
  getIeoIdoColumns,
} from '../../config';
import HeadFilterInformation from '../head-filter-information';

export const IeoIdoTable = () => {
  const {
    category: _category = IeoIdoCategory.upcoming,
    slug,
    locale,
  } = useParams<{
    category: string;
    locale: string;
    slug?: string[];
  }>();

  const category = slug ? slug[1] || IeoIdoCategory.ended : _category;

  const router = useRouter();

  const [data, setData] = useState<IIeoIdoData[]>([]);
  const [pageSize, setPageSize] = useState(slug ? 10 : 20);
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

  const getIeoIdoUpComing = useCallback(
    async (filter: IIeoIdoFilterType = {}) => {
      const response: IResponseAxios<IIeoIdoData> = await FetchIeoIdo(
        getIeoIdoApiPath(category),
        {
          limit: pageSize,
          page: currentPage,
          sort_by: order.columnKey,
          sort_order: ORDER[order.order as keyof typeof ORDER],
          status: IeoIdoStatus[category] || '',
          ...filter,
        }
      );

      if (!response) return;
      const { data, total } = response;
      setData(data);
      setTotal(total!!);
    },
    [pageSize, currentPage, order, category]
  );

  useEffect(() => {
    getIeoIdoUpComing();
  }, [getIeoIdoUpComing]);

  return (
    <Flex vertical gap={16} className={'ieo-ido-table'}>
      {slug ? (
        <HeadFilterInformation onFilter={getIeoIdoUpComing} />
      ) : (
        <HeadFilter onFilter={getIeoIdoUpComing} />
      )}
      <Table
        onRow={
          category === IeoIdoCategory.topIdoLaunchpads
            ? (record) => {
                return {
                  onClick: () => {
                    router.push(
                      `/${locale}/ieo-ido/${IeoIdoCategory.topIdoLaunchpads}/${record.key}`
                    );
                  },
                };
              }
            : undefined
        }
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

      <div className='pt-6 flex flex-wrap justify-center items-center gap-6 md:justify-between table-pagination'>
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
