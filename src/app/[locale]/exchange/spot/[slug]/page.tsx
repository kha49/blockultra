import { Flex } from 'antd';
import { Page } from '@/components/page';
import dynamic from 'next/dynamic';

const DetailTabs = dynamic(() => import('./components/exchange-detail-table/tabs'), { ssr: false });
const CoinInformation = dynamic(() => import('./components/exchange-detail-overview'), { ssr: false });
const CoinTableInfo = dynamic(() => import('./components/exchange-detail-table'), { ssr: false });

type PageProps = {
  params: {
    locale: 'vi' | 'en';
    slug: string;
  };
};

export default function Detail({ params }: PageProps) {
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
      <Flex vertical>
        <CoinInformation />
        <Flex className='box-shadow-common rounded-lg p-6' vertical gap={16}>
          <DetailTabs />
          <CoinTableInfo />
        </Flex>
      </Flex>
    </Page>
  );
}
