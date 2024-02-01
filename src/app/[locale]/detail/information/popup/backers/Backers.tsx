import { Popover } from 'antd';
import { changeImageUrl } from '@/helpers/functions';

const Backers = (props: any) => {
  const backers = props.backers;
  if (!backers) return;
  if (backers.length <= 0) return;
  let backerExtend = [];
  backerExtend = backers.slice(2);

  return (
    <div>
      {backers && backers.length > 0 ? (
        <div>
          <p className='text-grey-500 text-sm'>Backers</p>
          <div className='flex gap-4 xl:gap-5 py-[6px]'>
            {...Array.from(Array(3).keys()).map((item) => {
              return (
                <div key={item} className={backers[item] ? '' : 'hidden'}>
                  {
                    backers[item]?.logo ? (
                      <img
                        src={changeImageUrl(backers[item]?.logo)}
                        width={28}
                        height={28}
                        alt='backers-1'
                        key={item}
                      />
                    ) : ''
                  }
                </div>
              );
            })}
            {
              backers && backers.length > 3 ? (
                <Popover content={<DialogBackers backers={backerExtend} />}>
                  <span className='flex items-center justify-center w-7 h-7 rounded-full bg-grey-300 text-xs font-semibold text-grey-700 text-center cursor-pointer'>
                    +{backers.length - 3}
                  </span>
                </Popover>
              ) : ''
            }
          </div>
        </div>
      ) : ''}
    </div>
  );
};

export function DialogBackers(props: any) {
  const backers = props.backers;
  return (
    <div className='flex flex-wrap gap-5 w-full md:max-w-[220px]'>
      {...Array.from(Array(backers.length).keys()).map((item) => {
        return (
          <img
            src={changeImageUrl(backers[item]?.logo)}
            width={28}
            height={28}
            alt='backers-1'
            key={item}
          />
        );
      })}
    </div>
  );
}

export default Backers;
