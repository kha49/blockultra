import Link from 'next/link';
import { ReactNode, useCallback, useEffect, useState } from 'react';
import './style.scss';
import { Button, Checkbox, Pagination, Select, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { FetchCoins } from '../../../usecases/home';
import IconStarCoinTab from '@/assets/icons/home/IconStarCoinTab';
import { cloneDeep, isArray, random } from 'lodash';
import SelectItemTable from '@/components/SelectItemTable';
import { IconFilterCoinTab } from '@/assets/icons/home/IconFilterCoinTab';
import { IconCustomCointTab } from '@/assets/icons/home/IconCustomCoinTab';
import FilterCustom from '@/components/FilterCustom';
import {
  ICustomTagProp,
  IOptionAny,
  IOptionCustom,
} from '@/components/FilterCustom/props';
import { IconUp } from '@/assets/icons/home/IconUp';
import { renderSortIcon } from '@/helpers';

interface IData {
  id: number;
  name: ReactNode | string;
  rate: string;
  price: string;
  period: string;
  volume: string;
  marketCap: string;
  graph: string;
}

const dataExample: IData[] = [
  ...Array.from(new Array(1000).keys()).map((e) => ({
    id: e,
    name: `Bitcoin${e}`,
    rate: '4.3',
    price: '$12.168',
    period: '-5.63%',
    volume: '$345.65B',
    marketCap: '$345.65B',
    graph: e % 2 ? 'down' : 'increase',
  })),
];

const columns: ColumnsType<IData> = [
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
            <span className='px-2 rounded py-0 bg-[#EEF2F6] text-[#9FA4B7] leading-5 coin-code'>
              BTC
            </span>
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
    width: 91,
    align: 'right',
    render: (_, value) => {
      if (!value.rate) {
        return <span>-</span>;
      }

      return (
        <p className='inline-flex items-center'>
          <span className='mr-1'>{value.rate}</span> <IconStarCoinTab />
        </p>
      );
    },
    sortIcon: renderSortIcon,
    sorter: true,
  },
  {
    key: 'price',
    title: 'Price',
    width: 151,
    align: 'right',
    render: (_, value: any) => {
      return value.price['USD'];
    },
    sortIcon: renderSortIcon,
    sorter: true,
  },
  {
    key: 'period',
    title: '24h %',
    width: 167,
    align: 'right',
    render: (_, value) => {
      return (
        <p
          style={{ color: value.graph === 'increase' ? '#1AB369' : '#FA3363' }}
        >
          {/* {value.average24} */}
          123
        </p>
      );
    },
  },
  {
    key: 'volume',
    title: 'Volume (24h)',
    width: 186,
    align: 'right',
    render: (_, value: any) => {
      return value.volume24h;
    },
  },
  {
    key: 'marketCap',
    title: 'Market Cap',
    width: 168,
    align: 'right',
    render: (_, value) => {
      return value.marketCap;
    },
  },
  {
    key: 'graph',
    title: 'Price Graph (7d)',
    width: 261,
    align: 'right',
    render: (_, value) => {
      return (
        <div className='flex items-center justify-end'>
          {/* <img src={`data:image/svg+xml;base64,${value.chart}`} /> */}
        </div>
      );
    },
  },
];

const Coins = () => {
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

  // function searchCategoriesFilter() {
  //   SearchCategoriesFilter({ name: '' }).then((res: any) => {
  //     const data = res.map((item: any) => {
  //       return {
  //         value: item.name,
  //         label: item.name,
  //       };
  //     });
  //     setCoinsSearch(data);
  //   });
  // }

  // const onChange: PaginationProps['onChange'] = (pageNumber) => {
  //   setParams({ ...params, page: pageNumber });
  // };

  // const onShowSizeChange: PaginationProps['onShowSizeChange'] = (
  //   current,
  //   pageSize
  // ) => {
  //   const newParam = { ...params, page: current, limit: pageSize };
  //   setParams(newParam);
  // };

  // const onChangeSearch = (item: any) => {
  //   setParams({ ...params, search_key: item });
  // };

  // const onSearch = (item: any) => {
  //   setParams({ ...params, search_key: item });
  // };

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
            <span className='code px-2 rounded py-0 bg-[#EEF2F6] text-[#9FA4B7] leading-5'>
              {code}
            </span>
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

  const _onCHangeSort = (column: string, order: string) => {
    // console.log(sorter);
  };

  return (
    <div className='home-table coin-tab'>
      <div className=''>
        <div className='filter flex justify-between'>
          <div className='flex'>
            <FilterCustom
              placeholder='Filter Categories'
              renderOption={_renderOption}
              renderTag={_renderTag}
              onChange={() => {}}
              getData={_getData}
            />
            <Button className='ml-1 h-10'>
              <div className='flex'>
                <IconFilterCoinTab />
                <span className='ml-1'>Filters</span>
              </div>
            </Button>
          </div>
          <div>
            <Button className='ml-1 h-10'>
              <div className='flex'>
                <IconCustomCointTab />
                <span className='ml-1'>Customize</span>
              </div>
            </Button>
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

export default Coins;
