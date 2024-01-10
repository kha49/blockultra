'use client';
import { Button, Flex } from 'antd';
import React from 'react';
import './styles.scss';
import clsx from 'clsx';

import { IconFilterCoinTab } from '@/assets/icons/home/IconFilterCoinTab';
import SelectProject from '../select-project';
import { IeoIdoCategory, getCategoryTags } from '../../config';
import { useParams, useRouter } from 'next/navigation';
type ITag = {
  label: string;
  value: string;
};

export default function HeadFilter() {
  const { category = IeoIdoCategory.upcoming, locale } = useParams<{
    category: string;
    locale: string;
  }>();

  const router = useRouter();

  const tags = getCategoryTags();

  return (
    <Flex vertical gap={16} className='header-filter'>
      <Flex wrap='wrap' gap={16} className='header-filter__options'>
        {tags.map((tag) => (
          <Button
            disabled={tag.disabled}
            key={tag.value}
            className={clsx(category === tag.value && 'active')}
            onClick={() => router.push(`/${locale}/ieo-ido/${tag.value}`)}
          >
            {tag.label}
          </Button>
        ))}
      </Flex>

      <Flex gap={8} wrap='wrap'>
        <SelectProject />
        <Button size='large' className='ml-1'>
          <Flex className='text-[#333747]'>
            <IconFilterCoinTab />
            <span className='ml-1'>Filters</span>
          </Flex>
        </Button>
      </Flex>
    </Flex>
  );
}
