import ExchangeRenderTabs from './ExchangeRenderTabs';
import CoinInfoRenderTabs from './coinInfoTabs';

export default function Exchange() {
  return (
    <div className='exchange mx-auto max-w-2xl px-4 py-3'>
      <div className='flex my-6'>
        <CoinInfoRenderTabs />
      </div>
      {/* <div className='flex'><ExchangeRenderTabs /></div> */}
    </div>
  );
}
