import { IconStar } from '@/assets/icons';
import Link from 'next/link';
import { ReactNode, useEffect } from 'react';
import './style.scss';
import { Pagination, Table } from 'antd';
import type { PaginationProps } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { FetchCoins } from '../../../usecases/home';

interface IData {
  id: number;
  name: ReactNode | string;
  rate: string;
  price: string;
  period: string;
  volume: string;
  marketCap: string;
  graph: string;
}

const columns: ColumnsType<IData> = [
  {
    key: 'id',
    title: '#',
    width: 56,
    align: 'left',
    render: (_, value) => {
      return value.id;
    },
  },
  {
    key: 'name',
    title: 'Name',
    width: 248,
    align: 'left',
    render: (_, value) => {
      return value.name;
    },
  },
  {
    key: 'rate',
    title: 'Rate',
    width: 91,
    align: 'left',
    render: (_, value) => {
      return (
        <p className='inline-flex items-center'>
          <span className='mr-1'>{value.rate}</span> <IconStar />
        </p>
      );
    },
  },
  {
    key: 'price',
    title: 'Price',
    width: 151,
    align: 'right',
    render: (_, value) => {
      return value.price;
    },
  },
  {
    key: 'period',
    title: '24h %',
    width: 167,
    align: 'right',
    render: (_, value) => {
      return (
        <p
          style={{ color: value.graph === 'increase' ? '#1AB369' : '#FA3363' }}
        >
          {value.period}
        </p>
      );
    },
  },
  {
    key: 'volume',
    title: 'Volume (24h)',
    width: 186,
    align: 'right',
    render: (_, value) => {
      return value.volume;
    },
  },
  {
    key: 'marketCap',
    title: 'Market Cap',
    width: 168,
    align: 'right',
    render: (_, value) => {
      return value.marketCap;
    },
  },
  {
    key: 'graph',
    title: 'Price Graph (7d)',
    width: 261,
    align: 'right',
    render: (_, value) => {
      return value.graph === 'increase' ? (
        <div className='flex items-center justify-end'>
          <svg
            width='138'
            height='42'
            viewBox='0 0 138 42'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M14.0787 21.8297L6.32128 39.7929C6.00488 40.5256 5.28322 41 4.48518 41H135C136.105 41 137 40.1046 137 39V36.2075C137 35.103 136.105 34.2075 135 34.2075H134.313C133.516 34.2075 132.795 33.7344 132.478 33.0032L126.212 18.5532C125.953 17.9577 125.422 17.5246 124.787 17.3914L119.412 16.2645C118.892 16.1556 118.437 15.8444 118.147 15.3997L114.101 9.19742C113.258 7.90503 111.331 8.0137 110.639 9.39268L105.444 19.7382C105.164 20.2956 104.64 20.6905 104.028 20.8061L97.6374 22.0118C97.2231 22.09 96.7947 22.0352 96.4133 21.8554L84.8449 16.3985C84.4278 16.2018 84.0916 15.867 83.893 15.4507L77.8573 2.79736C77.3832 1.80345 76.1949 1.37976 75.199 1.84955L69.7201 4.43391C69.2577 4.65204 68.8964 5.03898 68.7104 5.51523L63.7082 18.3239C63.5112 18.8284 63.118 19.2314 62.6186 19.4408L56.4313 22.0351C56.2777 22.0995 56.1328 22.1828 55.9998 22.2832L49.3667 27.2893C48.6718 27.8137 47.7175 27.8284 47.0067 27.3255L43.1366 24.5872C42.3592 24.0372 41.3017 24.1116 40.609 24.7651L36.5264 28.6166C35.8632 29.2422 34.8609 29.3402 34.0892 28.8548L21.4881 20.9296C21.1692 20.7291 20.8001 20.6226 20.4234 20.6226H15.9148C15.1168 20.6226 14.3951 21.0971 14.0787 21.8297Z'
              fill='url(#paint0_linear_379_50999)'
            />
            <path
              d='M1 41H4.48518C5.28322 41 6.00488 40.5256 6.32128 39.7929L14.0787 21.8297C14.3951 21.0971 15.1168 20.6226 15.9148 20.6226H20.4234C20.8001 20.6226 21.1692 20.7291 21.4881 20.9296L34.0892 28.8548C34.8609 29.3402 35.8632 29.2422 36.5264 28.6166L40.609 24.7651C41.3017 24.1116 42.3592 24.0372 43.1366 24.5872L47.0067 27.3255C47.7175 27.8284 48.6718 27.8137 49.3667 27.2893L55.9998 22.2832C56.1328 22.1828 56.2777 22.0995 56.4313 22.0351L62.6186 19.4408C63.118 19.2314 63.5112 18.8284 63.7082 18.3239L68.7104 5.51523C68.8964 5.03898 69.2577 4.65204 69.7201 4.43391L75.199 1.84955C76.1949 1.37976 77.3832 1.80345 77.8573 2.79736L83.893 15.4507C84.0915 15.867 84.4278 16.2018 84.8449 16.3985L96.4133 21.8554C96.7947 22.0352 97.2231 22.09 97.6374 22.0118L104.028 20.8061C104.64 20.6905 105.164 20.2956 105.444 19.7382L110.639 9.39268C111.331 8.0137 113.258 7.90503 114.101 9.19742L118.147 15.3997C118.437 15.8445 118.892 16.1556 119.412 16.2645L124.787 17.3914C125.422 17.5246 125.953 17.9577 126.212 18.5532L132.478 33.0032C132.795 33.7344 133.516 34.2075 134.313 34.2075H137'
              stroke='#1AB369'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
            <defs>
              <linearGradient
                id='paint0_linear_379_50999'
                x1='69.8'
                y1='-72.2076'
                x2='69.088'
                y2='41.0006'
                gradientUnits='userSpaceOnUse'
              >
                <stop stopColor='#45B36B' />
                <stop offset='1' stopColor='#45B36B' stopOpacity='0' />
              </linearGradient>
            </defs>
          </svg>
        </div>
      ) : (
        <div className='flex items-center justify-end'>
          <svg
            width='138'
            height='41'
            viewBox='0 0 138 41'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M137 40H133.096C132.526 40 131.983 39.757 131.604 39.332L124.071 30.8951C123.84 30.6362 123.546 30.4418 123.217 30.3313L116.64 28.1205C116.403 28.0409 116.153 28.0064 115.903 28.0188L104.136 28.603C103.23 28.648 102.408 28.0783 102.132 27.2148L98.3261 15.3179C97.7541 13.5298 95.2561 13.4439 94.5626 15.1885L90.497 25.4162C90.1057 26.4008 89.0145 26.9093 88.0089 26.5758L81.75 24.5L75.1014 21.6119C74.9305 21.5377 74.7708 21.4399 74.6269 21.3214L67.6021 15.5363C66.8695 14.933 65.8137 14.9276 65.075 15.5236L59.3875 20.1118C59.074 20.3647 58.6914 20.517 58.2899 20.5489L51.0507 21.1231C50.9766 21.129 50.9053 21.1544 50.8442 21.1967V21.1967C50.6206 21.3515 50.3112 21.2572 50.2121 21.004L47.1275 13.1241C46.8569 12.4328 46.2256 11.9482 45.4878 11.8656L25.0013 9.57017C24.5936 9.5245 24.1818 9.60527 23.8216 9.80153L14.547 14.8552C14.3708 14.9512 14.1813 15.0201 13.9846 15.0597L7.79269 16.3059C6.9167 16.4822 6.26393 17.2182 6.19352 18.109L5.14563 31.3652C5.06341 32.4054 4.1953 33.2075 3.15185 33.2075H1'
              stroke='#FA3363'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
            <path
              d='M133.096 40H137L3.00735 40.4926C1.89992 40.4967 1 39.6001 1 38.4926V35.2075C1 34.103 1.89543 33.2075 3 33.2075H3.15186C4.19531 33.2075 5.06342 32.4054 5.14565 31.3652L6.19351 18.109C6.26393 17.2182 6.9167 16.4822 7.79269 16.3059L13.9846 15.0597C14.1813 15.0201 14.3708 14.9512 14.547 14.8552L23.8216 9.80153C24.1818 9.60527 24.5936 9.5245 25.0013 9.57017L45.5669 11.8744C46.2625 11.9524 46.8667 12.3883 47.1601 13.0238L48.8125 16.6038L50.3492 19.8785C50.7031 20.6326 51.4875 21.0885 52.3179 21.0226L58.2899 20.5489C58.6914 20.517 59.074 20.3647 59.3875 20.1118L65.075 15.5236C65.8137 14.9276 66.8695 14.933 67.6021 15.5363L74.6269 21.3214C74.7708 21.4399 74.9305 21.5377 75.1014 21.6119L81.75 24.5L87.9913 26.57C89.0041 26.9058 90.1021 26.3876 90.4866 25.3923L94.557 14.854C95.2397 13.0866 97.7686 13.1708 98.3321 14.9798L102.11 27.1054C102.394 28.0194 103.287 28.6035 104.239 28.4985L115.741 27.2294C116.095 27.1904 116.453 27.2465 116.777 27.392L123.329 30.3254C123.586 30.4405 123.816 30.6086 124.003 30.8188L131.604 39.332C131.983 39.757 132.526 40 133.096 40Z'
              fill='url(#paint0_linear_379_51011)'
            />
            <defs>
              <linearGradient
                id='paint0_linear_379_51011'
                x1='68.2'
                y1='-47.2359'
                x2='68.6277'
                y2='40.5018'
                gradientUnits='userSpaceOnUse'
              >
                <stop stopColor='#EF466F' />
                <stop offset='1' stopColor='#EF466F' stopOpacity='0' />
              </linearGradient>
            </defs>
          </svg>
        </div>
      );
    },
  },
];

