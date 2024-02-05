import { useEffect, useState } from 'react';
import './style.scss';
import { Dropdown, Tabs } from 'antd';
import { FetchTrendings } from '../../../usecases/home';
import { caculatorAverage24h } from '@/helpers/functions';
import { ORDER, TIME_FILTER_ALL } from '@/helpers/constants';

import { isArray } from 'lodash';
import IconSelectArrow from '@/assets/icons/IconSelectArrow';
import { CoreTable } from '@/components/core-table';
import { useMediaQuery } from 'usehooks-ts';

const IconFire = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
    >
      <path
        d='M19.5 14.0003C19.5 18.1354 16.136 21.5003 12 21.5003C7.864 21.5003 4.5 18.1354 4.5 14.0003C4.5 11.7523 5.142 10.1513 6.646 8.64635C6.941 8.35035 7.275 8.05434 7.621 7.74834C9.037 6.49434 10.5 5.19737 10.5 2.99937C10.5 2.81537 10.602 2.64533 10.764 2.55833C10.926 2.47133 11.123 2.48036 11.277 2.58336C11.337 2.62336 16.915 6.44633 14.055 13.0143C14.726 12.6393 15.529 12.0243 16.022 11.0693C16.338 10.4573 16.499 9.76137 16.499 8.99937C16.499 8.79637 16.622 8.61336 16.81 8.53636C16.996 8.45936 17.213 8.50336 17.356 8.64836C18.719 10.0334 19.5 11.9844 19.5 14.0003Z'
        fill='url(#paint0_linear_2870_33418)'
      />
      <defs>
        <linearGradient
          id='paint0_linear_2870_33418'
          x1='12'
          y1='2.49902'
          x2='12'
          y2='21.5003'
          gradientUnits='userSpaceOnUse'
        >
          <stop stop-color='#FAA93F' />
          <stop offset='1' stop-color='#F04636' />
        </linearGradient>
      </defs>
    </svg>
  );
};

const Trending = () => {
  const [pageSize, setPageSize] = useState(50);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [order, setOrder] = useState({
    columnKey: '',
    order: '',
  });
  const [trendings, setTrendings] = useState([]);
  const isMobile = useMediaQuery('(max-width: 640px)');

  const [timeSelected, setTimeSelected] = useState({
    key: '1d',
    label: '24h',
  });

  function getTrendings(params: any) {
    FetchTrendings(params).then((res: any) => {
      res.data.map((item: any) => {
        const average24 = caculatorAverage24h(item.price, item.histPrices);
        item.average24 = average24;
        return item;
      });
      setTrendings(res.data);
      setTotal(res.total);
    });
  }

  useEffect(() => {
    getTrendings({
      limit: pageSize,
      page: currentPage,
      sort_order: ORDER[order.order as keyof typeof ORDER],
      sort_by: order.columnKey,
      duration: timeSelected.key,
    });
  }, [pageSize, currentPage, order, timeSelected]);

  const _onChangePage = (page: number) => {
    setCurrentPage(page);
  };

  const _onChangeSize = (value: number) => {
    setCurrentPage(1);
    setPageSize(value);
  };

  const tabs = [
    'Trending Coins',
    'Real World Assets',
    'Zero Knowledge (ZK)',
    'Binance Launchpad ',
  ];

  const _onChangeTime = ({ key }: { key: string }) => {
    const item = TIME_FILTER_ALL.find((a) => a?.key === key);
    if (!item) return;
    setTimeSelected({
      ...item,
    });
    // onFilterTime(item.key);
  };

  const handleOnChange = (_page: any, _filter: any, sort: any) => {
    const itemSort = isArray(sort) ? sort[0] : sort;
    setOrder({
      columnKey: itemSort.columnKey ? itemSort.columnKey.toString() : '',
      order: itemSort.order ? itemSort.order.toString() : '',
    });
  };

  const renderDropdown = () => {
    return (
      <Dropdown
        overlayClassName='overlay-menu-center'
        menu={{
          items: TIME_FILTER_ALL,
          onClick: _onChangeTime,
        }}
        arrow
        trigger={['click']}
        className='justify-center h-9 w-28 rounded border hover:cursor-pointer'
      >
        <div className='flex justify-between items-center py-2 px-4 text-sm font-medium font-jm'>
          {timeSelected.label} <IconSelectArrow />
        </div>
      </Dropdown>
    );
  };

  return (
    <div className='tab-trending flex flex-col'>
      <Tabs
        tabBarExtraContent={!isMobile && renderDropdown()}
        moreIcon={null}
        items={tabs.map((label, i) => {
          const id = String(i + 1);
          return {
            key: id,
            label: label,
            children: (
              <>
                {isMobile && <div className='pb-4'>{renderDropdown()}</div>}
                <CoreTable
                  className={'md:p-6'}
                  data={trendings}
                  type={'home_trending'}
                  onChange={handleOnChange}
                  pageSize={pageSize}
                  currentPage={currentPage}
                  total={total}
                  onChangePage={_onChangePage}
                  onChangeSize={_onChangeSize}
                  renderHeader={() => null}
                />
              </>
            ),
            icon: <IconFire />,
            disabled: true,
          };
        })}
      />
    </div>
  );
};

export default Trending;
