export interface IExchangeSpot {
  _id: string;
  country: string;
  currenciesCount: string;
  dataChart: DataChart;
  icon: string;
  key: string;
  name: string;
  percentVolume: number;
  tier: string;
  volumn24h: number;
  volumn24hPercent: number;
}

export interface DataChart {
  openInterests: [];
  timestamps: [];
  volumes: number[];
}
