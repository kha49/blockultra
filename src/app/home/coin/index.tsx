import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import './style.scss';
import { Button, Checkbox, Pagination, Select, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { FetchCoins } from '@/usecases/home';
import { get, isArray, random, round } from 'lodash';
import SelectItemTable from '@/components/SelectItemTable';
import { IconFilterCoinTab } from '@/assets/icons/home/IconFilterCoinTab';
import { IconCustomCointTab } from '@/assets/icons/home/IconCustomCoinTab';
import FilterCustom from '@/components/FilterCustom';
import {
  ICustomTagProp,
  IOptionAny,
  IOptionCustom,
} from '@/components/FilterCustom/props';
import {
  currencyFormat,
  nFormatter,
  percentFormat,
  renderSortIcon,
} from '@/helpers';
import { IResponseAxios } from '@/models/IResponse';
import { IHomeCoin } from './props';
import Image from 'next/image';
import { caculatorAverage24h } from '@/helpers/functions';

const columns: ColumnsType<IHomeCoin> = [
  {
    key: 'id',
    title: '#',
    width: 40,
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
      const imageSource = get(value, 'image.x60', '');
      return (
        <span className='table-header'>
          <div className='flex items-center'>
            <img src={imageSource} alt={value.name} className='w-7 h-7' />
            <Link href={`/en/detail/${value.symbol}`} className='mx-2'>
              {value.name}
            </Link>
            <span className='px-2 rounded py-0 bg-[#EEF2F6] text-[#9FA4B7] leading-5 coin-code'>
              {value.symbol}
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
    width: 50,
    align: 'right',
    render: (_, value) => {
      // return null;
      // if (!value.rate) {
      return <span>-</span>;
      // }

      // return (
      //   <p className='inline-flex items-center'>
      //     <span className='mr-1'>{value.rate}</span> <IconStarCoinTab />
      //   </p>
      // );
    },
    sortIcon: renderSortIcon,
    sorter: true,
  },
  {
    key: 'price',
    title: 'Price',
    width: 200,
    align: 'right',
    render: (_, value) => {
      return currencyFormat(value.price.USD, '$');
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
      const avg = round(caculatorAverage24h(value.price, value.histPrices), 2);
      return percentFormat(avg);
    },
  },
  {
    key: 'volume',
    title: 'Volume (24h)',
    width: 186,
    align: 'right',
    render: (_, value: any) => {
      return nFormatter(value.volume24h, 2, '$');
    },
  },
  {
    key: 'marketCap',
    title: 'Market Cap',
    width: 168,
    align: 'right',
    render: (_, value) => {
      // return value.marketCap;
      return nFormatter(Number(value.marketCap), 2, '$');
    },
  },
  {
    key: 'graph',
    title: 'Price Graph (7d)',
    width: 261,
    align: 'right',
    render: (_, value) => {
      try {
        return (
          <div className='flex items-center justify-end'>
            <img
              width={200}
              height={52}
              src={`data:image/svg+xml;base64,${value.chart}`}
            />
          </div>
        );
      } catch (error) {
        return null;
      }
    },
  },
];

const Coins = () => {
  const [data, setData] = useState<IHomeCoin[]>([]);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(999);
  const [order, setOrder] = useState({
    columnKey: '',
    order: '',
  });

  const getCoins = useCallback(async () => {
    const response: IResponseAxios<IHomeCoin> = await FetchCoins({
      limit: pageSize,
      page: currentPage,
      columnKey: order.columnKey,
      order: order.order,
    });

    if (!response) return;
    const { data, total } = response;
    setData(data);
    setTotal(total!!);

    /* #endregion */
  }, [pageSize, currentPage, order]);

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

  return (
    <div className='home-table coin-tab'>
      <div className=''>
        <div className='filter flex justify-between mb-4'>
          <div className='flex'>
            <FilterCustom
              placeholder='Filter Coins'
              renderOption={_renderOption}
              renderTag={_renderTag}
              onChange={() => {}}
              getData={_getData}
            />
            <Button className='ml-1 h-10 hidden xl:block md:block'>
              <div className='flex'>
                <IconFilterCoinTab />
                <span className='ml-1'>Filters</span>
              </div>
            </Button>
          </div>
          <div>
            <Button className='ml-1 h-10 hidden xl:block md:block'>
              <div className='flex'>
                <IconCustomCointTab />
                <span className='ml-1'>Customize</span>
              </div>
            </Button>
          </div>
        </div>
        <div className='overflow-x-auto hide-scroll'>
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
            size='small'
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
