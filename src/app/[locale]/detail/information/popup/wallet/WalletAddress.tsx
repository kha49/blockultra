import { IconCopy } from '@/assets/icons';
import IconETH from '@/assets/icons/IconETH';
import Image from 'next/image';

const WalletAddress = () => {
  return (
    <div className='wallet-contract max-h-[300px] overflow-y-auto'>
      {...Array.from(Array(20).keys()).map((item) => {
        return (
          <div
            key={item}
            className='flex items-center gap-4 px-3 py-2 rounded cursor-pointer hover:bg-grey-200'
          >
            <IconETH />
            <span className='text-sm'>ETH</span>
            <span className='text-primary-500 max-w-[62px] lg:max-w-[124px] truncate'>
              0x2df3dkdkmskcamksmdcksdmkcsdc8h3h5
            </span>
            <IconCopy />
            <Image src='/coin-info/fox.png' width={24} height={24} alt='fox' />
          </div>
        );
      })}
    </div>
  );
};

export default WalletAddress;
