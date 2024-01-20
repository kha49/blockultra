import IconCircle from '@/assets/icons/IconCircle';
import CountdownTimer from '@/components/CountdownTimer/CountDownTimer';
import { currencyFormat, nFormatter, percentFormat } from '@/helpers';
import moment from 'moment';
import React from 'react';

const Progress = (props: any) => {
  const data = props.data;
  if (!data) return;
  const date = new Date(data.totalRemainingTime || Date.now);
  const unlockPercent: number = data.totalUnlockedPercent || 0;
  const lockedPercent: number = data.totalLockedPercent || 0;
  const nextUnlockPercent: number = data.totalNextUnlockPercent;
  const nextUnlockToken =
    (data.unlockedTokens || 0 * nextUnlockPercent || 0) / unlockPercent || 1;

  const processNextUnlockPercent =
    parseFloat(unlockPercent + '') + parseFloat(nextUnlockPercent + '');

  return (
    <div className='box-shadow-common p-4 mb-6'>
      <div className='flex items-center justify-center gap-2 border-b border-grey-300 pb-4 mb-4'>
        <span className='text-grey-700 font-bold text-xl'>
          Total Unlock Progress
        </span>
        <span className='text-grey-500 font-bold text-xl'>
          {moment(date).fromNow()}
        </span>
      </div>
      <div className='flex items-center justify-between flex-wrap gap-4'>
        <div className='w-full xl:max-w-[750px]'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-3'>
              <IconCircle color='#5766FF' />
              <span className='text-grey-700 text-xs md:text-base font-bold font-jb'>
                Unlocked
              </span>
              <span className='text-grey-700 text-xs md:text-base font-bold font-jb'>
                {unlockPercent}%
              </span>
            </div>
            <div className='flex items-center gap-3'>
              <IconCircle color='#E5E6EB' />
              <span className='text-grey-700 text-xs md:text-base font-bold font-jb'>
                Locked Unlock
              </span>
              <span className='text-grey-700 text-xs md:text-base font-bold font-jb'>
                {lockedPercent}%
              </span>
            </div>
          </div>
          <div className='py-2 relative'>
            <div
              className='unlock absolute top-1/2 left-0 -translate-y-1/2 bg-primary-500 h-1.5 rounded-xl z-20'
              style={{ width: unlockPercent + '%' }}
            ></div>
            <div
              className='next-lock absolute top-1/2 left-0 -translate-y-1/2 bg-orange-500 h-1.5 rounded-xl z-10'
              style={{ width: processNextUnlockPercent + '%' }}
            ></div>
            <div className='locked bg-grey-300 w-full h-1.5 rounded-xl'></div>
          </div>
          <div className='flex items-center justify-between flex-wrap'>
            <span className='text-grey-500 text-sm font-medium font-jb'>
              {nFormatter(data.totalUnlockedToken, 2, '')} ~
              {nFormatter(data.unlockedTokens, 2, '$')}
            </span>
            <span className='text-grey-500 text-sm font-medium font-jb'>
              {nFormatter(data.lockedTokens, 2, '')}~
              {nFormatter(data.totalLockedToken, 2, '$')}
            </span>
          </div>
        </div>

        <div className='md:flex items-center justify-between gap-9 mx-auto xl:mx-0'>
          <div className='w-full mb-4'>
            <div className='flex items-center justify-center gap-3'>
              <IconCircle />
              <span className='text-grey-700 text-xs md:text-base font-bold font-jb'>
                Next Unlock
              </span>
              <span className='text-grey-700 text-xs md:text-base font-bold font-jb'>
                {percentFormat(data.totalNextUnlockPercent)}
              </span>
            </div>
            <div className='text-grey-500 text-sm'>
              {nFormatter(nextUnlockToken, 2, '')}~
              {nFormatter(nextUnlockToken * data.price, 2, '$')} (
              {nFormatter(
                (nextUnlockToken * 100) / (data.marketCap / data.price),
                2,
                ''
              )}
              % of M.Cap)
            </div>
          </div>
          <CountdownTimer targetDate={date} />
        </div>
      </div>
    </div>
  );
};

export default Progress;
