import IconCircle from '@/assets/icons/IconCircle';
import CountdownTimer from '@/components/CountdownTimer/CountDownTimer';
import React from 'react';

const Progress = () => {
  const countDownTime = new Date('2024-12-31T23:59:59');
  const unlock = '50%';
  const nextlock = '60%';
  return (
    <div className='box-shadow-common p-4'>
      <div className='flex items-center justify-center gap-2 border-b border-grey-300 pb-4 mb-4'>
        <span className='text-grey-700 font-bold text-xl'>
          Total Unlock Progress
        </span>
        <span className='text-grey-500 font-bold text-xl'>169 days left</span>
      </div>
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className='w-full xl:max-w-[750px]'>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <IconCircle color='#5766FF' />
              <span className="text-grey-700 text-xs md:text-base font-bold font-jb">Unlocked</span>
              <span className="text-grey-700 text-xs md:text-base font-bold font-jb">2.50%</span>
            </div>
            <div className="flex items-center gap-3">
              <IconCircle color='#E5E6EB' />
              <span className="text-grey-700 text-xs md:text-base font-bold font-jb">Locked Unlock</span>
              <span className="text-grey-700 text-xs md:text-base font-bold font-jb">2.50%</span>
            </div>
          </div>
          <div className="py-2 relative">
            <div className="unlock absolute top-1/2 left-0 -translate-y-1/2 bg-primary-500 h-1.5 rounded-xl z-20" style={{ width: unlock }}></div>
            <div className="next-lock absolute top-1/2 left-0 -translate-y-1/2 bg-orange-500 h-1.5 rounded-xl z-10" style={{ width: nextlock }}></div>
            <div className="locked bg-grey-300 w-full h-1.5 rounded-xl"></div>
          </div>
          <div className="flex items-center justify-between flex-wrap">
            <span className="text-grey-500 text-sm font-medium font-jb">NBIT 8.07B ~ $1.45B</span>
            <span className="text-grey-500 text-sm font-medium font-jb">NBIT 4.83B ~ $686.23M</span>
          </div>
        </div>
        
        <div className="md:flex items-center justify-between gap-9 mx-auto xl:mx-0">
          <div className='w-full mb-4'>
            <div className="flex items-center justify-center gap-3">
              <IconCircle />
              <span className="text-grey-700 text-xs md:text-base font-bold font-jb">Next Unlock</span>
              <span className="text-grey-700 text-xs md:text-base font-bold font-jb">2.50%</span>
            </div>
            <div className="text-grey-500 text-sm">NBIT 618.22M ~ $87.83M (0.55% of M.Cap)</div>
          </div>
          <CountdownTimer
            targetDate={countDownTime}
          />
        </div>
      </div>
    </div>
  );
};

export default Progress;
