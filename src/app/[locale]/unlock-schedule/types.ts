export type TTopCoin = {
  icon: string;
  name: string;
  money: string;
  date: string;
};

export type TUnlockTime = {
  title: string;
  money: string;
  coins: TTopCoin[];
};

type TLaunchpad = {
  avatarUrl: string;
  // more
};

export type IUnlockData = {
  name: string;
  price: number;
  marketCap: number;
  launchpadList: TLaunchpad[];
  roi: number;
  process: {
    total: number;
    lock: {
      ratio: number;
      name: string;
      value: number;
    };
    unlock: {
      ratio: number;
      name: string;
      value: number;
    };
  };
  nextUnlock: {
    value: number;
    ratio: number;
    name: string;
    time: {
      d: number;
      h: number;
      m: number;
    };
  };
};
