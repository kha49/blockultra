import Text from '@/components/Text';
import { changeImageUrl } from '@/helpers/functions';
import { Avatar, Flex, Tag } from 'antd';

type DataGroupProps<T = any> = {
  maxWidth?: number;
  onClick?: () => void;
  data?: T[];
};

export default function DataGroup(props: DataGroupProps) {
  const { onClick, data, maxWidth } = props;

  if (!data?.length) {
    return null;
  }

  const [first, ...rest] = data;

  return (
    <Flex
      align='center'
      gap={8}
      style={{
        maxWidth: maxWidth || '100%',
      }}
    >
      {!first.image && !first.name && rest.length === 0 ? (
        <Text weight='bold'>-</Text>
      ) : (
        <>
          <Flex>
            <Avatar size={32} src={changeImageUrl(first.image)} />
          </Flex>
          <Text ellipsis weight='bold'>
            {first.name}
          </Text>
          {rest.length > 0 && (
            <Tag
              className={
                'bg-grey-200 !text-grey-500 cursor-pointer text-xs !font-jm font-medium'
              }
              bordered={false}
              onClick={onClick}
            >
              + {rest.length}
            </Tag>
          )}
        </>
      )}
    </Flex>
  );
}
