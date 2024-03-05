import IconCheckedCompleted from '@/assets/icons/IconCheckedCompleted';
import CountdownTimer from '@/components/CountdownTimer/CountDownTimer';
import Text from '@/components/Text';
import { currencyFormat, nFormatter } from '@/helpers';
import { Flex, Table, Tooltip } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import moment from 'moment';

const Rounds = ({ data, tokenInfo }: any) => {
  if (!data) return;
  const unlocksData = data.unlocks || [];

  // const totalTokens: number =
  //   (dataProps.unlockedTokens * 100) / dataProps.unlockedTokensPercent;

  const columns: ColumnsType<IUnlock> = [
    {
      key: 'rounds',
      title: <Text weight='bold'>Rounds</Text>,
      align: 'left',
      width: 300,
      render: (_, value) => {
        return (
          <Flex vertical gap={8}>
            <Flex gap={4} align='center'>
              <Text weight='bold' ellipsis maxWidth={276}>
                {value.name}
              </Text>
              {value.unlockedPercent === 100 ? (
                <div>
                  <IconCheckedCompleted />
                </div>
              ) : (
                ''
              )}
            </Flex>
            <Flex align='center' gap={4}>
              <Tooltip
                title={<Text size={12}>Allocation</Text>}
                placement='bottom'
                overlayClassName='tooltip-light'
              >
                <Text size={12}>
                  {tokenInfo.symbol} {nFormatter(value.allocation, 2, '')}
                </Text>
              </Tooltip>
              <Text size={12} type='secondary'>
                {nFormatter(value.allocationPercent, 2, '')}%
              </Text>
            </Flex>
          </Flex>
        );
      },
    },
    {
      key: 'unlock',
      title: () => {
        return (
          <Flex align='center' justify='space-between'>
            <Text weight='bold'>Unlocked</Text>
            <Text weight='bold'>Locked</Text>
          </Flex>
        );
      },
      width: 400,
      align: 'center',
      render: (_, value) => {
        return (
          <Flex vertical className='w-full max-w-[400px]'>
            <Flex align='center' justify='space-between'>
              <Text weight='semiBold'>
                {nFormatter(value.unlockedPercent, 2, '%', true)}
              </Text>
              <Text weight='semiBold'>
                {nFormatter(value.lockedPercent, 2, '%', true)}
              </Text>
            </Flex>
            <div className='py-2 relative'>
              <div
                className='unlock absolute top-1/2 left-0 -translate-y-1/2 bg-primary-500 h-1.5 rounded-xl z-20'
                style={{ width: value.unlockedPercent + '%' }}
              ></div>
              <div
                className='next-lock absolute top-1/2 -translate-y-1/2 bg-orange-500 h-1.5 rounded-xl z-10'
                style={{
                  width: value.nextUnlockPercent
                    ? value.nextUnlockPercent + value.unlockedPercent + '%'
                    : 0,
                }}
              ></div>
              <div className='locked bg-grey-300 w-full h-1.5 rounded-xl'></div>
            </div>
            <Flex wrap='wrap' align='center' justify='space-between'>
              <Text type='secondary' size={12}>
                {value.startDate
                  ? 'Start: ' + moment(value.startDate).format('DD/MM/YYYY')
                  : '-'}
              </Text>
              <Text type='secondary' size={12}>
                {value.endDate
                  ? 'End: ' + moment(value.endDate).format('DD/MM/YYYY')
                  : '-'}
              </Text>
            </Flex>
          </Flex>
        );
      },
    },
    {
      key: 'tgeUnlock',
      title: <Text weight='bold'>TGE Unlock</Text>,
      width: 268,
      align: 'center',
      render: (_, value) => {
        return (
          <Flex vertical gap={8} align='center' className='text-center'>
            <Text weight='semiBold'>
              {value.tgeUnlockPercent ? value.tgeUnlockPercent + '%' : '-'}
            </Text>
            <Text size={12} type='secondary'>
              {value.tgeUnlockToken
                ? nFormatter(value.tgeUnlockToken, 2, '')
                : ''}
            </Text>
          </Flex>
        );
      },
    },
    {
      key: 'nextUnlock',
      title: <Text weight='bold'>Next Unlock</Text>,
      width: 396,
      align: 'center',
      render: (_, value) => {
        const countDownTime = new Date(value.timer);
        const isUnlock = value.lockedPercent > 0;

        if (!value.nextUnlockPercent) return '-';
        return (
          <Flex justify='flex-end'>
            {isUnlock ? (
              <div className='md:flex items-center gap-7'>
                <Flex vertical gap={8} align='center'>
                  <Text weight='semiBold'>
                    {currencyFormat(value.nextUnlockPercent, '')}%
                  </Text>
                  <Text size={12} type='secondary'>
                    {tokenInfo.symbol}{' '}
                    {nFormatter(value?.nextUnlockToken, 2, '')} ~{' '}
                    {nFormatter(value?.nextUnlockValue, 2, '$')} (
                    {nFormatter(
                      (value?.nextUnlockValue * 100) / tokenInfo.marketCap,
                      2,
                      ''
                    )}
                    % of M.Cap)
                  </Text>
                </Flex>
                <CountdownTimer targetDate={countDownTime} className='m-0' />
              </div>
            ) : (
              <Flex gap={8} align='center' justify='center' className='w-full'>
                <IconCheckedCompleted />
                <Text weight='bold' color='success'>
                  Fully Unlocked
                </Text>
              </Flex>
            )}
          </Flex>
        );
      },
    },
  ];
  return (
    <div>
      <div className='overflow-x-auto hide-scroll'>
        <Table columns={columns} dataSource={unlocksData} pagination={false} />
      </div>
    </div>
  );
};

export default Rounds;
