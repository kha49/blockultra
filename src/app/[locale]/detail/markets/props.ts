interface IMarket {
  exchange: IExchange;
  tier: number;
  paid: number;
  price: number;
  volume24h: number;
  ms: string;
}

interface IExchange {
  name: string;
  img: string;
}
