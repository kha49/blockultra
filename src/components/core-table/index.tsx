'use client';
import './styles.scss';
import { TableProps } from 'antd';
import { AnyObject } from 'antd/es/_util/type';
import { CoreTableFooter } from './core-table-footer';
import { FactoryColumns } from './factory-columns';
import {
  getColumns,
  getFooterCoreProps,
  getHeaderCoreProps,
} from '@/components/core-table/utils';
import { useMediaQuery } from 'usehooks-ts';
import { CoreTableHeader, ICoreTableHeaderProps } from './core-table-header';
import CommonTable from '../CommonTable/common-table';
import React from 'react';

export type CoreTableProps<T = AnyObject> = TableProps<T> & {
  data: T[];
  total?: number;
  pageSize?: number;
  currentPage?: number;
  onChangePage?: (page: number) => void;
  onChangeSize?: (size: number) => void;
  type: FactoryColumns;
  mobileColumnsKey?: string[];
  renderHeader?: () => React.ReactNode;
  renderFooter?: () => React.ReactNode;
} & ICoreTableHeaderProps;

export const CoreTable = <T extends AnyObject = AnyObject>(
  props: CoreTableProps<T>
) => {
  const {
    pagination = false,
    data = [],
    type,
    mobileColumnsKey = [],
    renderFooter,
    renderHeader,
    ...rest
  } = props;

  const isMobile = useMediaQuery('(max-width: 640px)');

  const columns = getColumns<AnyObject>(type, isMobile);

  return (
    <div className={'core-table'}>
      {renderHeader ? (
        renderHeader()
      ) : (
        <CoreTableHeader {...getHeaderCoreProps(props)} />
      )}

      <CommonTable
        columns={columns}
        dataSource={data}
        pagination={pagination}
        scroll={{ x: 'max-content' }}
        showSorterTooltip={false}
        className='overflow-x-auto overflow-y-hidden'
        {...rest}
      />
      {renderFooter ? (
        renderFooter()
      ) : (
        <CoreTableFooter {...getFooterCoreProps(props)} />
      )}
    </div>
  );
};
