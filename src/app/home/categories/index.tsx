import { useEffect, useState } from 'react';
import { isArray } from 'lodash';

import { FetchCategories } from '@/usecases/home';
import { IResponseAxios } from '@/models/IResponse';

import { ORDER } from '@/helpers/constants';
import { useDebounce } from 'usehooks-ts';
import { CoreTable } from '@/components/core-table';

const Categories = () => {
  const [pageSize, setPageSize] = useState(50);
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState<IHomeCategory[]>([]);
  const [total, setTotal] = useState(0);
  const [order, setOrder] = useState({
    columnKey: '',
    order: '',
  });

  const [keyFilter, setKeyFilter] = useState<string[]>([]);
  const debouncedValue = useDebounce<string[]>(keyFilter, 500);

  useEffect(() => {
    _fetchCategories();
  }, [currentPage, order, pageSize, debouncedValue]);

  const _fetchCategories = async () => {
    const response: IResponseAxios<IHomeCategory> = await FetchCategories({
      limit: pageSize,
      page: currentPage,
      sort_by: order.columnKey,
      sort_order: ORDER[order.order as keyof typeof ORDER],
      search_key: debouncedValue.join(','),
    });
    if (!response) return;
    const { data, total } = response;
    setTotal(total!!);
    setData(data);
  };

  const _onChangePage = (page: number) => {
    setCurrentPage(page);
  };

  const _onChangeSize = (value: number) => {
    setCurrentPage(1);
    setPageSize(value);
  };

  const handleOnChange = (tableConfig: any, _filter: any, sort: any) => {
    const itemSort = isArray(sort) ? sort[0] : sort;
    setOrder({
      columnKey: itemSort.columnKey ? itemSort.columnKey.toString() : '',
      order: itemSort.order ? itemSort.order.toString() : '',
    });
  };

  return (
    <CoreTable
      className={'md:p-6'}
      data={data}
      type={'home_categories'}
      onChange={handleOnChange}
      pageSize={pageSize}
      currentPage={currentPage}
      total={total}
      onChangePage={_onChangePage}
      onChangeSize={_onChangeSize}
      onChangeFilterSelect={setKeyFilter}
    />
  );
};

export default Categories;
