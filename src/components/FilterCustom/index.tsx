import IconSearchCoinTab from '@/assets/icons/home/IconSearchCoinTab';
import CustomSelect from '@/components/CustomSelect';
import { Checkbox, Select, Tag } from 'antd';
import { random } from 'lodash';
import { useEffect, useState } from 'react';
import { IFilterCustom, ISearchData } from './props';
import { sleep } from '@/helpers';
import type { CustomTagProps } from 'rc-select/lib/BaseSelect';
import { useDebounce } from 'usehooks-ts';

const FilterCustom = ({
  renderOption,
  renderTag,
  onChange,
  getData,
  placeholder,
}: IFilterCustom) => {
  const [searchData, setSearchData] = useState<ISearchData[]>([]);
  const [arSelected, setArSelected] = useState<ISearchData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSelected, setIsSelected] = useState<string[]>([]);
  const [textSearch, setTextSearch] = useState('');
  const debouncedValue = useDebounce<string>(textSearch, 500);

  const _getData = async (searchKey?: string) => {
    // todo call api with search key
    setIsLoading(true);
    await sleep(1000);
    setIsLoading(false);
    const data = await getData({
      searchKey: textSearch,
    });
    setSearchData([...arSelected, ...data]);
  };

  const _renderOptions = () => {
    const elements: JSX.Element[] = [];

    searchData.forEach((s) => {
      const checked = isSelected.includes(s.code);
      elements.push(renderOption({ ...s, checked }));
    });

    return elements;
  };

  const _onChangeSelect = (value: string[]) => {
    searchData.forEach((e) => {
      e.isSelected = value.includes(e.code);
    });
    setArSelected([...searchData.filter((s) => s.isSelected)]);
    setIsSelected(value);
    onChange(value);
  };

  const _tagRender = (props: CustomTagProps) => {
    const index = isSelected.indexOf(props.value);

    return renderTag({ ...props, index });
  };

  const _onSearch = (value: string) => {
    setTextSearch(value);
  };

  /* #region useEffect */
  useEffect(() => {
    _getData();
  }, []);

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

export default FilterCustom;
