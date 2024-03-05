'use client';

import BreadcrumbContext from '@/context/Breadcrumb/BreadcrumbContext';
import { IDetail } from '@/models/IDetail';
import { FetchCoinDetail } from '@/usecases/coin-info';
import dynamic from 'next/dynamic';
import { memo, useContext, useEffect, useState } from 'react';

const CoinInformation = dynamic(() => import('../information'), { ssr: false });
const CoinTabInfo = dynamic(() => import('../coinTabInfo/Index'), {
  ssr: false,
});

const MainData = ({ slug }: any) => {
  const { handleBreadcrumb } = useContext(BreadcrumbContext);

  const [data, setData] = useState<IDetail | null>(null);
  const getData = async () => {
    try {
      const res: any = await FetchCoinDetail({
        coin_key: slug,
      });
      if (res.name) handleBreadcrumb([{ title: res.name }]);
      setData(res);
    } catch (error) {
      return null;
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className='flex flex-col gap-4'>
      <CoinInformation data={data} slug={slug} />
      <CoinTabInfo data={data} slug={slug} />
    </div>
  );
};

export default memo(MainData);
