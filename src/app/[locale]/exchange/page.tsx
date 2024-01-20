import ExchangeRenderTabs from './ExchangeRenderTabs';
import { Page } from '@/components/page';

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
      <ExchangeRenderTabs />
    </Page>
  );
}
