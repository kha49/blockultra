import { useEffect, useState } from 'react';
import { Checkbox, Pagination, Select, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import './style.scss';
import SelectItemTable from '@/components/SelectItemTable';
import FilterCustom from '@/components/FilterCustom';
import {
  ICustomTagProp,
  IOptionAny,
  IOptionCustom,
} from '@/components/FilterCustom/props';
import { isArray, random, round } from 'lodash';
import { nFormatter, percentFormat, renderSortIcon } from '@/helpers';
import { FetchCategories } from '@/usecases/home';
import { IResponseAxios } from '@/models/IResponse';

import ReactECharts from 'echarts-for-react';
import { COLOR_CHART } from '@/helpers/constants';

const columns: ColumnsType<IHomeCategory> = [
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
    width: 320,
    align: 'left',
    render: (_, value) => {
      const { rankedCoins } = value;
      const elements: JSX.Element[] = rankedCoins.map((e, index) => {
        return (
          <img
            style={{ marginLeft: -index * 5, zIndex: index + 1 }}
            className='rounded-full border w-6 h-6'
            src={e.iconUrl}
            width={24}
            height={24}
            alt={e.name}
            key={e.key}
          />
        );
      });
      return (
        <div className='flex'>
          <div className='flex'>{elements}</div>
          <div className='ml-2'>{value.name}</div>
        </div>
      );
    },
    sortIcon: renderSortIcon,
    sorter: true,
  },
  {
    key: 'avgPriceChange',
    title: 'Avg Price Change (24h)',
    width: 250,
    align: 'right',
    render: (_, value) => {
      return percentFormat(value.avgPriceChange['24H']);
    },
    sortIcon: renderSortIcon,
    sorter: true,
  },
  {
    key: 'marketCap',
    title: 'Market Cap',
    width: 190,
    align: 'right',
    render: (_, value) => {
      const { yesterday } = value;
      return (
        <p className='flex flex-col justify-end'>
          {nFormatter(value.marketCap, 2, '$')}
          {increasePercent(yesterday.volume24h, value.marketCap)}
        </p>
      );
    },
    sortIcon: renderSortIcon,
    sorter: true,
  },
  {
    key: 'volume',
    title: 'Volume (24h)',
    align: 'right',
    render: (_, value) => {
      const { yesterday } = value;
      return (
        <p className='flex flex-col justify-end'>
          {nFormatter(value.volume24h, 2, '$')}
          {increasePercent(yesterday.volume24h, value.volume24h)}
        </p>
      );
    },
    sortIcon: renderSortIcon,
    sorter: true,
  },
  {
    key: 'dominance',
    title: 'Dominance',
    align: 'right',
    render: (_, value) => {
      return percentFormat(value.dominance);
    },
    sortIcon: renderSortIcon,
    sorter: true,
  },
  {
    key: 'gainers',
    title: 'Gainers',
    align: 'right',
    render: (_, value) => {
      return (
        <div className='flex items-center'>
          <ReactECharts
            style={{
              height: 32,
              width: 32,
            }}
            option={{
              option: {
                tooltips: { enabled: false },
                hover: { mode: null },
              },
              emphasis: {
                scale: false,
              },
              series: [
                {
                  name: 'Access From',
                  type: 'pie',
                  radius: ['40%', '70%'],
                  avoidLabelOverlap: false,
                  label: {
                    show: false,
                    position: 'center',
                  },
                  labelLine: {
                    show: false,
                  },
                  data: [
                    {
                      value: value.losers,
                      name: 'losers',
                      itemStyle: {
                        color: COLOR_CHART.RADICAL_RED,
                      },
                    },
                    {
                      value: value.gainers,
                      name: 'Gainers',
                      itemStyle: {
                        color: COLOR_CHART.CRAYOLA,
                      },
                    },
                  ],
                },
              ],
            }}
          />
          <span className='ml-1'>
            {round((value.gainers / (value.gainers + value.losers)) * 100, 2)}%
          </span>
        </div>
      );
    },
    sortIcon: renderSortIcon,
    sorter: true,
  },
];

const increasePercent = (old: number, newValue: number) => {
  return percentFormat(((newValue - old) / old) * 100);
};

const Categories = () => {
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState<IHomeCategory[]>([]);
  const [total, setTotal] = useState(0);
  const [order, setOrder] = useState({
    columnKey: '',
    order: '',
  });

  useEffect(() => {
    _fetchCategories();
  }, [currentPage, order, pageSize]);

  const _fetchCategories = async () => {
    const response: IResponseAxios<IHomeCategory> = await FetchCategories({
      limit: pageSize,
      page: currentPage,
      columnKey: order.columnKey,
      order: order.order,
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
    setPageSize(value);
  };

  const _renderRange = () => {
    const start = (currentPage - 1) * pageSize + 1;
    const end = start + data.length - 1;
    return (
      <span className='table-total'>
        {start} - {end} from {total}
      </span>
    );
  };

  const _renderOption = ({ name, code, checked }: IOptionCustom) => {
    return (
      <Select.Option isSelectOption={true} value={code} key={name}>
        <div className='flex pr-0 pl-0 mr-0 ml-0 select-coin-custom__item px-3 justify-between'>
          <div className=''>
            <span className='name mx-2'>{name}</span>
            {/* <span className='code px-2 rounded py-0 bg-[#EEF2F6] text-[#9FA4B7] leading-5'>
              {code}
            </span> */}
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

  return (
    <div className='category-tab'>
      <div className='mb-4'>
        <FilterCustom
          placeholder='Filter Categories'
          renderOption={_renderOption}
          renderTag={_renderTag}
          onChange={() => {}}
          getData={_getData}
        />
      </div>
      <div className='overflow-x-auto hide-scroll'>
        <Table
          columns={columns}
          dataSource={data}
          pagination={{ position: ['none'], pageSize }}
          rowKey='id'
          showSorterTooltip={false}
          onChange={(_page, _filter, sort) => {
            const itemSort = isArray(sort) ? sort[0] : sort;
            setOrder({
              columnKey: itemSort.columnKey
                ? itemSort.columnKey.toString()
                : '',
              order: itemSort.order ? itemSort.order.toString() : '',
            });
          }}
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
  );
};

export default Categories;
