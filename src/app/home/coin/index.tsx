import { CoreTable } from '@/components/core-table';
import { ORDER, SOCKET_EVENTS } from '@/helpers/constants';
import { useDataSocket } from '@/hooks/useDataSocket';
import { IPagingParams } from '@/models/IPaging';
import { IResponseAxios } from '@/models/IResponse';
import { FetchCoins } from '@/usecases/home';
import { isArray } from 'lodash';
import { memo, useCallback, useEffect, useState } from 'react';
import { useDebounce } from 'usehooks-ts';
import { IHomeCoin } from './props';
import './style.scss';

const Coins = () => {
  const { data, setDefaultData } = useDataSocket<IHomeCoin[]>(
    SOCKET_EVENTS.coinChange
  );
  const [pagingParams, setPagingParams] = useState<IPagingParams>({
    page: 1,
    pageSize: 50,
  });
  const [total, setTotal] = useState(0);
  const [order, setOrder] = useState({
    columnKey: '',
    order: '',
  });
  const [keyFilter, setKeyFilter] = useState<string[]>([]);
  const debouncedValue = useDebounce<string[]>(keyFilter, 500);

  const getCoins = useCallback(async () => {
    const response: IResponseAxios<IHomeCoin> = await FetchCoins({
      limit: pagingParams.pageSize,
      page: pagingParams.page,
      sort_by: order.order ? order.columnKey : '',
      sort_order: ORDER[order.order as keyof typeof ORDER],
      search_key: debouncedValue.join(','),
    });

    if (!response) return;
    const { data, total } = response;
    setDefaultData(data);
    setTotal(total!!);

    /* #endregion */
  }, [pagingParams, order, debouncedValue]);

  useEffect(() => {
    getCoins();
  }, [getCoins, pagingParams, order, debouncedValue]);

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
      data={data ?? []}
      type={'home_all_coins'}
      onChange={handleOnChange}
      pageSize={pagingParams.pageSize}
      currentPage={pagingParams.page}
      onChangePagingParams={setPagingParams}
      total={total}
      onChangeFilterSelect={setKeyFilter}
    />
  );
};

export default memo(Coins);