const data: IData[] = [
  {
    id: 1,
    name: (
      <div className='flex items-center'>
        <svg
          width='32'
          height='32'
          viewBox='0 0 32 32'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <g clipPath='url(#clip0_596_42130)'>
            <path
              d='M16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32Z'
              fill='#F3BA2F'
            />
            <path
              d='M12.116 14.404L16 10.52L19.886 14.406L22.146 12.146L16 6L9.856 12.144L12.116 14.404ZM6 16L8.26 13.74L10.52 16L8.26 18.26L6 16ZM12.116 17.596L16 21.48L19.886 17.594L22.146 19.853L16 26L9.856 19.856L9.853 19.853L12.116 17.596ZM21.48 16L23.74 13.74L26 16L23.74 18.26L21.48 16ZM18.292 15.998H18.294V16L16 18.294L13.709 16.004L13.705 16L13.709 15.997L14.11 15.595L14.305 15.4L16 13.706L18.293 15.999L18.292 15.998Z'
              fill='white'
            />
          </g>
          <defs>
            <clipPath id='clip0_596_42130'>
              <rect width='32' height='32' fill='white' />
            </clipPath>
          </defs>
        </svg>
        <Link href='/detail' className='mx-2'>
          Bitcoin
        </Link>
        <span className='px-2 bg-[#EEF2F6] text-[#9FA4B7] leading-5'>BTC</span>
      </div>
    ),
    rate: '4,8',
    price: '$12.168',
    period: '+5.63%',
    volume: '$345.65B',
    marketCap: '$345.65B',
    graph: 'increase',
  },
];

const AllCoin = () => {
  const showTotal: PaginationProps['showTotal'] = (total) =>
    `Total ${total} items`;

  function getCoins() {
    FetchCoins().then((res: any) => {
      console.log(res);
    });
  }

  useEffect(() => {
    getCoins();
  }, []);

  return (
    <div className='home-table'>
      <div className='p-6'>
        <div className='overflow-x-auto'>
          <Table
            columns={columns}
            dataSource={data}
            pagination={{ position: ['none'] }}
            rowKey='id'
          />
          <div className='p-6 flex items-center justify-center'>
            <Pagination
              total={500}
              showTotal={showTotal}
              showSizeChanger
              showQuickJumper
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllCoin;
