import BreadcrumbContext from '@/context/Breadcrumb/BreadcrumbContext';
import { Tabs } from 'antd';
import { useLocale } from 'next-intl';
import dynamic from 'next/dynamic';
import { useRouter, useSearchParams } from 'next/navigation';
import { memo, useContext, useEffect, useState } from 'react';
import { Overview } from '../overview';
import { Socials } from '../socials';
import './index.scss';

const IEOIDODetail = dynamic(() => import('../ieoido'), { ssr: false });
const Unlock = dynamic(() => import('../unlock'), { ssr: false });
const Markets = dynamic(() => import('../markets'), { ssr: false });
const Tokenomics = dynamic(() => import('../tokenomics'), { ssr: false });
const Profile = dynamic(() => import('../profile/Profile'), { ssr: false });
const Fundraising = dynamic(() => import('../fundraising/Fundraising'), {
  ssr: false,
});

const CoinTabInfo = (props: any) => {
  const searchParams = useSearchParams();
  const tab = searchParams.get('tab');
  const router = useRouter();
  const locale = useLocale();

  const [activeKey, setActiveKey] = useState('1');

  const { breadcrumbs, handleBreadcrumb } = useContext(BreadcrumbContext);

  const handleActiveKey = (key: string) => {
    const label = tabs.find((t) => t.id === key)?.label;
    let url = `/${locale}/detail/${props.slug}`;
    if (key !== '1') url += `?tab=${label?.toLowerCase()}`;
    router.push(url);
  };

  const data = props?.data;
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
      component: <Markets slug={props.slug} />,
    },
    {
      id: '3',
      disable: false,
      label: 'Profile',
      component: <Profile />,
    },
    {
      id: '4',
      disable: data?.fundraisings ? false : true,
      label: 'Fundraising',
      component: <Fundraising data={props.data} slug={props.slug} />,
    },
    {
      id: '5',
      disable: data?.ieoido ? false : true,
      label: 'IDO/IEO',
      component: <IEOIDODetail data={props.data} slug={props.slug} />,
    },
    {
      id: '6',
      disable: data?.tokenomics ? false : true,
      label: 'Tokenomics',
      component: <Tokenomics tokenInfo={props.data} slug={props.slug} />,
    },
    {
      id: '7',
      disable: data?.unlocks ? false : true,
      label: 'Unlock',
      component: <Unlock tokenInfo={props.data} slug={props.slug} />,
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

  useEffect(() => {
    const urlTab = tab?.toLowerCase();
    const findKey = tab
      ? tabs.find((t) => t.label.toLowerCase() === urlTab)?.id
      : '1';
    if (breadcrumbs.length >= 3 && activeKey !== findKey) {
      let newBreadcrumbs = breadcrumbs.slice(2, 3);
      if (tab) {
        setActiveKey(
          tabs.find((t) => t.label.toLowerCase() === urlTab)?.id || '1'
        );
        newBreadcrumbs = [
          ...newBreadcrumbs.map((val) => ({
            ...val,
            url: window.location.origin + window.location.pathname,
          })),
          {
            title:
              tabs.find((t) => t.label.toLowerCase() === urlTab)?.label || '',
          },
        ];
      } else setActiveKey('1');

      handleBreadcrumb(newBreadcrumbs, {
        holdData: 2,
      });
    }
  }, [tab, breadcrumbs, activeKey]);

  return (
    <div className='detail-tab'>
      <div>
        <Tabs
          tabPosition={'top'}
          activeKey={activeKey}
          onChange={handleActiveKey}
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

export default memo(CoinTabInfo);
