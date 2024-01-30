import { memo, useCallback, useEffect, useState } from 'react';
import './style.scss';
import { FetchCoins } from '@/usecases/home';
import { isArray } from 'lodash';
import { IResponseAxios } from '@/models/IResponse';
import { IHomeCoin } from './props';
import { ORDER } from '@/helpers/constants';
import { useDebounce } from 'usehooks-ts';
import { CoreTable } from '@/components/core-table';

const Coins = () => {
  const [data, setData] = useState<IHomeCoin[]>([]);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [order, setOrder] = useState({
    columnKey: '',
    order: '',
  });
  const [keyFilter, setKeyFilter] = useState<string[]>([]);
  const debouncedValue = useDebounce<string[]>(keyFilter, 300);

  const getCoins = useCallback(async () => {
    const response: IResponseAxios<IHomeCoin> = await FetchCoins({
      limit: pageSize,
      page: currentPage,
      sort_by: order.columnKey,
      sort_order: ORDER[order.order as keyof typeof ORDER],
      search_key: debouncedValue.join(','),
    });

    if (!response) return;
    const { data, total } = response;
    setData(data);
    setTotal(total!!);

    /* #endregion */
  }, [pageSize, currentPage, order, debouncedValue]);

  useEffect(() => {
    getCoins();
  }, [getCoins, pageSize, currentPage, order, debouncedValue]);

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
      type={'home_all_coins'}
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

export default memo(Coins);
