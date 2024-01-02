import { useEffect, useState } from 'react';
import './style.scss';
import { Space } from 'antd';
import { FetchGainers, FetchLosers } from '../../../usecases/home';
import GainersHeader from './gainers-header';
import TopData from './top-data';
import { caculatorAverage24h } from '@/helpers/functions';

const Gainers = () => {
  const [gainers, setGainers] = useState();
  const [losers, setLosers] = useState();

  function getGainers() {
    FetchGainers().then((res: any) => {
      res.data.map((item: any) => {
        const average24 = caculatorAverage24h(item.price, item.histPrices);
        item.average24 = average24;
        return item;
      });
      setGainers(res.data);
    });
  }

  function getLosers() {
    FetchLosers().then((res: any) => {
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
  }, []);

  return (
    <div className='gainer-tab overflow-x-auto hide-scroll'>
      <GainersHeader
        onFilterCoins={(coin) => console.log(coin)}
        onFilterTime={(time) => console.log(time)}
      />
      <div className='p-6'>
        <Space size={[80, 80]} className='xl:flex-row sm: flex-col'>
          <TopData title='Top Gainers' data={[]} />
          <TopData title='Top Losers' data={[]} />
        </Space>
      </div>
    </div>
  );
};

export default Gainers;
