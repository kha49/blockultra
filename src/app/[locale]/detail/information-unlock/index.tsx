'use client';

import { graphic } from 'echarts';
import ReactECharts from 'echarts-for-react';
import './style.scss';
import CountdownTimer from '@/components/CountdownTimer/CountDownTimer';
import { IconUnLock } from '@/assets/icons';

export default function InformationUnlock() {
  const countDownTime = new Date('2023-12-31T23:59:59');
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
        data: [
          { value: 30, name: 'Unlock' },
          { value: 10, name: 'Next unlock' },
          { value: 60, name: 'Block' },
        ],
      },
    ],
  };

  return (
    <div className='chart'>
      <div className='relative'>
        <div className='chart__unlock'>
          <IconUnLock />
          <div className='percent'>86%</div>
        </div>
        <ReactECharts option={option} />
      </div>

      <CountdownTimer
        countDownName={'Next Unlock'}
        targetDate={countDownTime}
      />
    </div>
  );
}
