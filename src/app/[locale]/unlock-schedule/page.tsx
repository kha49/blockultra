import './index.scss';
import { UnlockTimeTop } from './components/unlock-time-top';
import { UsTable } from './components/us-table';
import { useUnlockTime } from './logic/useUnlockTime';
import { Page } from '@/components/page';

const breadcrumbConfig = [
  {
    title: 'Trustbyt',
  },
  {
    title: <a href='#'>Unlock</a>,
  },
];

export default function UnlockSchedule() {
  const { unlockTimeData } = useUnlockTime();
  return (
    <Page breadcrumbs={breadcrumbConfig} classnames='unlock-schedule'>
      <UnlockTimeTop data={unlockTimeData} />
      <UsTable />
    </Page>
  );
}
