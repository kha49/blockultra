'use client';

import Link from 'next/link';
import { ReactNode, useCallback, useEffect, useState } from 'react';
import { Checkbox, Pagination, Select, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { FetchCoins } from '@/usecases/home';
import { cloneDeep, isArray, random } from 'lodash';
import SelectItemTable from '@/components/SelectItemTable';
import FilterCustom from '@/components/FilterCustom';
import ReactECharts from 'echarts-for-react';
import {
  ICustomTagProp,
  IOptionAny,
  IOptionCustom,
} from '@/components/FilterCustom/props';
import { renderSortIcon } from '@/helpers';
interface IData {
  id: number;
  name: ReactNode | string;
  rate: string;
  pair: string;
  price: string;
  change_price: string;
  volumn: string;
  change_vol: string;
}

const dataExample: IData[] = [
  ...Array.from(new Array(1000).keys()).map((e) => ({
    id: e,
    name: `Bitcoin${e}`,
    rate: '4.8',
    pair: 'BTC/USDT',
    price: '$44950.2',
    change_price: Math.floor(Math.random() * 2000) % 2 ? '-1.2%' : '5.05%',
    volumn: '$345.65B',
    change_vol: Math.floor(Math.random() * 2000) % 2 ? '-1.2%' : '5.05%',
  })),
];

let option = {
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    show: false,
  },
  yAxis: {
    show: false,
  },
  series: [
    {
      data: [820, 932, 1901, 934, 1290, 2330, 1720],
      type: 'line',
      smooth: true,
      symbol: 'none',
    },
  ],
};

const columns: ColumnsType<IData> = [
  // {
  //   key: 'id',
  //   title: '#',
  //   width: 56,
  //   align: 'left',
  //   render: (_, value, index) => {
  //     return index + 1;
  //   },
  // },
  {
    key: 'name',
    title: 'Name',
    width: 248,
    align: 'left',
    render: (_, value) => {
      return (
        <span className='table-header'>
          <div className='flex items-center'>
            <svg
              width='32'
              height='32'
              viewBox='0 0 32 32'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <g clipPath='url(#clip0_596_42130)'>
                <path
                  d='M16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32Z'
                  fill='#F3BA2F'
                />
                <path
                  d='M12.116 14.404L16 10.52L19.886 14.406L22.146 12.146L16 6L9.856 12.144L12.116 14.404ZM6 16L8.26 13.74L10.52 16L8.26 18.26L6 16ZM12.116 17.596L16 21.48L19.886 17.594L22.146 19.853L16 26L9.856 19.856L9.853 19.853L12.116 17.596ZM21.48 16L23.74 13.74L26 16L23.74 18.26L21.48 16ZM18.292 15.998H18.294V16L16 18.294L13.709 16.004L13.705 16L13.709 15.997L14.11 15.595L14.305 15.4L16 13.706L18.293 15.999L18.292 15.998Z'
                  fill='white'
                />
              </g>
              <defs>
                <clipPath id='clip0_596_42130'>
                  <rect width='32' height='32' fill='white' />
                </clipPath>
              </defs>
            </svg>
            <Link href={`/en/detail/${value.name}`} className='mx-2'>
              {value.name}
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
      if (!value.rate) {
        return <span>-</span>;
      }

      return (
        <div className='flex gap-1'>
          <div className='text-zinc-700 text-sm font-semibold leading-tight'>
            {value.rate}
          </div>
          <svg
            width='16'
            height='16'
            viewBox='0 0 16 16'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <g clip-path='url(#clip0_3622_191778)'>
              <path
                d='M8.00002 0.400391L10.45 5.40038L16 6.2004L12 10.1004L12.95 15.6004L8.00002 13.0004L3.05002 15.6004L4.00001 10.1004L0 6.2004L5.55001 5.40038L8.00002 0.400391Z'
                fill='#FFD243'
              />
              <path
                d='M7.99981 8.0004V0.400391L5.5498 5.40038L7.99981 8.0004Z'
                fill='#FFB845'
              />
              <path
                d='M16 6.20041L8 8.00041L10.45 5.40039L16 6.20041Z'
                fill='#FFB845'
              />
              <path d='M8 8L12.95 15.6L12 10.1L8 8Z' fill='#FFB845' />
              <path d='M3.0498 15.6L7.99981 8V13L3.0498 15.6Z' fill='#FFB845' />
              <path
                d='M8.00002 8.00117L0 6.20117L4.00001 10.1012L8.00002 8.00117Z'
                fill='#FFB845'
              />
            </g>
            <defs>
              <clipPath id='clip0_3622_191778'>
                <rect width='16' height='16' fill='white' />
              </clipPath>
            </defs>
          </svg>
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
          {value.pair}
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
      return (
        <div className='text-zinc-700 text-sm font-semibold leading-tight'>
          {value.price}
        </div>
      );
    },
  },
  {
    key: 'change_price',
    title: '24h%',
    width: 190,
    align: 'right',
    render: (_, value) => {
      return (
        <p
          style={{
            color: value.change_price === '5.05%' ? '#1AB369' : '#FA3363',
          }}
          className='text-sm font-semibold'
        >
          {value.change_price}
        </p>
      );
    },
  },
  {
    key: 'volume',
    title: 'Volume (24h)',
    width: 169,
    align: 'right',
    render: (_, value) => {
      return (
        <div className='text-zinc-700 text-sm font-semibold leading-tight'>
          {value.volumn}
        </div>
      );
    },
  },
  {
    key: 'change_volume',
    title: 'Volumn %',
    width: 190,
    align: 'right',
    render: (_, value) => {
      return (
        <div
          className='text-sm font-semibold'
          style={{
            color: value.change_vol === '5.05%' ? '#1AB369' : '#FA3363',
          }}
        >
          {value.change_vol}
        </div>
      );
    },
    sortIcon: renderSortIcon,
    sorter: true,
  },
];

const CoinTableInfo = () => {
  const [data, setData] = useState<IData[]>([]);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(999);
  const [order, setOrder] = useState({
    columnKey: '',
    order: '',
  });

  const getCoins = useCallback(async () => {
    /* #region fake */
    setData(cloneDeep(dataExample.slice(0, pageSize)));
    setTotal(9999);
    /* #endregion */

    FetchCoins().then((res: any) => {
      console.log(res);
    });
  }, [pageSize]);

  useEffect(() => {
    getCoins();
  }, [getCoins, pageSize, currentPage, order]);

  const _renderRange = () => {
    const start = (currentPage - 1) * pageSize + 1;
    const end = start + data.length - 1;
    return (
      <span className='table-total'>
        {start} - {end} from {total}
      </span>
    );
  };

  const _onChangePage = (page: number) => {
    setCurrentPage(page);
  };

  const _onChangeSize = (value: number) => {
    setPageSize(value);
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
    return [
      ...Array.from(Array(20).keys()).map(() => ({
        id: random(1, 100000),
        name: `name-${searchKey}${random(1, 100000)}`,
        code: `code-${searchKey}${random(100, 999)}`,
        thumb: '',
        isSelected: false,
      })),
    ];
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

  return (
    <div className='home-table coin-tab'>
      <div className=''>
        <div className='filter flex justify-between'>
          <div className='flex'>
            <FilterCustom
              placeholder='Filter coins'
              renderOption={_renderOption}
              renderTag={_renderTag}
              onChange={() => {}}
              getData={_getData}
            />
          </div>
        </div>
        <div className='overflow-x-auto'>
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
      </div>
    </div>
  );
};
export default CoinTableInfo;
