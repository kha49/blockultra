import { ReactNode, useState } from 'react';
import { Checkbox, Pagination, Select, Table, Tag } from 'antd';
import type { PaginationProps } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import './style.scss';
import SelectItemTable from '@/components/SelectItemTable';
import FilterCustom from '@/components/FilterCustom';
import {
  ICustomTagProp,
  IOptionAny,
  IOptionCustom,
} from '@/components/FilterCustom/props';
import type { CustomTagProps } from 'rc-select/lib/BaseSelect';
import { isArray, random } from 'lodash';
import { renderSortIcon } from '@/helpers';

const columns: ColumnsType<any> = [
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
      return value.name;
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
      return value.avgPriceChange['24H'];
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
      return value.marketCap;
    },
    sortIcon: renderSortIcon,
    sorter: true,
  },
  {
    key: 'volume',
    title: 'Volume (24h)',
    align: 'right',
    render: (_, value) => {
      return value.volume24h;
    },
    sortIcon: renderSortIcon,
    sorter: true,
  },
  {
    key: 'dominance',
    title: 'Dominance',
    align: 'right',
    render: (_, value) => {
      return value.dominance;
    },
    sortIcon: renderSortIcon,
    sorter: true,
  },
  {
    key: 'gainers',
    title: 'Gainers',
    align: 'right',
    render: (_, value) => {
      return value.gainers;
    },
    sortIcon: renderSortIcon,
    sorter: true,
  },
];

