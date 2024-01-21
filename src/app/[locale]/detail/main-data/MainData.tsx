'use client'

import { FetchCoinDetail } from '@/usecases/coin-info';
import dynamic from 'next/dynamic';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';

const CoinInformation = dynamic(() => import('../information'), { ssr: false })
const CoinTabInfo = dynamic(() => import('../coinTabInfo/Index'), { ssr: false })

const MainData = ({slug} : any) => {
  const [data, setData] = useState({})

  const getData = async () => {
    try {
      const res: any = await FetchCoinDetail({
        coin_key: slug,
      });
      if (!res.name) return null;
      setData(res);
      if (!data) {
        redirect('/');
      }
    } catch (error) {
      return null;
    }
  }

  useEffect(() => {
    getData()
  }, [])
  

  return (
    <div className='flex flex-col gap-4'>
      <CoinInformation data={data} />
      <CoinTabInfo data={data} slug={slug} />
    </div>
  )
}

export default MainData