'use client';
import { Button } from 'antd';
import React from 'react';

import { IconFilterCoinTab } from '@/assets/icons/home/IconFilterCoinTab';
import { useParams, useRouter } from 'next/navigation';
import SearchSelect from './search-select';

export default function HeadFilter() {
  const router = useRouter();
  const params = useParams<{ locale: string; id: string }>();

  return (
    <div className='filter flex justify-between mb-4'>
      <div className='flex'>
        <SearchSelect />
        <div className='hidden xl:block md:block'>
          <Button className='ml-1 !h-full hover:!border-primary-500 hover:!text-primary-500 !font-jm'>
            <div className='flex'>
              <IconFilterCoinTab />
              <span className='ml-1'>Filters</span>
            </div>
          </Button>
        </div>
      </div>
      <div className='hidden xl:block md:block'>
        <Button className='ml-1 !h-full hover:!border-primary-500 hover:!text-primary-500 !font-jm'>
          <div className='flex'>
            <IconFilterCoinTab />
            <span className='ml-1'>Customize</span>
          </div>
        </Button>
      </div>
    </div>
  );
}
