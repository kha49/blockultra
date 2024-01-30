'use client';

import './index.scss';
import { COLOR_CHART } from '@/helpers/constants';
import ReactECharts from 'echarts-for-react';
import { CoinAllocation } from '../../../props';
import { round } from 'lodash';
import HexagonItem from '@/components/Hexa/Hexagon';

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
      <div className='flex text-grey-700 text-sm font-jm leading-tight'>
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
      <div className='flex items-center gap-3 mb-3'>
        <HexagonItem color={_color} />
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

  const optionPie2 = {
    color: ['#F1F4F7'],
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
        data: [{ value: 100 }],
      },
    ],
  };
  return (
    <div className='allocations'>
      <div className='text-neutral-600 flex justify-center text-base font-jb leading-normal items-center'>
        Token Allocation
      </div>
      {
        listTopCoin && listTopCoin.length > 0 ? (
          <div className='flex flex-col md:flex-row'>
            <div className='allocations__table relative justify-center flex'>
              <ReactECharts option={optionPie} />
              <div className='absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 flex flex-col justify-center items-center'>
                <div className='text-grey-700 text-xl font-jb leading-7 max-w-[62px] lg:max-w-[124px] truncate'>
                  {_returnCoinName(0)}
                </div>
                <div className='text-gray-400 text-base font-sb leading-normal'>
                  {_returnRate(0) + '%'}
                </div>
              </div>
            </div>
            <div className='allocations__indexs flex items-center justify-center md:justify-start'>
              <div>
                {...Array.from(Array(4).keys()).map((item: any) => {
                  return (
                    <div key={item} className='cursor-pointer'>
                      {_renderHexagon(item)}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        ) : (
          <div className='flex items-center justify-center relative'>
            <ReactECharts option={optionPie2} />
            <div className='text-grey-200 text-2xl absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4'>N/A</div>
          </div>
        )
      }
    </div>
  );
}
