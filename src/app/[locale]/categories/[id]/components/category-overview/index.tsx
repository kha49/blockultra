import Doughnut from '@/components/DoughnutChart';
import { Select } from 'antd';
import React, { useState, useEffect } from 'react';
import GraphLine from '../graph-line';
import { faker } from '@faker-js/faker';
import { nFormatter } from '@/helpers';

const filterData = [
  {
    label: '24h',
    value: '24h',
  },
  {
    label: '7d',
    value: '7d',
  },
  {
    label: '30d',
    value: '30d',
  },
  {
    label: '1y',
    value: '1y',
  },
];
export default function CategoryOverview(props: any) {
  const [categoryOverview, setCategoryOverview] = useState({});

  useEffect(() => {
    setCategoryOverview(props.category);
  }, [props.category]);

  console.log(categoryOverview);
  return (
    <div className='category-overview'>
      <div className='w-full flex items-center flex-wrap justify-between'>
        <h1 className='text-gray-700 text-2xl font-bold'>Currency</h1>
        <Select placeholder='Filter' options={filterData} size='large' />
      </div>

      <div className='flex flex-wrap w-full items-stretch'>
        <div className='flex-1'>
          <div className='text-base font-medium text-[#4F4F4F]'>
            Gainers / Losers Number
          </div>
          <div className='py-8 gap-6 flex flex-1 items-center justify-center'>
            <Doughnut
              radius={65}
              data={[60, 40]}
              colors={['#1AB369', '#FA3363']}
              hole={45}
            />
            <div className='flex flex-col gap-2'>
              <div className='flex gap-1 items-center'>
                <span className='w-3 h-3 rounded-full bg-[#1AB369]'></span>
                <span>Gainers</span>
                <span className='text-[#1AB369]'>({60}%)</span>
              </div>
              <div className='flex gap-1 items-center'>
                <span className='w-3 h-3 rounded-full bg-[#FA3363]'></span>
                <span>Losers</span>
                <span className='text-[#FA3363]'>({40}%)</span>
              </div>
            </div>
          </div>
        </div>

        <div className='w-[1px] mx-8 h-auto bg-[#E5E6EB] hidden md:block' />

        <div className='flex-1'>
          <div>
            <div className='text-base font-medium text-[#4F4F4F]'>
              Watchlist Marketcap
            </div>
            <div className='flex gap-1 items-center'>
              <span>{nFormatter(1000000, 2, '$')}</span>
              <span className='text-green-500'>+5.63%</span>
            </div>
          </div>
          <div className='py-8 gap-6 flex flex-1 items-center justify-center'>
            <GraphLine
              data={[...Array(30)].map(() =>
                faker.number.int({ min: 0, max: 60 })
              )}
              color='#1AB369'
              height={86}
              width={400}
            />
          </div>
        </div>

        <div className='w-[1px] mx-8 h-auto bg-[#E5E6EB] hidden md:block' />

        <div className='flex-1'>
          <div>
            <div className='text-base font-medium text-[#4F4F4F]'>
              Watchlist Volume
            </div>
            <div className='flex gap-1 items-center'>
              <span>$12.16</span>
              <span className='text-red-500'>{'-5.63%'}</span>
            </div>
          </div>
          <div className='py-8 gap-6 flex flex-1 items-center justify-center'>
            <GraphLine
              data={[...Array(30)].map(() =>
                faker.number.int({ min: 0, max: 60 })
              )}
              color='#FA3363'
              height={86}
              width={400}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
