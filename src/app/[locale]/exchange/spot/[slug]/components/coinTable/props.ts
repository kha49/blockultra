export interface ICoinTable {
  key: string;
  logo: string;
  name: string;
  pair: string;
  price: number;
  priceChangeIn24h: number;
  rate: string;
  ticker: string;
  volume: number;
  volumeChangeIn24h: number;
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
