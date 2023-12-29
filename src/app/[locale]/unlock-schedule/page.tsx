import { Breadcrumb } from 'antd';
import './index.scss';
import { UnlockTimeTop } from './components/unlock-time-top';
import { UsTable } from './components/us-table';
import { useUnlockTime } from './logic/useUnlockTime';

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
    <div className='unlock-schedule mx-auto max-w-2xl px-4 py-3'>
      <Breadcrumb items={breadcrumbConfig} />
      <div className={'us-container'}>
        <UnlockTimeTop data={unlockTimeData} />
        <UsTable />
      </div>
    </div>
  );
}
