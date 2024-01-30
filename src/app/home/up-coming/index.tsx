import { useEffect, useState } from 'react';
import { FetchUpComings } from '@/usecases/home';
import './style.scss';

import { isArray } from 'lodash';
import { ORDER } from '@/helpers/constants';
import { useDebounce } from 'usehooks-ts';
import { CoreTable } from '@/components/core-table';

const UpComing = () => {
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [order, setOrder] = useState({
    columnKey: '',
    order: '',
  });
  const [upcomings, setUpComings] = useState([]);

  const [keyFilter, setKeyFilter] = useState<string[]>([]);
  const debouncedValue = useDebounce<string[]>(keyFilter, 500);

  function getUpComings(params: any) {
    FetchUpComings(params).then((res: any) => {
      setUpComings(res.data);
      setTotal(res.total);
    });
  }

  useEffect(() => {
    getUpComings({
      limit: pageSize,
      page: currentPage,
      sort_order: ORDER[order.order as keyof typeof ORDER],
      sort_by: order.columnKey,
      search_key: debouncedValue.join(','),
      status: 'upcoming',
    });
  }, [pageSize, currentPage, order, debouncedValue]);

  const _onChangePage = (page: number) => {
    setCurrentPage(page);
  };

  const _onChangeSize = (value: number) => {
    setCurrentPage(1);
    setPageSize(value);
  };

  const handleOnChange = (_page: any, _filter: any, sort: any) => {
    const itemSort = isArray(sort) ? sort[0] : sort;
    setOrder({
      columnKey: itemSort.columnKey ? itemSort.columnKey.toString() : '',
      order: itemSort.order ? itemSort.order.toString() : '',
    });
  };

  return (
    <CoreTable
      data={upcomings}
      type={'home_upcoming'}
      onChange={handleOnChange}
      pageSize={pageSize}
      currentPage={currentPage}
      total={total}
      onChangePage={_onChangePage}
      onChangeSize={_onChangeSize}
      onChangeFilterSelect={setKeyFilter}
      isCustomize={false}
    />
  );
};

export default UpComing;
