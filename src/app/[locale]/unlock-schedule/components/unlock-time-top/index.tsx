import { UnlockTime } from '../unlock-time';
import { TUnlockTime } from '../../types';
import { useTranslations } from 'next-intl';

type TProps = {
  data: Array<TUnlockTime>;
};

export const UnlockTimeTop = ({ data }: TProps) => {
  const t = useTranslations('UnlockSchedule');
  return (
    <div className={'us-time py-3'}>
      {data.map((item, index) => (
        <UnlockTime
          key={index}
          title={t(item.title)}
          money={item.money}
          coins={item.coins}
        />
      ))}
    </div>
  );
};
