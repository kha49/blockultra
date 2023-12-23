import CoinTabInfo from './coinTabInfo/Index';
import './index.scss';
import CoinInformation from './information';

export default function Detail() {
  return (
    <div className='detail flex flex-col gap-4'>
      <CoinInformation />
      <CoinTabInfo />
    </div>
  );
}
