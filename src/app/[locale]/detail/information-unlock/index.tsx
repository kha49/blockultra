'use client';

import { graphic } from 'echarts';
import ReactECharts from 'echarts-for-react';
import './style.scss';
import CountdownTimer from '@/components/CountdownTimer/CountDownTimer';
import { IconUnLock } from '@/assets/icons';
import { FetchUnlockToken } from '@/usecases/coin-info';
import { useEffect, useState } from 'react';
import { currencyFormat } from '@/helpers';
import { IUnlock } from '../../unlock-schedule/types';

// export interface IUnlock {
//   date: Date;
//   lockedTokensPercent: number;
//   unlockedTokensPercent: number;
//   lockedTokens: number;
//   unlockedTokens: number;
//   nextUnlockPercent: number;
// }

export default function InformationUnlock() {
  const [data, setData] = useState<ITotalUnlockProgress>({
    totalRemainingTime: new Date(),
    totalUnlockedPercent: 0,
    totalUnlockedToken: 0,
    totalUnlockedValue: 0,
    totalLockedPercent: 0,
    totalLockedToken: 0,
    totalLockedValue: 0,
    totalNextUnlockPercent: 0,
    totalNextUnlockToken: 0,
    totalNextUnlockValue: 0,
    remainingTime: new Date(),
    percentOfMarketCap: 0,
  });

  async function fetchUnlock() {
    let data: any = await FetchUnlockToken({ coin_key: 'avalanche' });
    //   const tokenUnlock: any = fetchUnlock() || {};
    //   const lockedTokens = tokenUnlock.lockedTokens;
    //   const lockedTokensPercent = tokenUnlock.lockedTokensPercent;
    //   const unlockedTokens = tokenUnlock.unlockedTokens;
    //   const nextUnlockPercent = tokenUnlock.nextUnlockPercent;
    //   const dateNextUnlock = tokenUnlock.date;
    //  const totalToken = (lockedTokens * 100) / lockedTokensPercent;
    setData(data);
  }

  useEffect(() => {
    fetchUnlock();
  }, []);

  const countDownTime = new Date(data.remainingTime);
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
          { value: data.totalUnlockedPercent, name: 'Unlock' },
          { value: data.totalNextUnlockPercent, name: 'Next unlock' },
          {
            value:
              1 -
              parseFloat(data.totalUnlockedPercent + '') -
              parseFloat(data.totalNextUnlockPercent + ''),
            name: 'Block',
          },
        ],
      },
    ],
  };

  return (
    <div className='chart'>
      <div className='relative'>
        <div className='chart__unlock'>
          <IconUnLock />
          <div className='percent'>
            {currencyFormat(data.totalLockedPercent, '')}%
          </div>
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
