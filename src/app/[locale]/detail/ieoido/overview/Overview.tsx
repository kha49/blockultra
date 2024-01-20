import React from 'react';

const Overview = () => {
  return (
    <div className='mb-6'>
      <div className='text-grey-700 text-xl font-bold font-jb mb-2'>
        Overview
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <div className='box-shadow-common'>
          <div className='p-6 text-center border-b border-grey-300'>
            <div className='text-grey-700 text-base font-bold font-jb'>
              Summary
            </div>
          </div>
          <div className='p-6'>
            <div className='flex items-center justify-between gap-4 flex-wrap'>
              <div className='text-center'>
                <div className='text-grey-500 text-xs font-medium font-jm mb-2'>
                  Total Raise
                </div>
                <div className='text-grey-700 text-base font-semibold font-jsb'>
                  $200,000,000
                </div>
              </div>
              <div className='text-center'>
                <div className='text-grey-500 text-xs font-medium font-jm mb-2'>
                  Avg Price
                </div>
                <div className='text-grey-700 text-base font-semibold font-jsb'>
                  $0.75
                </div>
              </div>
              <div className='text-center'>
                <div className='text-grey-500 text-xs font-medium font-jm mb-2'>
                  Total Tokens Offered
                </div>
                <div className='text-grey-700 text-base font-semibold font-jsb'>
                  NBIT 50,000,000 (5.00%)
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='box-shadow-common'>
          <div className='p-6 text-center border-b border-grey-300'>
            <div className='text-grey-700 text-base font-bold font-jb'>
              Launchpads <span className='text-grey-500'>6</span>
            </div>
          </div>
          <div className='p-6'>
            <div className='flex items-center gap-10 flex-wrap'>
              <div className='flex gap-2'>
                <img src='/Dao.svg' alt='dao' />
                <div>
                  <div className='text-sm text-grey-700 font-semibold mb-1'>
                    DAO Maker
                  </div>
                  <div className='inline px-2 text-xs rounded text-grey-500 bg-grey-200 font-medium'>
                    Tier 1
                  </div>
                </div>
              </div>
              <div className='flex gap-2'>
                <img src='/Dao.svg' alt='dao' />
                <div>
                  <div className='text-sm text-grey-700 font-semibold mb-1'>
                    DAO Maker
                  </div>
                  <div className='inline px-2 text-xs rounded text-grey-500 bg-grey-200 font-medium'>
                    Tier 1
                  </div>
                </div>
              </div>
              <div className='flex gap-2'>
                <img src='/Dao.svg' alt='dao' />
                <div>
                  <div className='text-sm text-grey-700 font-semibold mb-1'>
                    DAO Maker
                  </div>
                  <div className='inline px-2 text-xs rounded text-grey-500 bg-grey-200 font-medium'>
                    Tier 1
                  </div>
                </div>
              </div>
              <div className='text-primary-500 text-xs font-medium font-jm cursor-pointer'>
                +3 Launchpad
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
