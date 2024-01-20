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
      <div className='detail px-8 py-2'>
        <CoinInformation />
      </div>

      <div className='coinInfo-tab px-8 pt-2 pb-17'>
        <div className='flex mx-auto p-6 bg-white rounded-lg shadow'>
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
