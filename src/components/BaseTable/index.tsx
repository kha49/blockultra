'use client';
import React from 'react';
import './index.scss';
import { Pagination } from 'antd';
import SelectItemTable from '../SelectItemTable';
import CommonTable from '../CommonTable/common-table';

export default function BaseTable(props: any) {
  const {
    columns,
    data,
    pageSize,
    currentPage,
    total,
    _onChangePage,
    _onChangeSize,
    ...rest
  } = props;

  const _renderRange = () => {
    const start = (currentPage - 1) * pageSize + 1;
    const end = start + data.length - 1;
    return (
      <span className='table-total text-grey-700 text-sm font-medium font-jm'>
        {start} - {end} from {total}
      </span>
    );
  };

  return (
    <div className='base-table'>
      <CommonTable
        columns={columns as any}
        dataSource={data as any}
        pagination={false}
        className='overflow-x-auto overflow-y-hidden'
        {...rest}
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
          <SelectItemTable onChange={_onChangeSize} pageSize={pageSize} />
        </div>
      </div>
    </div>
  );
}
