'use client';

import { memo, useEffect, useState } from 'react';
import './index.scss';
import MarqueeItem from './MarqueeItem/MarqueeItem';
import { FetchHeaderBar } from '@/usecases/common';
import { IMarquee, IMarqueeItem } from './props';
import { IconGas } from '@/assets/icons/home/header/IconGas';

const Marquee = () => {
  const [data, setData] = useState<IMarqueeItem[]>();

  useEffect(() => {
    _getHeaderBar();
  }, []);

  const _getHeaderBar = async () => {
    const response: any = await FetchHeaderBar();
    if (!response) return;
    const marqueeData: IMarquee | null = response;
    if (!marqueeData) return;
    setData([
      {
        id: 1,
        coinName: 'Market Cap',
        coinPrice: marqueeData.totalMarketCap,
        percent: marqueeData.totalMarketCapChangePercent,
      },
      {
        id: 2,
        coinName: '24h Vol',
        coinPrice: marqueeData.totalVolume24h,
        percent: marqueeData.totalVolume24hChangePercent,
      },
      {
        id: 3,
        coinName: 'ETH Gas',
        icon: <IconGas />,
        coinPrice: marqueeData.totalMarketCap,
        percent: marqueeData.gas.average.gasPriceGwei,
        isGas: true,
        child: [
          {
            id: 31,
            coinName: 'Low',
            coinPrice: marqueeData.gas.low.gasPriceGwei,
            percent: marqueeData.gas.low.txExecutionTime,
          },
          {
            id: 32,
            coinName: 'Average',
            coinPrice: marqueeData.gas.average.gasPriceGwei,
            percent: marqueeData.gas.average.txExecutionTime,
          },
          {
            id: 33,
            coinName: 'High',
            coinPrice: marqueeData.gas.high.gasPriceGwei,
            percent: marqueeData.gas.high.txExecutionTime,
          },
        ],
      },
      {
        id: 4,
        coinName: 'BTC Dominance',
        coinPrice: marqueeData.btcDominance,
        percent: marqueeData.btcDominanceChangePercent,
      },
    ]);
  };

  const _renderMarquee = () => {
    if (!data) return;

    const elements: JSX.Element[] = data.map((item, index) => {
      const renderBr = index !== data.length - 1 || !!length;
      return (
        <div
          key={item.id}
          className='flex items-center gap-2 xl:gap-6 md:gap-6'
        >
          <MarqueeItem data={item} />
          {renderBr && <div className='bg-grey-400 w-[1px] h-5'></div>}
        </div>
      );
    });
    return elements;
  };

  return (
    <>
      <div></div>
      <div className='marquee'>
        <div className='flex items-center'>
          <div className='marquee__wrapper flex items-center gap-1 md:gap-6 xl:gap-6'>
            {_renderMarquee()}
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(Marquee);
