import { Page } from '@/components/page';
import { Flex } from 'antd';
import { useLocale } from 'next-intl';
import dynamic from 'next/dynamic';

const ExchangeTabs = dynamic(() => import('./tabs'), { ssr: false });
const ExchangeTable = dynamic(() => import('./table'), { ssr: false });

export default function Exchange() {
  const locale = useLocale()
  const breadcrumbs = [
    {
      title: <a href="/">BlockUltra</a>,
    },
    {
      title: 'Exchanges',
    },
    {
      title: <a href={`/${locale}/exchange/spot`}>Spot</a>
    }
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
