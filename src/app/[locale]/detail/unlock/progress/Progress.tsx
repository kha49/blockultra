import React from 'react';

const Progress = () => {
  return (
    <div className='box-shadow-common p-4'>
      <div className='flex items-center justify-center gap-2 border-b border-grey-300 pb-4 mb-4'>
        <span className='text-grey-700 font-bold text-xl'>
          Total Unlock Progress
        </span>
        <span className='text-grey-500 font-bold text-xl'>169 days left</span>
      </div>
    </div>
  );
};

export default Progress;
