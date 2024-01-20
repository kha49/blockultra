import { IconArrowDown } from '@/assets/icons/IconArrowDown';

const Detail = () => {
  const isTrue = false;

  return (
    <div>
      <div className='text-grey-700 text-xl font-bold font-jb mb-2'>Detail</div>
      <div>
        <div className='box-shadow-common p-4 flex items-center justify-between flex-wrap gap-6 mb-6'>
          <div className='flex flex-col gap-6 item-center'>
            <div className='flex items-center gap-2'>
              <img src='/Dao.svg' alt='dao' />
              <div className='text-sm text-grey-700 font-bold'>DAO Maker</div>
            </div>
            {isTrue ? (
              <div className='text-primary-500 text-sm font-semibold'>
                01 May 2023 - 05 May 2023
              </div>
            ) : (
              ''
            )}
          </div>
          <div className='flex flex-col gap-6 item-center'>
            <div className='text-center'>
              <div className='text-grey-500 text-sm mb-2'>Price</div>
              <div className='text-grey-700 text-sm font-semibold'>$0.075</div>
            </div>
            {isTrue ? (
              <div className='text-grey-500 text-sm'>
                Valuation:<span className='font-semibold'>$3.75M</span>
              </div>
            ) : (
              ''
            )}
          </div>
          <div className='flex flex-col gap-6 item-center'>
            <div className='text-center'>
              <div className='text-grey-500 text-sm mb-2'>Raise</div>
              <div className='text-grey-700 text-sm font-semibold'>$50.00M</div>
            </div>
            {isTrue ? (
              <div className='text-grey-500 text-sm'>
                Tokens Offered:
                <span className='font-semibold'>50M NBIT (5%)</span>
              </div>
            ) : (
              ''
            )}
          </div>
          <div className='flex flex-col gap-6 item-center'>
            <div className='text-center'>
              <div className='text-grey-500 text-sm mb-2'>ROI</div>
              <div className='text-grey-700 text-sm font-semibold'>1.2x</div>
            </div>
            {isTrue ? (
              <div className='text-grey-500 text-sm'>
                ATH ROI:<span className='font-semibold'>100x</span>
              </div>
            ) : (
              ''
            )}
          </div>
          <div className='flex flex-col gap-6 item-center'>
            <div className='text-center'>
              <div className='text-grey-500 text-sm mb-2'>Unlocked</div>
              <div className='text-grey-700 text-sm font-semibold'>82.21%</div>
            </div>
            {isTrue ? (
              <div className='text-grey-500 text-sm'>
                NBIT 618.22M~<span className='font-semibold'>$87.83M</span>
              </div>
            ) : (
              ''
            )}
          </div>
          <div className='min-w-[100px] flex items-start justify-center'>
            <IconArrowDown />
          </div>
        </div>
        <div className='box-shadow-common p-4 flex items-center justify-between flex-wrap gap-6 mb-6'>
          <div className='flex flex-col gap-6 item-center'>
            <div className='flex items-center gap-2'>
              <img src='/Dao.svg' alt='dao' />
              <div className='text-sm text-grey-700 font-bold'>DAO Maker</div>
            </div>
            {isTrue ? (
              <div className='text-primary-500 text-sm font-semibold'>
                01 May 2023 - 05 May 2023
              </div>
            ) : (
              ''
            )}
          </div>
          <div className='flex flex-col gap-6 item-center'>
            <div className='text-center'>
              <div className='text-grey-500 text-sm mb-2'>Price</div>
              <div className='text-grey-700 text-sm font-semibold'>$0.075</div>
            </div>
            {isTrue ? (
              <div className='text-grey-500 text-sm'>
                Valuation:<span className='font-semibold'>$3.75M</span>
              </div>
            ) : (
              ''
            )}
          </div>
          <div className='flex flex-col gap-6 item-center'>
            <div className='text-center'>
              <div className='text-grey-500 text-sm mb-2'>Raise</div>
              <div className='text-grey-700 text-sm font-semibold'>$50.00M</div>
            </div>
            {isTrue ? (
              <div className='text-grey-500 text-sm'>
                Tokens Offered:
                <span className='font-semibold'>50M NBIT (5%)</span>
              </div>
            ) : (
              ''
            )}
          </div>
          <div className='flex flex-col gap-6 item-center'>
            <div className='text-center'>
              <div className='text-grey-500 text-sm mb-2'>ROI</div>
              <div className='text-grey-700 text-sm font-semibold'>1.2x</div>
            </div>
            {isTrue ? (
              <div className='text-grey-500 text-sm'>
                ATH ROI:<span className='font-semibold'>100x</span>
              </div>
            ) : (
              ''
            )}
          </div>
          <div className='flex flex-col gap-6 item-center'>
            <div className='text-center'>
              <div className='text-grey-500 text-sm mb-2'>Unlocked</div>
              <div className='text-grey-700 text-sm font-semibold'>82.21%</div>
            </div>
            {isTrue ? (
              <div className='text-grey-500 text-sm'>
                NBIT 618.22M~<span className='font-semibold'>$87.83M</span>
              </div>
            ) : (
              ''
            )}
          </div>
          <div className='min-w-[100px] flex items-start justify-center'>
            <IconArrowDown />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
