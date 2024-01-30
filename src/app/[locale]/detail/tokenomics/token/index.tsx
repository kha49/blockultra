'use client';

import SwitchAllocation from '@/components/SwitchAllocation/SwitchAllocation';
import './index.scss';
import { COLOR_CHART } from '@/helpers/constants';
import ReactECharts from 'echarts-for-react';
import { useEffect, useState } from 'react';
import { nFormatter } from '@/helpers';
import moment from 'moment';

// interface IAllocation {
//   id?: number;
//   title?: string;
//   isActive?: boolean;
//   activeColor?: string;
// }

export default function TokenAllocation(props: any) {
  const [allocations, setAllocations] = useState<ITokenomics[]>([]);
  const [cirChart, setCirChart] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [time, setTime] = useState([])
  
  useEffect(() => {
    let cirChartTemp: any = [];
    let timeTemp: any = [];
    let scheduleTemp = props.data?.chart || [];
    const propAllocation = props.data?.datas?.allocations || [];
    if (propAllocation.length > 0) {
      propAllocation.map((item: any, i: number) => {
        cirChartTemp.push({ value: item.tokens_percent });
        item.activeColor = Object.values(COLOR_CHART)[i];
        item.isActive = true;
      })
    }
    if (scheduleTemp.length > 0) {
      scheduleTemp.map((item: any) => {
        item.data = item.tokens
      })
      timeTemp = scheduleTemp[0]?.times && scheduleTemp[0]?.times.length > 0 ? scheduleTemp[0]?.times.map((item: any) => {
        return item = moment(item).format('DD/MM/YYYY')
      }) : []
    }
    setAllocations(propAllocation);
    setSchedule(scheduleTemp);
    setCirChart(cirChartTemp);
    setTime(timeTemp);
  },[])

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
          borderRadius: 5,
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
        data: cirChart,
      },
    ],
  };

  const optionStackArea = {
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
    title: {
      text: '',
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985',
        },
      },
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: time,
      },
    ],
    yAxis: [
      {
        type: 'value',
      },
    ],
    series: schedule,
  };

  const handler = (e: { id: string; isActive: boolean }) => {
    console.log('e', e);
  };

  return (
    <div className='token grid grid-cols-1 lg:grid-cols-2 gap-4'>
      <div className='allocation'>
        <div className='text-grey-700 text-sm font-bold font-jb mb-5'>
          Token Allocation
        </div>
        <div className='flex flex-col lg:flex-row items-center'>
          <div className='relative'>
            <ReactECharts option={optionPie} />
            <div className='absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 flex flex-col justify-center items-center'>
              <div className='text-grey-700 text-xl font-jm font-medium'>
                StableCoins
              </div>
              <div className='text-grey-500 text-sm font-jm font-medium'>
                60%
              </div>
            </div>
          </div>
          <div className='note'>
            {allocations && allocations.length > 0
              ? allocations.map((item, index) => {
                  return (
                    <div
                      className='flex items-center justify-between gap-4 mb-6'
                      key={index}
                    >
                      <SwitchAllocation
                        id={item.id}
                        isActive={item.isActive}
                        title={item.name}
                        activeColor={item.activeColor}
                        onChange={(e: any) => handler(e)}
                      />
                      <div className='flex items-center justify-between gap-4'>
                        <div className='text-grey-700 text-medium text-xs'>
                          {nFormatter(item.tokens, 2, props.tokenInfo.symbol)}
                        </div>
                        <div className='text-grey-500 text-medium text-xs'>
                          {nFormatter(item.tokens_percent, 2, '%')}
                        </div>
                      </div>
                    </div>
                  );
                })
              : 'Không có dữ liệu'}
          </div>
        </div>
      </div>
      <div className='vesting-schedule'>
        <div className='flex items-center justify-between'>
          <div className='text-grey-700 text-sm font-bold font-jb'>
            Release Schedule
          </div>
          <div className='text-grey-700 text-sm font-bold font-jb'>
            Today, 21 Apr 2023
          </div>
        </div>
        {
          schedule && schedule.length > 0 ? (
            <ReactECharts option={optionStackArea} />
          ) : ''
        }
      </div>
    </div>
  );
}
