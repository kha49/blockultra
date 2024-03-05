import { ISearchFilter } from '@/app/home/coin/props';
import { IconCustomCointTab } from '@/assets/icons/home/IconCustomCoinTab';
import { IconFilterCoinTab } from '@/assets/icons/home/IconFilterCoinTab';
import CommonTable from '@/components/CommonTable/common-table';
import FilterCustom from '@/components/FilterCustom';
import {
  ICustomTagProp,
  IOptionAny,
  IOptionCustom,
} from '@/components/FilterCustom/props';
import SelectItemTable from '@/components/SelectItemTable';
import Text from '@/components/Text';
import { getIndexTable, renderRangePaging } from '@/helpers';
import { ORDER } from '@/helpers/constants';
import { cn } from '@/helpers/functions';
import { IResponseAxios } from '@/models/IResponse';
import {
  FetchFilterFunc,
  FetchFilterPor,
  FetchFunRound,
  FetchPortfollios,
} from '@/usecases/fundraising';
import { Button, Checkbox, Flex, Pagination, Select, Tag } from 'antd';
import { isArray } from 'lodash';
import { useParams } from 'next/navigation';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { tabFundraisingTable } from './columns';

interface IPropsTableData {
  tabKey: string;
  slug: string;
  //   bankerId: string;
}

const TableData = (props: IPropsTableData) => {
  const { tabKey, slug } = props;
  const params = useParams();
  const { id } = params;
  const [data, setData] = useState<any[]>([]);
  const [pageSize, setPageSize] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [order, setOrder] = useState({
    columnKey: '',
    order: '',
  });
  const [keyFilter, setKeyFilter] = useState<string[]>([]);

  const getTableData = useCallback(async () => {
    const api = tabKey === 'por' ? FetchPortfollios : FetchFunRound;
    const response: IResponseAxios<any> = await api({
      limit: pageSize,
      page: currentPage,
      sort_by: order.columnKey,
      sort_order: ORDER[order.order as keyof typeof ORDER],
      search_key: keyFilter.join(','),
      backer_id: id,
      key: 'cmt-digital',
      slug,
    });

    if (!response) return;
    const { data, total } = response;
    setData(data);
    setTotal(total!!);

    /* #endregion */
  }, [pageSize, currentPage, order, keyFilter, slug]);

  useEffect(() => {
    getTableData();
  }, [getTableData, pageSize, currentPage, order, keyFilter]);

  const _onChangePage = (page: number) => {
    setCurrentPage(page);
  };

  const _onChangeSize = (value: number) => {
    setCurrentPage(1);
    setPageSize(value);
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
    const api = tabKey === 'por' ? FetchFilterPor : FetchFilterFunc;

    const res: any = await api({
      search_key: searchKey,
      key: searchKey,
      backer_id: id,
    });
    if (!res) return [];

    return res.map((e: ISearchFilter) => ({
      id: e.id,
      name: e.name,
      code: e.slug || e.key,
      thumb: '',
      isSelected: false,
      symbol: e.symbol
    }));
  };

  const _renderOption = ({ name, code, checked, symbol }: IOptionCustom) => {
    return (
      <Select.Option isSelectOption={true} value={code} key={code}>
        <Flex
          justify='space-between'
          gap={16}
          className='select-coin-custom__item'
        >
         <div className='flex gap-2'>
         <Text ellipsis>{name}</Text>
          {symbol && <span className='code px-2 rounded py-0 bg-[#EEF2F6] text-[#9FA4B7] leading-5'>
              {symbol}
            </span>}
         </div>
          {!checked && <Checkbox  className='custom-checkbox' />}
        </Flex>
      </Select.Option>
    );
  };

  const _onSelectFilter = (value: string[]) => {
    setKeyFilter(value);
  };

  const formattedData = useMemo(
    () =>
      data.map((item, index) => {
        return {
          ...item,
          _index: getIndexTable(currentPage || 1, pageSize || 10, index),
        };
      }),
    [data, currentPage, pageSize]
  );

  return (
    <Flex vertical gap={16} className='home-table coin-tab top-backer'>
      <Flex gap={8} justify='space-between'>
        <Flex gap={8}>
          <FilterCustom
            placeholder={'Filter project'}
            renderOption={_renderOption}
            renderTag={_renderTag}
            onChange={_onSelectFilter}
            getData={_getData}
            // isSortSelected='alphabet'
            overlayClassName='[&_.ant-select-item]:!p-3'
          />
          <Button className={cn('!bg-white !h-11 hidden md:block')} disabled>
            <Flex align='center' gap={8}>
              <IconFilterCoinTab />
              <Text type='secondary'>Filters</Text>
            </Flex>
          </Button>
        </Flex>
        <Button className={cn('!bg-white !h-11 hidden md:block')} disabled>
          <Flex align='center' gap={8}>
            <IconCustomCointTab />
            <Text type='secondary'>Customize</Text>
          </Flex>
        </Button>
      </Flex>
      <Flex vertical gap={24}>
        <CommonTable
          columns={
            tabFundraisingTable[tabKey as keyof typeof tabFundraisingTable]
          }
          key={tabKey}
          dataSource={formattedData}
          pagination={{ position: ['none'], pageSize }}
          onChange={(_page, _filter, sort) => {
            const itemSort = isArray(sort) ? sort[0] : sort;
            setOrder({
              columnKey: itemSort.columnKey
                ? itemSort.columnKey.toString()
                : '',
              order: itemSort.order ? itemSort.order.toString() : '',
            });
          }}
          showSorterTooltip={false}
        />

        <div className='flex items-center justify-center table-pagination pagination-mobile'>
          <Pagination
            total={total}
            pageSize={pageSize}
            current={currentPage}
            onChange={_onChangePage}
            showSizeChanger={false}
            size='small'
          />
        </div>

        <div className='flex items-center justify-between table-pagination'>
          <Text>
            {renderRangePaging(currentPage, pageSize, data.length, total)}
          </Text>
          <div className='pagination-desktop'>
            <Pagination
              total={total}
              pageSize={pageSize}
              current={currentPage}
              onChange={_onChangePage}
              showSizeChanger={false}
            />
          </div>
          <div>
            <SelectItemTable
              pageSize={pageSize.toString()}
              onChange={_onChangeSize}
            />
          </div>
        </div>
      </Flex>
    </Flex>
  );
};

export default memo(TableData);
