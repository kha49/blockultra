import { IconDown } from '@/assets/icons/home/IconDown';
import { IconUp } from '@/assets/icons/home/IconUp';
import { round } from 'lodash';

export const sleep = (time: number) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export const renderSortIcon = (props: any) => {
  if (!props.sortOrder) return null;
  console.log(props.sortOrder);
  return props.sortOrder === 'ascend' ? <IconUp /> : <IconDown />;
};

export const currencyFormat = (value: number, currencySymbol: string) => {
  const price = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  })
    .format(round(value, 2))
    .replace('$', '');
  return (
    <span className='whitespace-nowrap'>
      {currencySymbol} {price}
    </span>
  );
};

export const percentFormat = (value: number, className?: string) => {
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

export const nFormatter = (num: number, digits: number, symbol: string) => {
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
      {symbol} {price}
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
