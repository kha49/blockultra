import { Pagination } from 'antd';
import SelectItemTable from '@/components/SelectItemTable';

export type CoreTableFooterProps = {
  total: number;
  pageSize: number;
  currentPage: number;
  length: number;
  onChangePage: (page: number) => void;
  onChangeSize: (size: number) => void;
};

export const CoreTableFooter = (props: CoreTableFooterProps) => {
  const { total, pageSize, currentPage, length, onChangePage, onChangeSize } =
    props;

  const start = (currentPage - 1) * pageSize + 1;
  const end = start + length - 1;

  const renderRangePagination = () => {
    return (
      <div className={'text-sm font-medium text-[#333747]'}>
        {start} - {end} from {total}
      </div>
    );
  };

  return (
    <div className={'core-table__footer'}>
      <div className='pt-6 flex gap-6 flex-col w-full items-center justify-center md:hidden'>
        <Pagination
          total={total}
          pageSize={pageSize}
          current={currentPage}
          onChange={onChangePage}
          showLessItems
          showSizeChanger={false}
        />
        <div className={'flex items-center w-full justify-between'}>
          {renderRangePagination()}
          <SelectItemTable onChange={onChangeSize} />
        </div>
      </div>

      <div className='pt-6 items-center justify-between hidden md:flex'>
        {renderRangePagination()}
        <Pagination
          total={total}
          pageSize={pageSize}
          current={currentPage}
          onChange={onChangePage}
          showSizeChanger={false}
        />
        <SelectItemTable
          onChange={onChangeSize}
          pageSize={pageSize.toString()}
        />
      </div>
    </div>
  );
};
