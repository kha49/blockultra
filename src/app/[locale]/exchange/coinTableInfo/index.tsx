'use client';

import Link from 'next/link';
import './index.scss';
import { ReactNode, useCallback, useEffect, useState } from 'react';
import { Checkbox, Pagination, Select, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { cloneDeep, isArray, random, round } from 'lodash';
import SelectItemTable from '@/components/SelectItemTable';
import FilterCustom from '@/components/FilterCustom';
import {
  percentFormat,
  nFormatter,
  renderSortIcon,
  renderRangePaging,
} from '@/helpers';

import {
  ICustomTagProp,
  IOptionAny,
  IOptionCustom,
} from '@/components/FilterCustom/props';
import { IResponseAxios } from '@/models/IResponse';
import { ICoinTable, ISearchFilter } from './props';
import { COLOR_CHART, ORDER } from '@/helpers/constants';
import { useDebounce } from 'usehooks-ts';
import { FetchSpotList, SearchCoinsInFilter } from '@/usecases/exchange';
import { IconStar } from '@/assets/icons';

const columnsMobile: ColumnsType<ICoinTable> = [
  {
    key: 'name',
    title: 'Name',
    width: 248,
    align: 'left',
    render: (_, value) => {
      return (
        <span className='table-header'>
          <div className='flex items-center'>
            <img src={value.exchangeIcon} />
            <Link href={`/en/exchange/${value.coinName}`} className='mx-2'>
              {value.coinName}
            </Link>
          </div>
        </span>
      );
    },
    sortIcon: renderSortIcon,
    sorter: true,
  },
  {
    key: 'price',
    title: 'Price',
    width: 199,
    align: 'right',
    render: (_, value) => {
      return nFormatter(value.usdLast, 2, '$');
    },
  },
];

const columns: ColumnsType<ICoinTable> = [
  {
    key: 'id',
    title: '#',
    width: 56,
    align: 'left',
    render: (_, value, index) => {
      return (
        <div className='text-zinc-700 text-sm font-jb leading-tight'>
          {index + 1}
        </div>
      );
    },
  },
  {
    key: 'coinKey',
    title: 'Name',
    width: 248,
    align: 'left',
    render: (_, value) => {
      return (
        <span className='table-header'>
          <div className='flex items-center'>
            <Link
              className='flex items-center'
              href={`/en/exchange/${value.coinName}`}
            >
              <img className='mx-2' src={value.exchangeIcon} />
              <div className='text-zinc-700 text-sm font-jb leading-tight hover:text-primary-500'>
                {value.coinName}
              </div>
            </Link>
          </div>
        </span>
      );
    },
    sortIcon: renderSortIcon,
    sorter: true,
  },
  {
    key: 'rate',
    title: 'Rate',
    width: 115,
    align: 'left',
    render: (_, value, index) => {
      if (!value) {
        return <span>-</span>;
      }

      return (
        <div className='flex gap-1'>
          <div className='text-zinc-700 text-sm font-sb leading-tight'>
            {/* {value.rate} */}-
          </div>
          {/* <IconStar /> */}
        </div>
      );
    },
  },
  {
    key: 'symbol',
    title: 'Pair',
    width: 199,
    align: 'right',
    render: (_, value) => {
      return (
        <div className='text-zinc-700 text-sm font-sb leading-tight'>
          {value.symbol}
        </div>
      );
    },
  },
  {
    key: 'usdLast',
    title: 'Price',
    width: 199,
    align: 'right',
    render: (_, value) => {
      return (
        <div className='text-zinc-700 text-sm font-jsb leading-tight'>
          {'$ ' +
            (value.usdLast < 0.01 ? value.usdLast : round(value.usdLast, 2))}
          {/* {nFormatter(value.usdLast, 2, '$')} */}
        </div>
      );
    },
    sortIcon: renderSortIcon,
    sorter: true,
  },
  {
    key: 'changePercent',
    title: '24h%',
    width: 190,
    align: 'right',
    render: (_, value) => {
      return (
        <div className='text-sm font-jsb leading-tight'>
          {percentFormat(value.changePercent, 'text-sm font-semibold')}
        </div>
      );
    },
    sortIcon: renderSortIcon,
    sorter: true,
  },
  {
    key: 'usdVolume',
    title: 'Volume (24h)',
    width: 169,
    align: 'right',
    render: (_, value) => {
      return (
        <div className='text-zinc-700 text-sm font-jsb leading-tight'>
          {nFormatter(value.usdVolume, 2, '$')}
        </div>
      );
    },
    sortIcon: renderSortIcon,
    sorter: true,
  },
  {
    key: 'exchangePercentVolume',
    title: 'Volumn %',
    width: 152,
    align: 'right',
    render: (_, value) => {
      return (
        <div className='text-sm font-jsb leading-tight'>
          {percentFormat(value.exchangePercentVolume, 'text-sm font-semibold')}
        </div>
      );
    },
    sortIcon: renderSortIcon,
    sorter: true,
  },
];

const CoinTableInfo = (props: any) => {
  const [data, setData] = useState<ICoinTable[]>([]);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(999);
  const [key, setKey] = useState('binance');
  const [order, setOrder] = useState({
    columnKey: '',
    order: '',
  });

  const [keyFilter, setKeyFilter] = useState<string[]>([]);
  const debouncedValue = useDebounce<string[]>(keyFilter, 500);

  useEffect(() => {
    getCoins();
  }, [pageSize, currentPage, order, debouncedValue]);

  const getCoins = useCallback(async () => {
    const response: IResponseAxios<ICoinTable> = await FetchSpotList({
      key: key,
      limit: pageSize,
      page: currentPage,
      sort_by: order.columnKey,
      sort_order: ORDER[order.order as keyof typeof ORDER],
      search_key: keyFilter.join(','),
    });
    if (!response) return;
    const { data, total } = response;
    setTotal(total!!);
    setData(data);
  }, [pageSize, currentPage, order, debouncedValue]);

  const _onChangePage = (page: number) => {
    setCurrentPage(page);
  };

  const _onChangeSize = (value: number) => {
    setCurrentPage(1);
    setPageSize(value);
  };

  const _renderTag = (options: ICustomTagProp) => {
    const { value, closable, onClose, index, rawData } = options;
    const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
      event.preventDefault();
      event.stopPropagation();
    };

    if (index > 3) return <></>;

    if (index === 3)
      return (
        <Tag color='#5766ff' style={{ marginRight: 3 }}>
          ...
        </Tag>
      );
    return (
      <Tag
        color='#5766ff'
        onMouseDown={onPreventMouseDown}
        closable={closable}
        onClose={onClose}
        style={{ marginRight: 3 }}
      >
        {rawData.name ?? value}
      </Tag>
    );
  };

  const _getData = async ({ searchKey }: IOptionAny) => {
    const res: any = await SearchCoinsInFilter({
      search_key: searchKey,
    });
    if (!res) return [];

    return res.map((e: ISearchFilter) => ({
      id: e.key,
      name: e.name,
      code: e.key,
      thumb: '',
      isSelected: false,
    }));
  };

  const _renderOption = ({ name, code, checked }: IOptionCustom) => {
    return (
      <Select.Option isSelectOption={true} value={code} key={name}>
        <div className='flex pr-0 pl-0 mr-0 ml-0 select-coin-custom__item px-3 justify-between'>
          <div className=''>
            <span className='name mx-2'>{name}</span>
          </div>
          <div className='ant-checkbox'>
            {!checked ? (
              <Checkbox disabled className='hover:cursor-pointer' />
            ) : null}
          </div>
        </div>
      </Select.Option>
    );
  };

  const _onSelectFilter = (value: string[]) => {
    setKeyFilter(value);
  };

  return (
    <div className='home-table coin-tab'>
      <div className='filter flex justify-between my-4'>
        <div className='flex'>
          <FilterCustom
            placeholder='Filter coins'
            renderOption={_renderOption}
            renderTag={_renderTag}
            onChange={_onSelectFilter}
            getData={_getData}
            isSortSelected='alphabet'
          />
        </div>
      </div>
      <div className='table-price desktop-show overflow-x-auto'>
        <Table
          columns={columns}
          dataSource={data}
          pagination={{ position: ['none'], pageSize }}
          onChange={(_page, _filter, sort) => {
            const itemSort = isArray(sort) ? sort[0] : sort;
            setOrder({
              columnKey: itemSort.columnKey
                ? itemSort.columnKey.toString()
                : '',
              order: itemSort.order ? itemSort.order.toString() : '',
            });
          }}
          // sortDirections={['ascend', 'descend']}
          showSorterTooltip={false}
        />
      </div>

      <div className='table-price mobile-show overflow-x-auto'>
        <Table
          className='text-zinc-700 text-sm font-jb'
          columns={columnsMobile}
          dataSource={data}
          pagination={{ position: ['none'], pageSize }}
          onChange={(_page, _filter, sort) => {
            const itemSort = isArray(sort) ? sort[0] : sort;
            setOrder({
              columnKey: itemSort.columnKey
                ? itemSort.columnKey.toString()
                : '',
              order: itemSort.order ? itemSort.order.toString() : '',
            });
          }}
          // sortDirections={['ascend', 'descend']}
          showSorterTooltip={false}
        />
      </div>

      <div className='table-pagination mobile-show pt-6 flex items-center justify-center  '>
        <Pagination
          total={total}
          pageSize={pageSize}
          current={currentPage}
          onChange={_onChangePage}
          showSizeChanger={false}
        />
      </div>

      <div className='table-pagination pt-6 px-3 flex items-center justify-between'>
        <div className='text-center text-zinc-700 text-sm font-jm leading-tight'>
          {renderRangePaging(currentPage, pageSize, data.length, total)}
        </div>

        <div className='desktop-show'>
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
    </div>
  );
};
export default CoinTableInfo;
