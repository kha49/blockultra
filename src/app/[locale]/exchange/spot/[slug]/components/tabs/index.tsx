'use client';

import React, { use, useState } from 'react';
import CoinTableInfo from '../coinTable';
import { Flex, Button } from 'antd';
import './index.scss';
import clsx from 'clsx';

const DetailTabs = () => {
  const tags = [
    {
      value: 'spot',
      disabled: false,
      label: 'Spot',
      component: <CoinTableInfo />,
    },
    {
      value: 'future',
      disabled: true,
      label: 'Future',
      component: '',
    },
    {
      value: 'transparency',
      disabled: true,
      label: 'Transparency',
      component: '',
    },
  ];

  return (
    <Flex wrap='wrap' gap={16} className='header-filter__options'>
      {tags.map((tag) => (
        <Button
          key={tag.value}
          disabled={tag.disabled}
          className={clsx(/*params.category*/'spot' === tag.value && 'active')}
          // onClick={() =>
          //   router.push(`/${params.locale}/exchanges/`)
          // }
        >
          {tag.label}
        </Button>
      ))}
    </Flex>
  );
};

export default DetailTabs;
