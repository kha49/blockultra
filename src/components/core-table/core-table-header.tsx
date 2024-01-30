import FilterCustom from '@/components/FilterCustom';
import { Button, Checkbox, Select, Tag } from 'antd';
import { IconFilterCoinTab } from '@/assets/icons/home/IconFilterCoinTab';
import { IconCustomCointTab } from '@/assets/icons/home/IconCustomCoinTab';
import {
  ICustomTagProp,
  IOptionAny,
  IOptionCustom,
} from '@/components/FilterCustom/props';
import { SearchCoinsFilter } from '@/usecases/home';
import { ISearchFilter } from '@/app/home/coin/props';

export type ICoreTableHeaderProps = {
  onChangeFilterSelect?: (value: string[]) => void;
  isCustomize?: boolean;
  isFilter?: boolean;
  onCustomize?: () => void;
  onFilter?: () => void;
};

export const CoreTableHeader = (props: ICoreTableHeaderProps) => {
  const {
    onChangeFilterSelect = () => {},
    isCustomize = true,
    isFilter = true,
    onCustomize = () => {},
    onFilter = () => {},
  } = props;
  const _renderOption = ({ name, code, checked }: IOptionCustom) => {
    return (
      <Select.Option isSelectOption={true} value={code} key={code}>
        <div className='flex pr-0 pl-0 mr-0 ml-0 select-coin-custom__item px-3 justify-between'>
          <div className=''>
            <span className='name mx-2'>{name}</span>
            <span className='code px-2 rounded py-0 bg-[#EEF2F6] text-[#9FA4B7] leading-5'>
              {code}
            </span>
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
    const res: any = await SearchCoinsFilter({
      search_key: searchKey,
    });
    if (!res) return [];

    return res.map((e: ISearchFilter) => ({
      id: e.key,
      name: e.name,
      code: e.key,
      thumb: '',
      isSelected: false,
    }));
  };

  return (
    <div className='core-table__header'>
      <FilterCustom
        placeholder='Filter Coins'
        renderOption={_renderOption}
        renderTag={_renderTag}
        onChange={onChangeFilterSelect}
        getData={_getData}
        isSortSelected='alphabet'
      />
      <div className='wrap-btn-filter'>
        {isFilter && (
          <Button
            className='btn-filter !bg-white !text-grey-500'
            onClick={onFilter}
            disabled
          >
            <IconFilterCoinTab />
            Filters
          </Button>
        )}

        {isCustomize && (
          <Button
            className='btn-filter !bg-white !text-grey-500'
            onClick={onCustomize}
            disabled
          >
            <IconCustomCointTab />
            Customize
          </Button>
        )}
      </div>
    </div>
  );
};
