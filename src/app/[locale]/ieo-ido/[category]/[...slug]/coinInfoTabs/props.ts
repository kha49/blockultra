import { UUID } from 'crypto';
import { AppLinks } from 'next/dist/lib/metadata/types/extra-types';
import { Url } from 'next/dist/shared/lib/router/router';
import { UrlObject } from 'url';

export interface ICoinInfo {
  allocation: CoinAllocation[];
  country: string;
  created_at: string;
  currenciesCount: string;
  dataChart: DataChart;
  icon: string;
  id: number;
  isPromoted: boolean;
  key: string;
  links: Link[];
  name: string;
  nativeCoinKey: string;
  num: string;
  openInterest: string;
  pairsCount: string;
  percentVolume: string;
  reportedVolumes: Volume;
  reserves: number;
  tokenPlatforms: [];
  totalusdVolume: number;
  updated_at: string;
  volumes: Volume;
  _group: string;
  _id: string;
}

export interface CoinAllocation {
  changePercent: number;
  coinKey: string;
  coinName: string;
  exchangePercentVolume: number;
  percentUsdVolume: number;
  symbol: string;
  usdLast: number;
  usdVolume: number;
}
interface DataChart {
  openInterests: [];
  timestamps: [];
  volumes: number[];
}

interface Volume {
  day: ToOtherTypeCoin;
  week: ToOtherTypeCoin;
  month: ToOtherTypeCoin;
}

interface ToOtherTypeCoin {
  toBTC: number;
  toETH: number;
  toUSD: number;
}

interface Link {
  type: string;
  value: string;
}
