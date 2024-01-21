import DetailTabs from './components/tabs';
import CoinInformation from './components/coinInfo';
import { Flex } from 'antd';
import CoinTableInfo from './components/coinTable';
import { Page } from '@/components/page';

export default function Detail({params} : any) {
  const breadcrumbs = [
    {
      title: 'BlockUltra',
    },
    {
      title: 'Exchanges',
    },
    {
      title: 'Spot',
    },
    {
      title: `${params.slug}`,
    },
  ];
  return (
    <Page  breadcrumbs={breadcrumbs}>
      <Flex vertical gap={16}>
        <CoinInformation />
        <Flex className='shadow rounded-lg p-6' vertical gap={16}>
          <DetailTabs />
          <CoinTableInfo />
        </Flex>
      </Flex>
    </Page>
  );
}
