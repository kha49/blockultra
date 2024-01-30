'use client';

import { graphic } from 'echarts';
import ReactECharts from 'echarts-for-react';
import './style.scss';
import CountdownTimer from '@/components/CountdownTimer/CountDownTimer';
import { IconUnLock } from '@/assets/icons';
import { currencyFormat } from '@/helpers';
import IconCheckedCompleted from '@/assets/icons/IconCheckedCompleted';

export default function InformationUnlock({data} : any) {
  const countDownTime = data?.tokenUnlock ? new Date(data?.tokenUnlock.unlockChartRemainingTime) : new Date();

  const option = {
    color: [
      new graphic.LinearGradient(0, 0, 0, 1, [
        {
          offset: 0.5,
          color: 'rgb(84, 122, 255)',
        },
        {
          offset: 1,
          color: 'rgb(69, 81, 222)',
        },
      ]),
      'rgb(247, 147, 26)',
      '#ECEEFE',
      '#F1F4F7',
    ],
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: ['50%', '70%'],
        itemStyle: {
          borderRadius: 5,
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
        data: data?.tokenUnlock && Object.keys(data?.tokenUnlock).length > 0 ? [
          { value: data?.tokenUnlock?.unlockChartLocked, name: 'Unlock' },
          { value: data?.tokenUnlock?.unlockChartNextUnlock, name: 'Next unlock' },
          { value: data?.tokenUnlock?.unlockChartUnlocked, name: 'Block' },
        ] : [
          { value: 0, name: 'Unlock'},
          { value: 0, name: 'Next unlock' },
          { value: 0, name: 'Block' },
          { value: 100, name: 'N/A'}
        ],
      },
    ],
  };

  return (
    <div className='chart'>
      <div className='relative'>
        <div className='chart__unlock'>
          { data?.tokenUnlock && Object.keys(data?.tokenUnlock).length > 0 ? <IconUnLock /> : '' }
          <div>
            {data?.tokenUnlock && Object.keys(data?.tokenUnlock).length > 0 ? (
              <div className='text-2xl text-primary-500 font-jb font-bold'>
                {currencyFormat(data?.tokenUnlock?.unlockChartLocked, '')} %
              </div>
            ) : (<span className='text-grey-200 text-2xl'>N/A</span>)}
          </div>
        </div>
        <ReactECharts option={option} />
      </div>

      {
        data?.tokenUnlock && Object.keys(data?.tokenUnlock).length > 0 ? (
          <CountdownTimer
            countDownName={'Next Unlock'}
            targetDate={countDownTime}
          />
        ) : ''
      }

      {
        data && data?.tokenUnlock && Object.keys(data?.tokenUnlock).length > 0 && data?.tokenUnlock?.unlockChartLocked === 100 ? (
          <div className='flex items-center justify-center gap-2'>
            Fully Vested <IconCheckedCompleted />
          </div>
        ) : ''
      }
      
    </div>
  );
}
