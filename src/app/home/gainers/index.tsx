import { useEffect, useState } from 'react';
import './style.scss';
import { FetchGainers, FetchLosers } from '@/usecases/home';
import GainersHeader from './gainers-header';
import TopData from './top-data';
import { caculatorAverage24h } from '@/helpers/functions';
import { ORDER } from '@/helpers/constants';
import { Tabs } from 'antd';

const tabs = [
  {
    id: 1,
    label: 'Top Gainers',
  },
  {
    id: 2,
    label: 'Top Losers',
  },
];

const Gainers = () => {
  const [gainers, setGainers] = useState([]);
  const [losers, setLosers] = useState([]);
  const [filterCoin, setFilterCoin] = useState('all');
  const [filterTime, setTime] = useState('24h');
  const [orderGainer, setOrderGainer] = useState({
    columnKey: '',
    order: '',
  });

  const [orderLoser, setOrderLoser] = useState({
    columnKey: '',
    order: '',
  });

  function getGainers() {
    FetchGainers({
      time: filterTime,
      coin: filterCoin,
      sort_by: orderGainer.columnKey,
      sort_order: ORDER[orderGainer['order'] as keyof typeof ORDER],
    }).then((res: any) => {
      res.data.map((item: any) => {
        const average24 = caculatorAverage24h(item.price, item.histPrices);
        item.average24 = average24;
        return item;
      });
      setGainers(res.data);
    });
  }

  function getLosers() {
    FetchLosers({
      time: filterTime,
      coin: filterCoin,
      sort_by: orderLoser.columnKey,
      sort_order: ORDER[orderLoser['order'] as keyof typeof ORDER],
    }).then((res: any) => {
      res.data.map((item: any) => {
        const average24 = caculatorAverage24h(item.price, item.histPrices);
        item.average24 = average24;
        return item;
      });
      setLosers(res.data);
    });
  }

  useEffect(() => {
    getGainers();
    getLosers();
  }, [filterTime, filterCoin, orderGainer]);

  const renderTopData = (id: number, isMobile?: boolean) => {
    if (id === 1) {
      return (
        <TopData
          title={isMobile ? '' : 'Top Gainers'}
          data={gainers}
          onChangeOrder={() => {}}
        />
      );
    }
    if (id === 2) {
      return (
        <TopData
          title={isMobile ? '' : 'Top Losers'}
          data={losers}
          onChangeOrder={setOrderLoser}
        />
      );
    }
  };

  return (
    <div className='hide-scroll'>
      <div className={'md:p-6'}>
        <GainersHeader onFilterCoins={setFilterCoin} onFilterTime={setTime} />
        <div className='flex-col xl:flex-row gap-10 lg:gap-20 hidden md:flex'>
          {tabs.map((tab) => renderTopData(tab.id, false))}
        </div>
        <div className={'block md:hidden gains-mobile'}>
          <Tabs
            centered
            size={'large'}
            items={tabs.map((tab) => {
              return {
                label: tab.label,
                key: tab.label,
                children: renderTopData(tab.id),
              };
            })}
          />
        </div>
      </div>
    </div>
  );
};

export default Gainers;
