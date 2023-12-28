import CoinTabInfo from '../coinTabInfo/Index';
import CoinInformation from '../information';
import './index.scss';

export default function Detail() {
  return (
    <div className='detail flex flex-col gap-4'>
      <CoinInformation />
      <CoinTabInfo />
    </div>
  );
}
