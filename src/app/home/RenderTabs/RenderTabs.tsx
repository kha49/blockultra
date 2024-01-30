'use client';

import React from 'react';
import HomeTabs from '../tabs';
import Coins from '../coin';
import Categories from '../categories';
import Gainers from '../gainers';
import Trending from '../trending';
import Fundraising from '../fundraising';
import UpComing from '../up-coming';
import { useSearchParams } from 'next/navigation';

const RenderTabs = () => {
  const searchParams = useSearchParams();
  const tab = searchParams.get('tab') ?? 'all_coin';

  const renderTableContent = () => {
    switch (tab) {
      case 'categories':
        return <Categories />;
      case 'gainers':
        return <Gainers />;
      case 'trending':
        return <Trending />;
      case 'fundraising':
        return <Fundraising />;
      case 'upcoming':
        return <UpComing />;
      case 'all_coin':
      default:
        return <Coins />;
    }
  };

  return (
    <div className='mx-auto max-w-2xl px-4'>
      <HomeTabs currentTab={tab} />
      <div className='md:border md:rounded-lg my-4'>{renderTableContent()}</div>
    </div>
  );
};

export default RenderTabs;
