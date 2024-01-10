'use client';

import './index.scss';
import { COLOR_CHART } from '@/helpers/constants';
import ReactECharts from 'echarts-for-react';

export default function Allocation() {
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
        data: [{ value: 25 }, { value: 20 }, { value: 10 }, { value: 45 }],
      },
    ],
  };
  return (
    <div className='allocations'>
      <div className="text-neutral-600 flex justify-center text-base font-bold font-['Plus Jakarta Sans'] leading-normal items-center">
        Token Allocation
      </div>
      <div className='flex'>
        <div className='allocations__table relative'>
          <ReactECharts option={optionPie} />
          <div className='absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 flex flex-col justify-center items-center'>
            <div className="text-zinc-700 text-xl font-bold font-['Plus Jakarta Sans'] leading-7">
              Bitcoin
            </div>
            <div className="text-gray-400 text-base font-semibold font-['Plus Jakarta Sans'] leading-normal">
              11.90%
            </div>
          </div>
        </div>
        <div className='allocations__indexs flex items-center ml-4'>
          <div>
            <div className='index'>
              <svg
                width='18'
                height='20'
                viewBox='0 0 18 20'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M8 0.57735C8.6188 0.220085 9.3812 0.220085 10 0.57735L16.6603 4.42265C17.2791 4.77992 17.6603 5.44017 17.6603 6.1547V13.8453C17.6603 14.5598 17.2791 15.2201 16.6603 15.5774L10 19.4226C9.3812 19.7799 8.6188 19.7799 8 19.4226L1.33975 15.5774C0.720943 15.2201 0.339746 14.5598 0.339746 13.8453V6.1547C0.339746 5.44017 0.720943 4.77992 1.33975 4.42265L8 0.57735Z'
                  fill='#B5E612'
                />
              </svg>
              <div className="index__name text-zinc-700 text-sm font-medium font-['Plus Jakarta Sans'] leading-tight">
                Stablecoins: 60.02%
              </div>
            </div>
            <div className='index'>
              <svg
                width='18'
                height='20'
                viewBox='0 0 18 20'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M8 0.57735C8.6188 0.220085 9.3812 0.220085 10 0.57735L16.6603 4.42265C17.2791 4.77992 17.6603 5.44017 17.6603 6.1547V13.8453C17.6603 14.5598 17.2791 15.2201 16.6603 15.5774L10 19.4226C9.3812 19.7799 8.6188 19.7799 8 19.4226L1.33975 15.5774C0.720943 15.2201 0.339746 14.5598 0.339746 13.8453V6.1547C0.339746 5.44017 0.720943 4.77992 1.33975 4.42265L8 0.57735Z'
                  fill='#00D06C'
                />
              </svg>
              <div className="index__name text-zinc-700 text-sm font-medium font-['Plus Jakarta Sans'] leading-tight">
                Bitcoin: 11.90%
              </div>
            </div>
            <div className='index'>
              <svg
                width='18'
                height='20'
                viewBox='0 0 18 20'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M8 0.57735C8.6188 0.220085 9.3812 0.220085 10 0.57735L16.6603 4.42265C17.2791 4.77992 17.6603 5.44017 17.6603 6.1547V13.8453C17.6603 14.5598 17.2791 15.2201 16.6603 15.5774L10 19.4226C9.3812 19.7799 8.6188 19.7799 8 19.4226L1.33975 15.5774C0.720943 15.2201 0.339746 14.5598 0.339746 13.8453V6.1547C0.339746 5.44017 0.720943 4.77992 1.33975 4.42265L8 0.57735Z'
                  fill='#0A9882'
                />
              </svg>
              <div className="index__name text-zinc-700 text-sm font-medium font-['Plus Jakarta Sans'] leading-tight">
                Fiat: 10.20%
              </div>
            </div>
            <div className='index'>
              <svg
                width='18'
                height='20'
                viewBox='0 0 18 20'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M8 0.57735C8.6188 0.220085 9.3812 0.220085 10 0.57735L16.6603 4.42265C17.2791 4.77992 17.6603 5.44017 17.6603 6.1547V13.8453C17.6603 14.5598 17.2791 15.2201 16.6603 15.5774L10 19.4226C9.3812 19.7799 8.6188 19.7799 8 19.4226L1.33975 15.5774C0.720943 15.2201 0.339746 14.5598 0.339746 13.8453V6.1547C0.339746 5.44017 0.720943 4.77992 1.33975 4.42265L8 0.57735Z'
                  fill='#05B4C9'
                />
              </svg>
              <div className="index__name text-zinc-700 text-sm font-medium font-['Plus Jakarta Sans'] leading-tight">
                Others: 17.70%
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
