import React from 'react';
import Overview from './overview/Overview';
import Detail from './detail/Detail';
import { FetchCoinIDOIEO } from '@/usecases/coin-info';

const IEOIDODetail = async () => {
  const data = await FetchCoinIDOIEO({coin_key:"cardano",limit:10})
  return (
    <div className='fade-top py-3'>
      <Overview data={data} />
      <Detail />
    </div>
  );
};

export default IEOIDODetail;
