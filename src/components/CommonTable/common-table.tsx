import React, { forwardRef, memo } from 'react';
import { Table, TableProps } from 'antd';
import { get, sumBy } from 'lodash';
import { ColumnType } from 'antd/es/table';
import './index.scss';
import { renderSortIcon } from '@/helpers';
import { useWindowSize } from 'usehooks-ts';

type RecordType = Record<string, any>;

function wrapWithWidth(
  f: any,
  isAutoWidth: boolean,
  width?: string | number,
  align?: string
) {
  if (!f) return;
  return function (...args: any) {
    let style = {};
    if (width) {
      const property = isAutoWidth ? 'minWidth' : 'width';
      style = {
        [property]: width,
        display: 'block',
        overflow: 'hidden',
      };
      if (align) {
        style = { ...style, float: align };
      }
    }
    return <span style={style}>{f(...args)}</span>;
  };
}

interface IColumnCustomTable extends ColumnType<RecordType> {
  isAutoWidth: boolean;
}

function convertColumn(column: IColumnCustomTable) {
  column.sortIcon = column.sorter ? renderSortIcon : undefined;
  column.render = wrapWithWidth(
    column.render,
    column.isAutoWidth,
    column.width,
    column.align
  );
  return column;
}

interface IWapperTable extends TableProps<any> {
  fixedWidth?: true;
}

const WapperTable = forwardRef((props: IWapperTable, ref?: any) => {
  const { width } = useWindowSize();
  const { fixedWidth } = props;
  const columns = get(props, 'columns', []);
  const totalWidth = sumBy(columns, (c: any) => {
    return c.width ?? 0;
  });
  const isAutoWidth = !fixedWidth ? totalWidth < width - 100 : false;

  const columnsConvert = columns.map((column) => {
    return convertColumn({ ...column, isAutoWidth });
  });

  return (
    <div className='common-table'>
      <Table
        ref={ref}
        {...props}
        columns={columnsConvert}
        scroll={{ x: 'max-content' }}
        showSorterTooltip={false}
      />
    </div>
  );
});

export default memo(WapperTable);
