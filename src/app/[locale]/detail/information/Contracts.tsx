import { IconCaretDown, IconCopy } from '@/assets/icons';
import IconETH from '@/assets/icons/IconETH';
import Text from '@/components/Text';
import { cn, copyToClipboard } from '@/helpers/functions';
import { Popover, Tooltip, message } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import WalletAddress from './popup/wallet/WalletAddress';
import WalletBrand from './popup/wallet/WalletBrand';

const Contracts = (props: any) => {
  const tokens = props.tokens || [];
  if (tokens.length <= 0) return;
  return (
    <div className='flex items-center gap-4 px-3 py-2 bg-grey-200 rounded'>
      <IconETH />
      <span className='text-sm'>{tokens[0]?.platformName}</span>
      <Popover
        placement='bottom'
        content={<WalletAddress tokens={props.tokens} />}
        overlayClassName={cn(
          '[&_.ant-popover-inner]:overflow-y-auto',
          '[&_.ant-popover-inner]:max-h-[312px]',
          '[&_.ant-popover-inner]:max-w-[355px]'
        )}
      >
        <div>
          <IconCaretDown />
        </div>
      </Popover>
      <Link
        target='_blank'
        href={`${tokens[0]?.explorerUrl}${
          (tokens[0]?.explorerUrl as string).slice(-1) === '/' ? '' : '/'
        }${tokens[0]?.address}`}
        className='max-w-[62px] lg:max-w-[124px] cursor-pointer flex items-center'
      >
        <Text
          color='primary'
          ellipsis={{
            open: false,
          }}
        >
          {(tokens[0]?.address as string)?.slice(
            0,
            tokens[0]?.address.length - 6
          )}
        </Text>
        <Text color='primary'>{(tokens[0]?.address as string)?.slice(-6)}</Text>
      </Link>
      <Tooltip
        title={<Text size={12}>Copy Address</Text>}
        overlayClassName='tooltip-light'
      >
        <div
          onClick={() => {
            const isCopied = copyToClipboard(tokens[0]?.address);
            if (isCopied) message.success('Copied');
          }}
          className='cursor-pointer'
        >
          <IconCopy />
        </div>
      </Tooltip>
      <Tooltip
        title={<Text size={12}>Add to MetaMask</Text>}
        overlayClassName='tooltip-light'
      >
        <Image
          src='/coin-info/fox.png'
          width={24}
          height={24}
          alt='fox'
          className='cursor-pointer'
        />
      </Tooltip>
      <Popover content={<WalletBrand />}>
        <div>
          <IconCaretDown />
        </div>
      </Popover>
    </div>
  );
};

export default Contracts;
