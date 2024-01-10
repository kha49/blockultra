import IconSearchCoinTab from '@/assets/icons/home/IconSearchCoinTab';
import CustomSelect from '@/components/CustomSelect';
import { Checkbox } from 'antd';
import { memo, useEffect, useState } from 'react';
import { IFilterCustom, ISearchData } from './props';
import type { CustomTagProps } from 'rc-select/lib/BaseSelect';
import { useDebounce } from 'usehooks-ts';
import { orderBy, uniqBy } from 'lodash';

const FilterCustom = (props: IFilterCustom) => {
  const { renderOption, renderTag, onChange, getData, placeholder } = props;
  const [searchData, setSearchData] = useState<ISearchData[]>([]);
  const [arSelected, setArSelected] = useState<ISearchData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSelected, setIsSelected] = useState<string[]>([]);
  const [textSearch, setTextSearch] = useState('');
  const debouncedValue = useDebounce<string>(textSearch, 500);

  const _getData = async (searchKey?: string) => {
    setIsLoading(true);
    const data = await getData({
      searchKey: searchKey ?? '',
    });
    setIsLoading(false);
    setSearchData([..._mergeAr(arSelected, data)]);
  };

  const _mergeAr = (oldAr: any[], newAr: any[]) => {
    const allDt = [...oldAr, ...newAr];
    return uniqBy(allDt, (e) => e.code);
  };

  const _renderOptions = () => {
    const elements: JSX.Element[] = [];
    orderBy(searchData, (e) => e.selectedTime).forEach((s) => {
      const checked = isSelected.includes(s.code);
      elements.push(renderOption({ ...s, checked }));
    });

    return elements;
  };

  const _onChangeSelect = (value: string[]) => {
    value = value.reverse();
    searchData.forEach((e) => {
      const index = value.indexOf(e.code);
      e.isSelected = index > -1;
      e.selectedTime = index > -1 ? new Date().getTime() + index : null;
    });
    setArSelected([...searchData.filter((s) => s.isSelected)]);
    setIsSelected(value);
    onChange(value);
  };

  const _tagRender = (props: CustomTagProps) => {
    const index = arSelected.findIndex((e) => e.code === props.value);
    return renderTag({ ...props, index, rawData: arSelected[index] });
  };

  const _onSearch = (value: string) => {
    setTextSearch(value);
  };

  useEffect(() => {
    _getData(debouncedValue);
  }, [debouncedValue]);
  /* #endregion */
  return (
    <div className='select-coin-custom'>
      <CustomSelect
        placeholder={placeholder ?? ''}
        mode='multiple'
        size='large'
        prefixIcon={<IconSearchCoinTab />}
        loading={isLoading}
        menuItemSelectedIcon={<Checkbox checked />}
        onChange={_onChangeSelect}
        tagRender={_tagRender}
        onSearch={_onSearch}
        notFoundContent={<>No results found</>}
        filterOption={(input, option) => {
          if (!option) return false;
          if (option['isSelectOption']) return true;
          return (
            option.key.toLowerCase().indexOf(input.toLowerCase()) >= 0 ||
            option
              .value!!.toString()
              .toLowerCase()
              .indexOf(input.toLowerCase()) >= 0
          );
        }}
      >
        {_renderOptions()}
      </CustomSelect>
    </div>
  );
};

export default memo(FilterCustom);
