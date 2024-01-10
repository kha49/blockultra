'use client';
import { Button, Flex } from 'antd';
import React from 'react';
import './styles.scss';
import clsx from 'clsx';

import { IconFilterCoinTab } from '@/assets/icons/home/IconFilterCoinTab';
import SelectProject from '../select-project';
type ITag = {
  label: string;
  value: string;
};

const tags: ITag[] = [
  {
    label: 'Upcoming',
    value: 'upcoming',
  },
  {
    label: 'Ongoing',
    value: 'ongoing',
  },
  {
    label: 'Ended',
    value: 'ended',
  },
  {
    label: 'Top IEO Launchpads',
    value: 'top-ieo-launchpads',
  },
  {
    label: 'Top IDO Launchpads',
    value: 'top-ido-launchpads',
  },
  {
    label: 'Overview',
    value: 'overview',
  },
];

export default function HeadFilter() {
  const [selectedTag, setSelectedTag] = React.useState(tags[0]);

  return (
    <Flex vertical gap={16} className='header-filter'>
      <Flex wrap='wrap' gap={16} className='header-filter__options'>
        {tags.map((tag) => (
          <Button
            key={tag.value}
            className={clsx(selectedTag.value === tag.value && 'active')}
            onClick={() => setSelectedTag(tag)}
          >
            {tag.label}
          </Button>
        ))}
      </Flex>

      <Flex gap={8}>
        <SelectProject />
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
