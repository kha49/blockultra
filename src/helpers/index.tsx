import { IconDown } from '@/assets/icons/home/IconDown';
import { IconUp } from '@/assets/icons/home/IconUp';
import { Tooltip } from 'antd';
import { round } from 'lodash';
import { ColumnType } from 'antd/es/table/interface';

interface IoptionCurrencyFormat {
  isAutoZero?: boolean;
  numberRound?: number;
  addToolTip?: boolean;
}

export const sleep = (time: number) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export const renderSortIcon = (props: any) => {
  if (!props.sortOrder) return <></>;
  return props.sortOrder === 'ascend' ? <IconUp /> : <IconDown />;
};

export const currencyFormat = (
  value: number,
  currencySymbol: string,
  options?: IoptionCurrencyFormat
) => {
  if (!value) return 0;
  if (value > 1000) {
    return nFormatter(value, 2, currencySymbol);
  }

  let price = 0;
  let roundNumber = options?.numberRound ?? 2;
  do {
    price = round(value, roundNumber);

    if (price === 0) {
      roundNumber += 1;
    }
  } while (price === 0);

  const priceFomat = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: roundNumber,
  })
    .format(round(price, roundNumber))
    .replace('$', '');

  if (priceFomat.length >= 7 && value < 1) {
    return tooltipMaxLength(priceFomat, currencySymbol);
  }

  return (
    <span className='whitespace-nowrap'>
      {`${currencySymbol}${priceFomat}`}
    </span>
  );
};

export const percentFormat = (value: number, className?: string) => {
  if (!value) {
    value = 0;
  }
  try {
    const roundValue = round(value, 2);
    let textStyle = 'text-gray-10';
    if (roundValue === 0) {
      textStyle = 'text-gray-500';
    } else if (roundValue > 0) {
      textStyle = 'text-sp-green-500';
    } else {
      textStyle = 'text-red-500';
    }

    return (
      <p className={`${textStyle} whitespace-nowrap ${className}`}>
        {value >= 0 ? '+' : ''}
        {roundValue !== 0 ? roundValue : '0.00'}%
      </p>
    );
  } catch (error) {
    return 'N/A';
  }
};

export const percentFormat2 = (value: number, className?: string) => {
  if (!value) {
    return '-';
  }
  try {
    const roundValue = round(value, 2);
    let textStyle = 'text-gray-10';
    if (roundValue === 0) {
      textStyle = 'text-gray-500';
    } else if (roundValue > 0) {
      textStyle = 'text-sp-green-500';
    } else {
      textStyle = 'text-red-500';
    }

    return (
      <p className={`${textStyle} whitespace-nowrap ${className}`}>
        {value >= 0 ? '+' : ''}
        {roundValue !== 0 ? roundValue : '0.00'}%
      </p>
    );
  } catch (error) {
    return 'N/A';
  }
};

export const nFormatter = (
  num: number,
  digits: number,
  symbol: string,
  positionSymbolEnd?: boolean
) => {
  if (!num) {
    return 0;
  }
  const lookup = [
    { value: 1, symbol: '' },
    { value: 1e3, symbol: 'K' },
    { value: 1e6, symbol: 'M' },
    { value: 1e9, symbol: 'B' },
    { value: 1e12, symbol: 'T' },
    { value: 1e15, symbol: 'P' },
    { value: 1e18, symbol: 'E' },
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var item = lookup
    .slice()
    .reverse()
    .find(function (item) {
      return num >= item.value;
    });
  const price = item
    ? (num / item.value).toFixed(digits).replace(rx, '$1') + item.symbol
    : '0';
  return (
    <span className='whitespace-nowrap'>
      {positionSymbolEnd ? price + symbol : symbol + price}
    </span>
  );
};

export const nFormatter2 = (
  num: number,
  digits: number,
  symbol: string,
  positionSymbolEnd?: boolean
) => {
  if (!num) {
    return '-';
  }
  const lookup = [
    { value: 1, symbol: '' },
    { value: 1e3, symbol: 'K' },
    { value: 1e6, symbol: 'M' },
    { value: 1e9, symbol: 'B' },
    { value: 1e12, symbol: 'T' },
    { value: 1e15, symbol: 'P' },
    { value: 1e18, symbol: 'E' },
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var item = lookup
    .slice()
    .reverse()
    .find(function (item) {
      return num >= item.value;
    });
  const price = item
    ? (num / item.value).toFixed(digits).replace(rx, '$1') + item.symbol
    : '0';
  return (
    <span className='whitespace-nowrap'>
      {positionSymbolEnd ? price + symbol : symbol + price}
    </span>
  );
};

export const secondsToHms = (d: number | string) => {
  d = Number(d);
  var h = Math.floor(d / 3600);
  var m = Math.floor((d % 3600) / 60);
  var s = Math.floor((d % 3600) % 60);

  var hDisplay = h > 0 ? h + (h == 1 ? ' hour, ' : ' hours, ') : '';
  var mDisplay = m > 0 ? m + ' min ' : '';
  var sDisplay = s > 0 ? s + ' sec ' : '';
  return hDisplay + mDisplay + sDisplay;
};

export const renderRangePaging = (
  page: number,
  pageSize: number,
  dataLength: number,
  total: number
) => {
  const start = (page - 1) * pageSize + 1;
  const end = start + dataLength - 1;
  return (
    <span className='table-total'>
      {start} - {end} from {total}
    </span>
  );
};

export const fancyTimeFormat = (duration: number) => {
  // Hours, minutes and seconds
  const hrs = ~~(duration / 3600);
  const mins = ~~((duration % 3600) / 60);
  const secs = ~~duration % 60;

  return {
    hrs,
    mins,
    secs,
  };
};

export * from './countryFlag';

export const convertNumberToThreeDot = (num: any) => {
  let formattedNumber = '';
  const numConvert = num?.toString() || '0';
  if (numConvert.length < 7) {
    formattedNumber = round(num, 4).toString();
  } else {
    const start = numConvert.slice(0, 3);
    const end = numConvert.slice(numConvert.length - 3, numConvert.length);
    formattedNumber = start.concat('...').concat(end);
  }
  return (
    <Tooltip title={num}>
      <span>${formattedNumber}</span>
    </Tooltip>
  );
};

export const tooltipMaxLength = (value: string | number, symbol: string) => {
  value = value.toString();
  if (value.length < 7) return value;
  const start = value.slice(0, 3);
  const end = value.slice(value.length - 3, value.length);
  const tooltipData = start.concat('...').concat(end);
  return (
    <Tooltip title={value.toString()}>
      <span className='whitespace-nowrap'>{`${symbol}${tooltipData}`}</span>
    </Tooltip>
  );
};

export const getIndexTable = (page: number, pageSize: number, index: number) =>
  (+page - 1) * +pageSize + index + 1;

export const renderColumnId = <T = any,>(
  props?: Partial<ColumnType<T>>
): Partial<ColumnType<T>> => {
  const { key = '_index', title = '#' } = props || {};
  return {
    key,
    title,
    width: 24,
    align: 'left',
    fixed: true,
    render: (value) => value._index,
  };
};
