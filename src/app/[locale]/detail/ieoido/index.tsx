import React from 'react';
import Overview from './overview/Overview';
import Detail from './detail/Detail';
import { FetchCoinIDOIEO } from '@/usecases/coin-info';

const IEOIDODetail = async ({data, slug}:any) => {
  const fetchData: any = await FetchCoinIDOIEO({ coin_key: slug, limit: 10 });
  return (
    <div className='fade-top py-3'>
      <Overview tokenInfo={data} overView={fetchData?.overview} />
      <Detail tokenInfo={data} ieoidos={fetchData?.ieoidos} />
    </div>
  );
};

export default IEOIDODetail;
