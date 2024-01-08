'use client';

import React, { use, useState } from 'react';
import CoinTableInfo from '../coinTableInfo';
import { Tabs } from 'antd';
import './index.scss';
import CoinInformation from '../coinInfo';

const CoinInfoRenderTabs = () => {
  const tabs = [
    {
      id: '1',
      disable: false,
      label: 'Spot',
      component: <CoinTableInfo />,
    },
    {
      id: '2',
      disable: true,
      label: 'Future',
      component: '',
    },
    {
      id: '3',
      disable: true,
      label: 'Transparency',
      component: '',
    },
  ];

  return (
    <div>
      <CoinInformation />
      <div className='coinInfo-tab py-4 mt-2 rounded-lg'>
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
    </div>
  );
};

export default CoinInfoRenderTabs;
