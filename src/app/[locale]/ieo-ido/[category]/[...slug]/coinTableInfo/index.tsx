'use client';

import Link from 'next/link';
import './index.scss';
import { ReactNode, useCallback, useEffect, useState } from 'react';
import { Checkbox, Pagination, Select, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { cloneDeep, isArray, random } from 'lodash';
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
      return index + 1;
    },
  },
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
          <div className='text-zinc-700 text-sm font-semibold leading-tight'>
            {/* {value.rate} */}-
          </div>
          {/* <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clip-path="url(#clip0_3622_191778)">
                      <path d="M8.00002 0.400391L10.45 5.40038L16 6.2004L12 10.1004L12.95 15.6004L8.00002 13.0004L3.05002 15.6004L4.00001 10.1004L0 6.2004L5.55001 5.40038L8.00002 0.400391Z" fill="#FFD243"/>
                      <path d="M7.99981 8.0004V0.400391L5.5498 5.40038L7.99981 8.0004Z" fill="#FFB845"/>
                      <path d="M16 6.20041L8 8.00041L10.45 5.40039L16 6.20041Z" fill="#FFB845"/>
                      <path d="M8 8L12.95 15.6L12 10.1L8 8Z" fill="#FFB845"/>
                      <path d="M3.0498 15.6L7.99981 8V13L3.0498 15.6Z" fill="#FFB845"/>
                      <path d="M8.00002 8.00117L0 6.20117L4.00001 10.1012L8.00002 8.00117Z" fill="#FFB845"/>
                  </g>
                  <defs>
                  <clipPath id="clip0_3622_191778">
                  <rect width="16" height="16" fill="white"/>
                  </clipPath>
                  </defs>
              </svg> */}
        </div>
      );
    },
  },
  {
    key: 'pair',
    title: 'Pair',
    width: 199,
    align: 'right',
    render: (_, value) => {
      return (
        <div className='text-zinc-700 text-sm font-semibold leading-tight'>
          {value.symbol}
        </div>
      );
    },
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
  {
    key: 'change_price',
    title: '24h%',
    width: 190,
    align: 'right',
    render: (_, value) => {
      return percentFormat(value.changePercent, 'text-sm font-semibold');
    },
  },
  {
    key: 'volume',
    title: 'Volume (24h)',
    width: 169,
    align: 'right',
    render: (_, value) => {
      return nFormatter(value.usdVolume, 2, '$');
    },
  },
  {
    key: 'change_volume',
    title: 'Volumn %',
    width: 190,
    align: 'right',
    render: (_, value) => {
      return percentFormat(
        value.exchangePercentVolume,
        'text-sm font-semibold'
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
    order: 'desc',
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
      key_search: keyFilter.join(','),
    });
    if (!response) return;
    console.log(response);
    const { data, total } = response;
    setTotal(total!!);
    setData(data);
  }, [pageSize, currentPage, order, keyFilter]);

  const _onChangePage = (page: number) => {
    setCurrentPage(page);
  };

  const _onChangeSize = (value: number) => {
    setPageSize(value);
    setCurrentPage(1);
  };

  const _renderTag = (options: ICustomTagProp) => {
    const { value, closable, onClose, index } = options;
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
        {value}
      </Tag>
    );
  };

  const _getData = async ({ searchKey }: IOptionAny) => {
    const res: any = await SearchCoinsInFilter(searchKey);
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
      <div>
        <div className='filter flex justify-between'>
          <div className='flex'>
            <FilterCustom
              placeholder='Filter coins'
              renderOption={_renderOption}
              renderTag={_renderTag}
              onChange={_onSelectFilter}
              getData={_getData}
            />
          </div>
        </div>
        <div className='overflow-x-auto pagination-desktop'>
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

        <div className='overflow-x-auto pagination-mobile'>
          <Table
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

        <div className='pt-6 flex items-center justify-center table-pagination pagination-mobile'>
          <Pagination
            total={total}
            pageSize={pageSize}
            current={currentPage}
            onChange={_onChangePage}
            showSizeChanger={false}
          />
        </div>

        <div className='pt-6 flex items-center justify-between table-pagination'>
          <div>
            {renderRangePaging(currentPage, pageSize, data.length, total)}
          </div>
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
      </div>
    </div>
  );
};
export default CoinTableInfo;
