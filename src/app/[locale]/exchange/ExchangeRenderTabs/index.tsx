'use client';

import React, { use, useState } from 'react';
import './index.scss';
import Spot from '../spot';
import { Tabs, Button } from 'antd';

const ExchangeRenderTabs = () => {
  const tabs = [
    {
      id: '1',
      disable: false,
      label: 'Spot',
      component: <Spot />,
    },
    {
      id: '2',
      disable: true,
      label: 'Derivatives',
      component: '',
    },
    {
      id: '3',
      disable: true,
      label: 'Dex',
      component: '',
    },
    {
      id: '4',
      disable: true,
      label: 'Lending',
      component: '',
    },
    {
      id: '5',
      disable: true,
      label: 'CEX Transparency',
      component: '',
    },
  ];

  return (
    <div className='exchange-tab flex py-4 rounded-lg'>
      <div className='flex px-6 mx-auto'>
        <Tabs
          defaultActiveKey='1'
          tabPosition={'top'}
          items={tabs?.map((tab) => {
            return {
              label: tab.label,
              key: tab.id,
              disabled: tab.disable,
              children: tab.component,
            };
          })}
        />
      </div>
    </div>
  );
};

export default ExchangeRenderTabs;
