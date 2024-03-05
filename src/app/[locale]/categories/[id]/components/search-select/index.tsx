import FilterCustom from '@/components/FilterCustom';
import {
  ICustomTagProp,
  IOptionAny,
  IOptionCustom,
} from '@/components/FilterCustom/props';
import Text from '@/components/Text';
import { CategoryCoinsSearch } from '@/usecases/category';
import { Checkbox, Flex, Select, Tag } from 'antd';
import { useParams } from 'next/navigation';
import React from 'react';
import { SearchProject } from '../../types';

type PropsType = {
  onFilterChange: (values: string[]) => void;
  placeholder?: string;
};

export default function SelectProject(props: PropsType) {
  const params = useParams<{ id: string }>();
  const categoryId = params.id;
  const _renderOption = ({ name, symbol, checked, code }: IOptionCustom) => {
    return (
      <Select.Option isSelectOption={true} value={code} key={code}>
        <Flex justify='space-between'>
          <Flex align='center' gap={4}>
            <Text>{name}</Text>
            <Text
              type='secondary'
              size={12}
              className='!bg-[#EEF2F6] !px-2 !rounded'
            >
              {symbol}
            </Text>
          </Flex>
          {!checked && <Checkbox disabled className='hover:cursor-pointer' />}
        </Flex>
      </Select.Option>
    );
  };

  const _renderTag = (options: ICustomTagProp) => {
    const { value, closable, onClose, index, rawData } = options;
    const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
      event.preventDefault();
      event.stopPropagation();
    };

    if (index > 2) return <></>;

    if (index === 2)
      return (
        <Tag color='#5766ff' style={{ marginRight: 3 }}>
          ...
        </Tag>
      );
    return (
      <Tag
        color='#5766ff'
        onMouseDown={onPreventMouseDown}
        closable={closable}
        onClose={onClose}
        style={{ marginRight: 3 }}
      >
        {rawData.name ?? value}
      </Tag>
    );
  };

  const _getData = async ({ searchKey }: IOptionAny) => {
    //@ts-ignore
    const data: SearchProject[] = await CategoryCoinsSearch({
      search_key: searchKey || '',
      category_id: categoryId,
    });

    return data.map((searchItem: any) => ({
      id: searchItem.key,
      name: searchItem.name,
      code: searchItem.key,
      thumb: '',
      isSelected: false,
      symbol: searchItem.symbol,
    }));
  };

  return (
    <FilterCustom
      placeholder={props.placeholder || 'Search'}
      renderOption={_renderOption}
      renderTag={_renderTag}
      onChange={(keys) => {
        props.onFilterChange(keys);
      }}
      getData={_getData}
      className='!font-jm'
      overlayClassName='[&_.ant-select-item]:!p-3'
    />
  );
}
