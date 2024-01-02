import './index.scss';
import { Page } from '@/components/page';
import { IeoIdoTable } from './components/ieo-ido-table';

const breadcrumbConfig = [
  {
    title: 'Home',
  },
  {
    title: <a href='#'>IDO/IEO</a>,
  },
];

export default function IeoIdoPage() {
  return (
    <Page breadcrumbs={breadcrumbConfig}>
      <IeoIdoTable />
    </Page>
  );
}
