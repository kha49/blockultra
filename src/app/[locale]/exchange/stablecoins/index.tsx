'use client';

import HexagonItem from '@/components/Hexa/Hexagon';
import './index.scss';
import { COLOR_CHART } from '@/helpers/constants';
import ReactECharts from 'echarts-for-react';

export default function StableCoins() {
  const option = {
    color: [
      COLOR_CHART.BITTER_LEMON,
      COLOR_CHART.MALACHITE,
      COLOR_CHART.PAOLO_VERONESE_GREEN,
      COLOR_CHART.TURQUOISE_SURF,
      COLOR_CHART.CERULEAN_FROST,
    ],
    series: [
      {
        name: 'StableCoins',
        type: 'pie',
        radius: ['50%', '70%'],
        itemStyle: {
          borderRadius: 0,
          borderColor: '#fff',
          borderWidth: 3,
          margin: 10,
        },
        silent: true,
        label: {
          show: false,
        },
        labelLine: {
          show: false,
        },
        emphasis: {
          focus: false,
          scale: false,
        },
        data: [
          { value: 40 },
          { value: 20 },
          { value: 10 },
          { value: 15 },
          { value: 15 },
        ],
      },
    ],
  };

  return (
    <div className='stablecoins flex flex-col md:flex-row items-center'>
      <div className='relative'>
        <ReactECharts option={option} />
        <div className='absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 flex flex-col justify-center items-center'>
          <div className='text-grey-700 text-xl font-jm font-medium'>
            StableCoins
          </div>
          <div className='text-grey-500 text-sm font-jm font-medium'>60%</div>
        </div>
      </div>
      <div className='note'>
        <div className='note__item flex gap-4 mb-2'>
          <HexagonItem color={COLOR_CHART.BITTER_LEMON} />
          <span className='text-grey-500 text-sm font-jm font-medium'>
            Stablecoins: 60.02%
          </span>
        </div>
        <div className='note__item flex gap-4 mb-2'>
          <HexagonItem color={COLOR_CHART.MALACHITE} />
          <span className='text-grey-500 text-sm font-jm font-medium'>
            Bitcoin: 11.9%
          </span>
        </div>
        <div className='note__item flex gap-4 mb-2'>
          <HexagonItem color={COLOR_CHART.PAOLO_VERONESE_GREEN} />
          <span className='text-grey-500 text-sm font-jm font-medium'>
            Fiat: 10.2%
          </span>
        </div>
        <div className='note__item flex gap-4 mb-2'>
          <HexagonItem color={COLOR_CHART.TURQUOISE_SURF} />
          <span className='text-grey-500 text-sm font-jm font-medium'>
            Ethereum: 17.7%
          </span>
        </div>
        <div className='note__item flex gap-4 mb-2'>
          <HexagonItem color={COLOR_CHART.CERULEAN_FROST} />
          <span className='text-grey-500 text-sm font-jm font-medium'>
            Others: 17.7%
          </span>
        </div>
      </div>
    </div>
  );
}
