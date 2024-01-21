'use client';

import ExchangeTabs from './tabs';
import ExchangeTable from './table';
import { Page } from '@/components/page';
import { Flex } from 'antd';

export default function Exchange() {
  const breadcrumbs = [
    {
      title: 'Home',
    },
    {
      title: 'Exchanges',
    },
  ];

  return (
    <Page breadcrumbs={breadcrumbs}>
      <Flex className='rounded-lg shadow p-6' vertical gap={16}>
        <ExchangeTabs />
        <ExchangeTable />
      </Flex>
    </Page>
  );
}
