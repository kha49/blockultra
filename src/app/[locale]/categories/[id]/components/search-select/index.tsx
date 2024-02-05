import FilterCustom from '@/components/FilterCustom';
import {
  ICustomTagProp,
  IOptionAny,
  IOptionCustom,
} from '@/components/FilterCustom/props';
import { Checkbox, Select, Tag } from 'antd';
import React from 'react';
import { SearchProject } from '../../types';
import { CategoryCoinsSearch } from '@/usecases/category';
import { useParams } from 'next/navigation';

type PropsType = {
  onFilterChange: (values: string[]) => void;
  placeholder?: string;
};

export default function SelectProject(props: PropsType) {
  const params = useParams<{ id: string }>();
  const categoryId = params.id;
  const _renderOption = ({ name, key, checked, code }: IOptionCustom) => {
    return (
      <Select.Option isSelectOption={true} value={code} key={code}>
        <div className='flex pr-0 pl-0 mr-0 ml-0 select-coin-custom__item px-3 justify-between'>
          <div className=''>
            <span className='name mx-2'>{name}</span>
          </div>
          <div className='ant-checkbox'>
            {!checked ? (
              <Checkbox disabled className='hover:cursor-pointer' />
            ) : null}
          </div>
        </div>
      </Select.Option>
    );
  };

  const _renderTag = (options: ICustomTagProp) => {
    const { value, closable, onClose, index, rawData } = options;
    const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
      event.preventDefault();
      event.stopPropagation();
    };

    if (index > 3) return <></>;

    if (index === 3)
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

    console.log('data', data);
    return data.map((searchItem: any) => ({
      id: searchItem.key,
      name: searchItem.name,
      code: searchItem.key,
      thumb: '',
      isSelected: false,
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
    />
  );
}
