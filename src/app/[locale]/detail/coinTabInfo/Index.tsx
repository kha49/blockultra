import React from 'react';
import Profile from '../profile/Profile';
import { Socials } from '../socials';
import { Overview } from '../overview';
import Tokenomics from '../tokenomics';
import { Tabs } from 'antd';
import { Fundraising } from '../fundraising';
import './index.scss';
import Markets from '../markets';
import Unlock from '../unlock';
import IEOIDODetail from '../ieoido';

const CoinTabInfo = (props: any) => {
  const tabs = [
    {
      id: '1',
      disable: false,
      label: 'Overview',
      component: <Overview data={props.data} />,
    },
    {
      id: '2',
      disable: false,
      label: 'Markets',
      component: <Markets data={props.data} slug={props.slug} />,
    },
    {
      id: '3',
      disable: false,
      label: 'Profile',
      component: <Profile />,
    },
    {
      id: '4',
      disable: false,
      label: 'Fundraising',
      component: <Fundraising />,
    },
    {
      id: '5',
      disable: false,
      label: 'IDO/IEO',
      component: <IEOIDODetail />,
    },
    {
      id: '6',
      disable: false,
      label: 'Tokenomics',
      component: <Tokenomics tokenInfo={props.data} />,
    },
    {
      id: '7',
      disable: false,
      label: 'Unlock',
      component: <Unlock />,
    },
    {
      id: '8',
      disable: true,
      label: 'On-Chain',
      component: '',
    },
    {
      id: '9',
      disable: false,
      label: 'Socials',
      component: <Socials />,
    },
    {
      id: '10',
      disable: true,
      label: 'Reviews',
      component: '',
    },
  ];
  return (
    <div className='detail-tab'>
      <div>
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

export default CoinTabInfo;
