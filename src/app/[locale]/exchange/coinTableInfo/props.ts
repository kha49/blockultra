export interface ICoinTable {
  _id: string;
  created_at: string;
  updated_at: string;
  id: string;
  symbol: string;
  from: string;
  to: string;
  fromCoin: Coin;
  toCoin: Coin;
  last: number;
  usdLast: number;
  coinName: string;
  coinKey: string;
  url: string;
  hasHistory: boolean;
  exchangeKey: string;
  exchangeName: string;
  exchangeIcon: string;
  exchangeGroup: string;
  exchangeRefText: string;
  exchangeRefLink: string;
  high: number;
  low: number;
  open: number;
  close: number;
  bid: number;
  ask: number;
  baseVolume: number;
  usdVolume: number;
  btcVolume: number;
  change: number;
  changePercent: number;
  spread: number;
  exchangePercentVolume: number;
}

export interface ISearchFilter {
  key: string;
  name: string;
  image: Image;
}

interface Image {
  native: string;
  icon: string;
  x60: string;
  x150: string;
}

interface Coin {
  key: string;
  symbol: string;
  name: string;
}
