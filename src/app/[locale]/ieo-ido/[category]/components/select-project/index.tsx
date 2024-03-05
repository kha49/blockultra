import FilterCustom from '@/components/FilterCustom';
import {
  ICustomTagProp,
  IOptionAny,
  IOptionCustom,
} from '@/components/FilterCustom/props';
import Text from '@/components/Text';
import { FetchIeoIdo } from '@/usecases/ieo-ido';
import { Checkbox, Flex, Select, Tag } from 'antd';
import React from 'react';
import { getIeoIdoApiSearchPath } from '../../config';
import { SearchProject } from '../../types';

type PropsType = {
  category: string;
  keySlug?: string;
  onFilterChange: (values: string[]) => void;
  placeholder?: string;
};

export default function SelectProject(props: PropsType) {
  const _renderOption = ({
    name,
    key,
    checked,
    code,
    symbol,
  }: IOptionCustom) => {
    return (
      <Select.Option isSelectOption={true} value={code} key={code}>
        <Flex
          justify='space-between'
          gap={16}
          className='select-coin-custom__item'
        >
          <div className='flex gap-1'>
            <Text ellipsis>{name}</Text>
            {symbol ? (
              <div className='rounded py-0 bg-grey-200 text-[#9FA4B7] leading-5 px-2 text-xs font-medium'>
                {symbol}
              </div>
            ) : null}
          </div>
          {!checked && <Checkbox className='custom-checkbox' />}
        </Flex>
      </Select.Option>
    );
  };

  const _renderTag = (options: ICustomTagProp) => {
    const { value, closable, onClose, index } = options;
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
        {value}
      </Tag>
    );
  };

  const _getData = async ({ searchKey }: IOptionAny) => {
    let url = getIeoIdoApiSearchPath(props.category);
    if (
      (props.category === 'upcoming' || props.category === 'ended') &&
      props.keySlug
    ) {
      url = `ieo-ido/launch-pad-detail/search?search_key${
        searchKey ? `=${searchKey}` : ''
      }&key=${props.keySlug}&status=${
        props.category === 'ended' ? 'past' : 'upcoming'
      }`;
    } else if (props.category === 'upcoming' || props.category === 'ended') {
      url += `?search_key${searchKey ? `=${searchKey}` : ''}&status=${
        props.category === 'ended' ? 'past' : 'upcoming'
      }`;
    }
    const data = (await FetchIeoIdo(url)) as unknown as SearchProject[];

    return data.map((searchItem: SearchProject) => ({
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
      placeholder={props.placeholder || 'Filter projects'}
      renderOption={_renderOption}
      renderTag={_renderTag}
      onChange={props.onFilterChange}
      getData={_getData}
      className='!font-jm'
      overlayClassName='[&_.ant-select-item]:!p-3'
    />
  );
}
