import { useEffect } from 'react';
import './style.scss';
import { Space } from 'antd';
import { FetchGainers } from '../../../usecases/home';
import GainersHeader from './gainers-header';
import TopData from './top-data';

const Gainers = () => {

  function getGainers() {
    FetchGainers().then((res: any) => {
      console.log(res);
    });
  }

  useEffect(() => {
    getGainers();
  }, []);

  return (
    <div className=''>
      <GainersHeader
        onFilterCoins={(coin) => console.log(coin)}
        onFilterTime={(time) => console.log(time)}
      />
      <div className='p-6'>
        <Space size={[80, 80]}>
          <TopData title='Top Gainers' data={[]} />
          <TopData title='Top Losers' data={[]} />
        </Space>
      </div>
    </div>
  );
};

export default Gainers;
