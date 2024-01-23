'use client'
import { IconArrowDown } from '@/assets/icons/IconArrowDown';
import { currencyFormat, nFormatter, percentFormat } from '@/helpers';

const Detail = ({ ieoidos , tokenInfo}: any) => {
  const isTrue = true;

  return (
    <div>
      <div className='text-grey-700 text-xl font-bold font-jb mb-2'>Detail</div>
      <div>
       
        {ieoidos?.map((item: any) => {
          return <ItemDetail item={item} symbol={tokenInfo.symbol} />;
        
        })
        }
        
        
      </div>
    </div>
  );
};

export function ItemDetail({item, symbol}:any) {
  return (
    <div className='box-shadow-common p-4 flex items-center justify-between flex-wrap gap-6 mb-6'>
      <div className='flex flex-col gap-6 item-center'>
        <div className='flex items-center gap-2'>
          <img src={item.logo} onError={() => {
            console.log('====================================');
            console.log("Load image error", item);
            console.log('====================================');
          }} alt='dao' />


          <div className='text-sm text-grey-700 font-bold'>{item.name}</div>
        </div>
        {item?.isTrue ? (
          <div className='text-primary-500 text-sm font-semibold'>
            {item?.time_start} - {item?.time_end}
          </div>
        ) : (
          ''
        )}
      </div>
      <div className='flex flex-col gap-6 item-center'>
        <div className='text-center'>
          <div className='text-grey-500 text-sm mb-2'>Price</div>
          <div className='text-grey-700 text-sm font-semibold'>
            {currencyFormat(item?.price, '$')}
          </div>
        </div>
        {item?.isTrue ? (
          <div className='text-grey-500 text-sm'>
            Valuation:
            <span className='font-semibold'>
              {nFormatter(item?.valuation, 2, '$')}
            </span>
          </div>
        ) : (
          ''
        )}
      </div>
       
      <div className='flex flex-col gap-6 item-center'>
        <div className='text-center'>
          <div className='text-grey-500 text-sm mb-2'>Raise</div>
          <div className='text-grey-700 text-sm font-semibold'>
            {nFormatter(item?.raised, 2, '$')}
          </div>
        </div>
        {item?.isTrue ? (
          <div className='text-grey-500 text-sm'>
            Tokens Offered:
            <span className='font-semibold'>
              {' '}
              {nFormatter(item?.tokensOffered, 2, symbol)} ({' '}
              {nFormatter(item?.percenOfTokens, 2, '%', true)})
            </span>
          </div>
        ) : (
          ''
        )}
      </div>
      <div className='flex flex-col gap-6 item-center'>
        <div className='text-center'>
          <div className='text-grey-500 text-sm mb-2'>ROI</div>
          <div className='text-grey-700 text-sm font-semibold'>
            {' '}
            {nFormatter(item?.roi, 2, symbol)}
          </div>
        </div>
        {item?.isTrue ? (
          <div className='text-grey-500 text-sm'>
            ATH ROI:
            <span className='font-semibold'>
              {' '}
              {nFormatter(item?.athROI, 2, symbol)}
            </span>
          </div>
        ) : (
          ''
        )}
      </div>
      <div className='flex flex-col gap-6 item-center'>
        <div className='text-center'>
          <div className='text-grey-500 text-sm mb-2'>Unlocked</div>
          <div className='text-grey-700 text-sm font-semibold'>
            {nFormatter(item?.unlockedPercent, 2, symbol)}
          </div>
        </div>
        {item?.isTrue ? (
          <div className='text-grey-500 text-sm'>
            {nFormatter(item?.unlockedTokens, 2, symbol)}~
            <span className='font-semibold'>
              {nFormatter(item?.unlockedValue, 2, '$')}~
            </span>
          </div>
        ) : (
          ''
        )}
      </div>
      <div className='min-w-[100px] flex items-start justify-center'>
        <div
          onClick={() => {
            console.log('====================================');
            console.log('onClick on item', item);
            console.log('====================================');
            item.isTrue=!item.isTrue
          }}
        >
          <IconArrowDown />
        </div>
      </div>
    </div>
  );
}

export default Detail;
