'use client';
import { Button, Flex } from 'antd';
import React from 'react';
import './styles.scss';
import clsx from 'clsx';

import { IconFilterCoinTab } from '@/assets/icons/home/IconFilterCoinTab';
import SearchSelect from '../search-select';
import { FundraisingCategory, FundraisingCategoryLabel } from '../../config';
import { useParams, useRouter } from 'next/navigation';
type ITag = {
  label: string;
  value: string;
};

const tags: ITag[] = Object.values(FundraisingCategory).map((key) => ({
  label: FundraisingCategoryLabel[key],
  value: key,
}));

type HeadFilterProps = {};

export default function HeadFilter() {
  const router = useRouter();
  const params = useParams<{ locale: string; category: string }>();

  return (
    <Flex vertical gap={16} className='header-filter'>
      <Flex wrap='wrap' gap={16} className='header-filter__options'>
        {tags.map((tag) => (
          <Button
            key={tag.value}
            className={clsx(params.category === tag.value && 'active')}
            onClick={() =>
              router.push(`/${params.locale}/fundraising/${tag.value}`)
            }
          >
            {tag.label}
          </Button>
        ))}
      </Flex>

      <Flex gap={8}>
        <SearchSelect />
        <Button className='ml-1 h-10'>
          <Flex className='text-[#333747]'>
            <IconFilterCoinTab />
            <span className='ml-1'>Filters</span>
          </Flex>
        </Button>
      </Flex>
    </Flex>
  );
}
