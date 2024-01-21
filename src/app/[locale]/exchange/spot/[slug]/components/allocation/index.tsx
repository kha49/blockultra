'use client';

import './index.scss';
import { COLOR_CHART } from '@/helpers/constants';
import ReactECharts from 'echarts-for-react';
import { CoinAllocation } from '../tabs/props';
import { round } from 'lodash';
import { useParams } from 'next/navigation';

export default function Allocation(props: any) {
  const totalVolume = props.total? props.total : 0.00001 ;
  const listTopCoin: CoinAllocation[] = props.list;
  const _returnVolume = (i: number) => {
    let vol;
    let total =
      listTopCoin[0]?.usdVolume +
      listTopCoin[1]?.usdVolume +
      listTopCoin[2]?.usdVolume;
    if (i < 3) {
      vol = listTopCoin[i]?.usdVolume;
    } else {
      vol = totalVolume - total;
    }
    return vol;
  };

  const _returnCoinName = (i: number) => {
    let name = listTopCoin[i]?.coinName;
    return name;
  };

  const _returnRate = (i: number) => {
    let rate = round((_returnVolume(i) / totalVolume) * 100, 2);
    return rate;
  };

  const _caculateCoin = (i: number) => {
    let rate = _returnRate(i);
    return (
      <div className='index__name flex text-zinc-700 text-sm font-jm leading-tight'>
        <span className='mr-1'>
          {i < 3 ? _returnCoinName(i) : 'Other' + ': '}
        </span>
        <span>{rate + '%'}</span>
      </div>
    );
  };

  const _renderHexagon = (i: number) => {
    let _color = optionPie.color[i];
    return (
      <div className='index hover:cursor-pointer flex mb-2'>
        <div>
          <svg
            className='w-4.5 h-5 hover:w-5.5 hover:h-6'
            viewBox='0 0 18 20'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M8 0.57735C8.6188 0.220085 9.3812 0.220085 10 0.57735L16.6603 4.42265C17.2791 4.77992 17.6603 5.44017 17.6603 6.1547V13.8453C17.6603 14.5598 17.2791 15.2201 16.6603 15.5774L10 19.4226C9.3812 19.7799 8.6188 19.7799 8 19.4226L1.33975 15.5774C0.720943 15.2201 0.339746 14.5598 0.339746 13.8453V6.1547C0.339746 5.44017 0.720943 4.77992 1.33975 4.42265L8 0.57735Z'
              fill={_color}
            />
          </svg>
        </div>

        {_caculateCoin(i)}
      </div>
    );
  };

  const optionPie = {
    color: [
      COLOR_CHART.BITTER_LEMON,
      COLOR_CHART.MALACHITE,
      COLOR_CHART.PAOLO_VERONESE_GREEN,
      COLOR_CHART.TURQUOISE_SURF,
      COLOR_CHART.CERULEAN_FROST,
      COLOR_CHART.PLUMP_PURPLE,
      COLOR_CHART.PURPUREUS,
      COLOR_CHART.JAZZBERRY_JAM,
      COLOR_CHART.CERISE,
      COLOR_CHART.SUNSET_ORANGE,
    ],
    series: [
      {
        name: 'Token Allocation',
        type: 'pie',
        radius: ['50%', '70%'],
        itemStyle: {
          borderRadius: 0,
          borderColor: '#fff',
          borderWidth: 3,
        },
        label: {
          show: false,
          position: 'center',
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 40,
            fontWeight: 'bold',
          },
        },
        labelLine: {
          show: false,
        },
        data: [
          { value: _returnVolume(0) },
          { value: _returnVolume(1) },
          { value: _returnVolume(2) },
          { value: _returnVolume(3) },
        ],
      },
    ],
  };
  return (
    <div className='allocations '>
      <div className='text-neutral-600 flex justify-center text-base font-jb leading-normal items-center'>
        Token Allocation
      </div>
      <div className='flex flex-col md:flex-row'>
        <div className='allocations__table relative justify-center flex'>
          <ReactECharts option={optionPie} />
          <div className='absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 flex flex-col justify-center items-center'>
            <div className='text-zinc-700 text-xl font-jb leading-7'>
              {_returnCoinName(0)}
            </div>
            <div className='text-gray-400 text-base font-sb leading-normal'>
              {_returnRate(0) + '%'}
            </div>
          </div>
        </div>
        <div className='allocations__indexs flex items-center justify-center md:justify-start'>
          <div>
            {_renderHexagon(0)}
            {_renderHexagon(1)}
            {_renderHexagon(2)}
            {_renderHexagon(3)}
          </div>
        </div>
      </div>
    </div>
  );
}
