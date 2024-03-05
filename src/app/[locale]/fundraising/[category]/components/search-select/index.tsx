import FilterCustom from '@/components/FilterCustom';
import {
  ICustomTagProp,
  IOptionAny,
  IOptionCustom,
} from '@/components/FilterCustom/props';
import { Checkbox, Select, Tag } from 'antd';
import React from 'react';
import { IHeaderFilter } from '../../types';
import { ISearchFilter } from '@/app/home/coin/props';
import {
  FetchSearchTopBanker,
  FundraisingSearch,
} from '@/usecases/fundraising';

export default function SearchSelect({ onChange, layout }: IHeaderFilter) {
  const _renderOption = ({ name, code, checked, symbol }: IOptionCustom) => {
    return (
      <Select.Option isSelectOption={true} value={code} key={name}>
        <div className='flex pr-0 pl-0 mr-0 ml-0 select-coin-custom__item px-3 justify-between font-jm'>
          <div className=''>
            <span className='name mx-2'>{name}</span>
            {symbol && <span className='code px-2 rounded py-0 bg-[#EEF2F6] text-[#9FA4B7] leading-5'>
              {symbol}
            </span>}
          </div>
          <div className='ant-checkbox'>
            {!checked ? (
              <Checkbox className='custom-checkbox' />
            ) : null}
          </div>
        </div>
      </Select.Option>
    );
  };

  const _renderTag = (options: ICustomTagProp) => {
    const {closable, onClose, index, rawData } = options;
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
        {rawData.name}
      </Tag>
    );
  };

  const _getData = async ({ searchKey }: IOptionAny) => {
    const isFun = layout === 'funding-rounds';
    const api = isFun ? FundraisingSearch : FetchSearchTopBanker;

    const res: any = await api({
      slug: searchKey,
      key: searchKey,
    });

    if (!res) return [];
    console.log(res)

    return res.map((e: ISearchFilter) => ({
      id: e?.slug ?? e.key,
      name: e.name,
      code: e?.slug ?? e.key,
      thumb: '',
      isSelected: false,
      symbol: e.symbol
    }));
  };

  return (
    <FilterCustom
      className='font-jm'
      placeholder='Filter projects'
      renderOption={_renderOption}
      renderTag={_renderTag}
      onChange={onChange}
      getData={_getData}
    />
  );
}
