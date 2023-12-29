import { Flex, Select, Tag } from 'antd';
import CustomSelect from '@/components/CustomSelect';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { CloseCircleOutlined } from '@ant-design/icons';

type TData = {
  id: string;
  label: string;
  icon: string;
  value: string;
};

const mockDataFilter: TData[] = [
  {
    id: '1',
    label: 'Binance LaunchPad',
    icon: '/coin-info/backers-1.png',
    value: 'launchpad',
  },
  {
    id: '2',
    label: 'Coinlist',
    icon: '/coin-info/backers-2.png',
    value: 'coinlist',
  },
  {
    id: '3',
    label: 'DaoMaker',
    icon: '/coin-info/backers-3.png',
    value: 'DaoMaker',
  },
  {
    id: '4',
    label: 'Wallets 1',
    icon: '/coin-info/wallets-1.png',
    value: 'wallet 1',
  },
];

type UsHeaderProps = {
  defaultValues?: TData[];
  onFilter?: (values: string[]) => void;
};

export const UsHeader = (props: UsHeaderProps) => {
  const { defaultValues, onFilter } = props;

  const [data, setData] = useState<TData[]>(defaultValues ?? mockDataFilter);
  const [dataSelected, setDataSelected] = useState<TData[]>([]);

  const _renderOption = ({ value, label, icon }: TData) => {
    return (
      <Select.Option isSelectOption={true} value={value} key={label}>
        <div className='flex pr-0 pl-0 mr-0 ml-0 select-coin-custom__item px-3 justify-start'>
          <Image src={icon} alt={'icon-select'} width={24} height={24} />
          <div className=''>
            <span className='name mx-2'>{label}</span>
          </div>
        </div>
      </Select.Option>
    );
  };

  const _renderOptions = () => data.map(_renderOption);

  const _renderActiveTag = () => {
    const preview = dataSelected.slice(0, 3);
    const part = data.slice(3);
    const isMore = dataSelected.length > 3;
    return (
      <Flex gap={12} wrap={'wrap'}>
        {preview.map((item) => (
          <Tag
            className={'filter-tag'}
            closeIcon={<CloseCircleOutlined />}
            onClose={() => handleRemoveTag(item.value)}
          >
            <Image src={item.icon} alt={'icon-select'} width={24} height={24} />
            {item.label}
          </Tag>
        ))}
        {isMore && <Tag className={'filter-tag'}>+{part.length}</Tag>}
      </Flex>
    );
  };

  const handleRemoveTag = (value: string) => {
    setDataSelected((prevState) =>
      prevState.filter((item) => item.value !== value)
    );
  };

  const handleOnChange = (value: string) => {
    const isExist = dataSelected.find((s) => s.value === value);
    if (isExist) {
      return;
    }
    const item = mockDataFilter.find((i) => i.value === value);
    if (item) {
      setDataSelected((prevState) => [...prevState, item]);
    }
  };

  useEffect(() => {
    onFilter?.(dataSelected.map((item) => item.value));
  }, [dataSelected]);

  return (
    <Flex align={'center'} wrap={'wrap'} gap={10} className={'us-header'}>
      <CustomSelect placeholder='Filter Categories' onChange={handleOnChange}>
        {_renderOptions()}
      </CustomSelect>
      {_renderActiveTag()}
    </Flex>
  );
};
