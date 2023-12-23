import './index.scss';
import MarqueeItem from './MarqueeItem/MarqueeItem';
import { dataStatistical } from '@/helpers/const_variables';

const Marquee = () => {
  const half = Math.ceil(dataStatistical.length / 2);
  const firstHalf = dataStatistical.slice(0, half);
  const secondHalf = dataStatistical.slice(half);

  return (
    <div className='marquee'>
      <div className='flex items-center'>
        <div className='marquee__wrapper flex items-center gap-6'>
          {firstHalf?.map((item, index) => {
            return (
              <div key={item.id} className='flex items-center gap-6'>
                <MarqueeItem data={item} />
                {index !== dataStatistical.length - 1 && (
                  <div className='bg-grey-400 w-[1px] h-5'></div>
                )}
              </div>
            );
          })}
        </div>
        <div className='marquee__wrapper marquee-2 flex items-center gap-6'>
          {secondHalf?.map((item, index) => {
            return (
              <div key={item.id} className='flex items-center gap-6'>
                <MarqueeItem data={item} />
                {index !== dataStatistical.length - 1 && (
                  <div className='bg-grey-400 w-[1px] h-5'></div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Marquee;