const data = [
  ...Array.from(Array(10).keys()).map((e) => ({
    id: 1,
    name: (
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
        <svg
          width='32'
          height='32'
          viewBox='0 0 32 32'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
          className='ml-[-8px]'
        >
          <g clipPath='url(#clip0_596_8435)'>
            <path
              d='M16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32Z'
              fill='#121747'
            />
            <path
              d='M18.0174 22.864C18.0174 24.009 17.0974 24.938 15.9614 24.938C14.8254 24.938 13.9064 24.009 13.9064 22.863V9.074C13.9064 7.929 14.8264 7 15.9614 7C17.0964 7 18.0174 7.929 18.0174 9.075V22.864ZM11.0974 22.869C11.104 23.235 11.0136 23.5962 10.8353 23.9159C10.657 24.2356 10.3972 24.5023 10.0824 24.689C9.76921 24.8741 9.41212 24.9718 9.04835 24.9718C8.68459 24.9718 8.3275 24.8741 8.01435 24.689C7.69967 24.5022 7.44008 24.2354 7.26197 23.9157C7.08386 23.596 6.99359 23.2349 7.00035 22.869V19.769C6.99359 19.4031 7.08386 19.042 7.26197 18.7223C7.44008 18.4026 7.69967 18.1358 8.01435 17.949C8.3275 17.7639 8.68459 17.6662 9.04835 17.6662C9.41212 17.6662 9.76921 17.7639 10.0824 17.949C10.397 18.1358 10.6566 18.4026 10.8347 18.7223C11.0128 19.042 11.1031 19.4031 11.0964 19.769L11.0974 22.869Z'
              fill='white'
            />
            <path
              opacity='0.5'
              d='M25.112 17.309C25.112 18.454 24.192 19.383 23.056 19.383C21.92 19.383 21 18.453 21 17.308V12.075C21 10.929 21.92 10 23.056 10C24.192 10 25.112 10.929 25.112 12.075V17.309Z'
              fill='white'
            />
          </g>
          <defs>
            <clipPath id='clip0_596_8435'>
              <rect width='32' height='32' fill='white' />
            </clipPath>
          </defs>
        </svg>
        <svg
          width='32'
          height='32'
          viewBox='0 0 32 32'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
          className='ml-[-8px]'
        >
          <g clipPath='url(#clip0_596_8441)'>
            <path
              d='M16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32Z'
              fill='#57BEEA'
            />
            <path
              d='M7.02601 19.009C6.64541 19.0534 6.25974 19.0166 5.8944 18.9011C5.52905 18.7855 5.19234 18.5939 4.90643 18.3388C4.62052 18.0837 4.39192 17.7709 4.23569 17.421C4.07945 17.0712 3.99913 16.6922 4.00001 16.309C3.99838 15.5939 4.27929 14.907 4.78158 14.398C5.28388 13.8889 5.96691 13.5989 6.68201 13.591C7.64201 9.181 11.552 5.88 16.228 5.88C17.101 5.88 17.948 5.995 18.753 6.21C18.9992 5.83796 19.3337 5.53273 19.7267 5.32158C20.1197 5.11043 20.5589 4.99994 21.005 5C21.7241 5.00185 22.413 5.28922 22.9203 5.79892C23.4275 6.30862 23.7116 6.99891 23.71 7.718C23.71 8.187 23.592 8.628 23.384 9.012C25.0696 10.83 26.0043 13.2188 26 15.698C26.0023 16.9965 25.7468 18.2826 25.2483 19.4816C24.7498 20.6807 24.0182 21.7688 23.096 22.683C23.422 23.131 23.614 23.684 23.614 24.282C23.6148 24.6381 23.5454 24.991 23.4099 25.3203C23.2743 25.6496 23.0752 25.949 22.8239 26.2014C22.5726 26.4538 22.2741 26.6542 21.9454 26.7913C21.6167 26.9283 21.2642 26.9992 20.908 27C20.3634 26.9994 19.8317 26.8345 19.3823 26.5269C18.9329 26.2193 18.5868 25.7834 18.389 25.276C17.6802 25.4362 16.9557 25.5167 16.229 25.516C11.988 25.516 8.37801 22.802 7.02601 19.009ZM7.51601 18.904C8.81601 22.472 12.226 25.019 16.228 25.019C16.923 25.019 17.6 24.942 18.251 24.797C18.1742 24.4045 18.1851 23.9999 18.283 23.6121C18.3809 23.2244 18.5633 22.863 18.8173 22.5541C19.0712 22.2451 19.3903 21.9961 19.7518 21.8249C20.1132 21.6538 20.5081 21.5647 20.908 21.564C21.628 21.564 22.284 21.847 22.768 22.308C23.6374 21.441 24.3268 20.4107 24.7965 19.2763C25.2662 18.1419 25.507 16.9258 25.505 15.698C25.505 13.288 24.595 11.092 23.1 9.438C22.604 10.048 21.85 10.437 21.005 10.437C20.6488 10.4362 20.2962 10.3653 19.9674 10.2282C19.6386 10.0911 19.34 9.89058 19.0887 9.63808C18.8374 9.38558 18.6384 9.08605 18.5029 8.7566C18.3674 8.42715 18.2981 8.07423 18.299 7.718C18.299 7.344 18.375 6.987 18.511 6.662C17.7648 6.47273 16.9979 6.37732 16.228 6.378C11.812 6.378 8.11601 9.479 7.18101 13.633C7.80751 13.7467 8.3741 14.0771 8.78173 14.5662C9.18936 15.0554 9.4121 15.6723 9.41101 16.309C9.41192 16.8869 9.22859 17.4501 8.88764 17.9168C8.54669 18.3834 8.06587 18.7292 7.51501 18.904H7.51601ZM16.228 18.42C15.8715 18.4191 15.5186 18.3479 15.1896 18.2107C14.8605 18.0734 14.5617 17.8726 14.3103 17.6198C14.0588 17.3671 13.8596 17.0673 13.724 16.7375C13.5884 16.4078 13.5191 16.0545 13.52 15.698C13.52 14.195 14.732 12.977 16.228 12.977C17.724 12.977 18.937 14.195 18.937 15.698C18.9379 16.0546 18.8686 16.4079 18.7329 16.7378C18.5973 17.0676 18.398 17.3674 18.1464 17.6202C17.8948 17.873 17.5959 18.0737 17.2668 18.2109C16.9376 18.3482 16.5846 18.4192 16.228 18.42Z'
              fill='white'
            />
          </g>
          <defs>
            <clipPath id='clip0_596_8441'>
              <rect width='32' height='32' fill='white' />
            </clipPath>
          </defs>
        </svg>

        <span className='mx-2'>Currency</span>
      </div>
    ),
    avgPriceChange: <span className='text-[#1AB369]'>+5.63%</span>,
    marketCap: (
      <p className='flex flex-col justify-end'>
        <span>$345.65B</span>
        <span className='text-[#1AB369] text-right'>+5.3%</span>
      </p>
    ),
    volume: (
      <p className='flex flex-col justify-end'>
        <span>$345.65B</span>
        <span className='text-[#1AB369] text-right'>+5.3%</span>
      </p>
    ),
    dominance: '33.05%',
    gainers: (
      <div className='flex gap-3 items-center justify-end'>
        <svg
          width='32'
          height='32'
          viewBox='0 0 32 32'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M32.0001 16C32.0001 24.8366 24.8367 32 16.0001 32C7.16357 32 0.00012207 24.8366 0.00012207 16C0.00012207 7.16344 7.16357 0 16.0001 0C24.8367 0 32.0001 7.16344 32.0001 16ZM6.40012 16C6.40012 21.3019 10.6982 25.6 16.0001 25.6C21.3021 25.6 25.6001 21.3019 25.6001 16C25.6001 10.6981 21.3021 6.4 16.0001 6.4C10.6982 6.4 6.40012 10.6981 6.40012 16Z'
            fill='#FA3363'
          />
          <path
            d='M29.8565 8C28.185 5.10479 25.6485 2.8059 22.6034 1.42618C19.5583 0.0464593 16.1575 -0.34477 12.8787 0.307436C9.59982 0.959642 6.60761 2.62252 4.32229 5.06253C2.03698 7.50253 0.573365 10.5971 0.137004 13.9116C-0.299357 17.2261 0.313459 20.594 1.88938 23.5424C3.46531 26.4907 5.92517 28.8714 8.92351 30.35C11.9218 31.8286 15.308 32.3309 18.6065 31.7863C21.9049 31.2417 24.9499 29.6776 27.3138 27.3137L22.7883 22.7882C21.37 24.2066 19.543 25.145 17.5639 25.4718C15.5849 25.7985 13.5532 25.4971 11.7542 24.61C9.95515 23.7228 8.47923 22.2944 7.53368 20.5254C6.58812 18.7564 6.22043 16.7356 6.48225 14.747C6.74407 12.7583 7.62224 10.9015 8.99343 9.43752C10.3646 7.97351 12.1599 6.97578 14.1273 6.58446C16.0946 6.19314 18.135 6.42788 19.9621 7.25571C21.7892 8.08354 23.311 9.46288 24.314 11.2L29.8565 8Z'
            fill='#1AB369'
          />
        </svg>
        <span>79%</span>
      </div>
    ),
  })),
];

const Categories = () => {
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(999);
  const [order, setOrder] = useState({
    columnKey: '',
    order: '',
  });

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
      <div>
        <FilterCustom
          placeholder='Filter Categories'
          renderOption={_renderOption}
          renderTag={_renderTag}
          onChange={() => {}}
          getData={_getData}
        />
      </div>
      <div className='overflow-x-auto '>
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
