'use client';
import './index.scss';
import { Page } from '@/components/page';
import dynamic from 'next/dynamic';

const UnlockTimeTop = dynamic(() => import('./components/unlock-time-top'), {
  ssr: false,
});
const UsTable = dynamic(() => import('./components/us-table'), { ssr: false });

const breadcrumbConfig = [
  {
    title: <a href='/'>BlockUltra</a>,
  },
  {
    title: <a href='#'>Unlock</a>,
  },
];

export default function UnlockSchedule() {
  return (
    <Page breadcrumbs={breadcrumbConfig} classnames='unlock-schedule'>
      <UnlockTimeTop />
      <UsTable />
    </Page>
  );
}
