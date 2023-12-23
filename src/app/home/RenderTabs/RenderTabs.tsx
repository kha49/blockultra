'use client';

import React, { useState } from 'react';
import HomeTabs from '../tabs';
import AllCoin from '../coin';
import Categories from '../categories';
import Gainers from '../gainers';
import Trending from '../trending';
import Fundraising from '../fundraising';

const RenderTabs = () => {
  const [currentTab, setCurrentTab] = useState<string>('all_coin');

  const handleChangeTab = (tab: string) => {
    setCurrentTab(tab);
  };

  const renderTableContent = () => {
    switch (currentTab) {
      case 'categories':
        return <Categories />;
      case 'gainers':
        return <Gainers />;
      case 'trending':
        return <Trending />;
      case 'fundraising':
        return <Fundraising />;
      case 'all_coin':
      default:
        return <AllCoin />;
    }
  };

  return (
    <div className='mx-auto max-w-2xl px-4 py-3'>
      <HomeTabs currentTab={currentTab} setCurrentTab={handleChangeTab} />
      <div className='p-6 border rounded-lg'>{renderTableContent()}</div>
    </div>
  );
};

export default RenderTabs;
