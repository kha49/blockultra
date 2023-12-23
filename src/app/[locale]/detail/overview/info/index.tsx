'use client';

import React from 'react';
import './index.scss';
import dynamic from 'next/dynamic';
const AdvancedRealTimeChart = dynamic(
  () =>
    import('react-ts-tradingview-widgets').then((w) => w.AdvancedRealTimeChart),
  {
    ssr: false,
  }
);

export default function InfoCharts() {
  return (
    <div className='info-charts'>
      <div className='info-charts__wrapper grid grid-cols-1 md:grid-cols-3 gap-4'>
        <div className='chart md:col-span-2'>
          <AdvancedRealTimeChart
            symbol={'BTCUSD'}
            interval={'60'}
            autosize
          ></AdvancedRealTimeChart>
        </div>
        <div className='info p-6'>
          <div className='info__item pb-5 mb-5 flex item-center justify-between'>
            <div className='label font-medium text-base font-jm'>
              Max Supply
            </div>
            <div className='value font-medium text-base font-jm'>
              <span className='price font-semibold mr-1'>1,176,761,269</span>
              <span className='tag'>C98</span>
            </div>
          </div>
          <div className='info__item pb-5 mb-5 flex item-center justify-between'>
            <div className='label font-medium text-base font-jm'>
              <span className='mr-2'>Price Change</span>
              <span className='time-tag text-xs'>24h</span>
            </div>
            <div className='value font-medium text-base font-jm'>
              <div className='price font-semibold'>1,176,761,269</div>
              <div className='percent-increment text-sm text-right'>+2.45%</div>
            </div>
          </div>
          <div className='info__item pb-5 mb-5 flex item-center justify-between'>
            <div className='label font-medium text-base font-jm'>
              <div>All Time High</div>
              <div className='time text-xs'>Dec 31, 2022</div>
            </div>
            <div className='value font-medium text-base font-jm'>
              <div className='price font-semibold'>1,176,761,269</div>
              <div className='percent-increment text-sm text-right'>+2.45%</div>
            </div>
          </div>
          <div className='info__item pb-5 mb-5 flex item-center justify-between'>
            <div className='label font-medium text-base font-jm'>
              <div>All Time Low</div>
              <div className='time text-xs'>Dec 31, 2022</div>
            </div>
            <div className='value font-medium text-base font-jm'>
              <div className='price font-semibold'>1,176,761,269</div>
              <div className='percent-increment text-sm text-right'>+2.45%</div>
            </div>
          </div>
          <div className='info__item pb-5 mb-5 flex item-center justify-between'>
            <div className='label font-medium text-base font-jm'>
              Market Dominance
            </div>
            <div className='value font-medium text-base font-jm'>0.2%</div>
          </div>
          <div className='info__item flex item-center justify-between'>
            <div className='label font-medium text-base font-jm'>
              <div>Trade Launch Date</div>
            </div>
            <div className='value font-medium text-base font-jm'>
              <div className='price font-semibold'>23/04/2025</div>
              <div className='time text-xs'>568 days ago</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
