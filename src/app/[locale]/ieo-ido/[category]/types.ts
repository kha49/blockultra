type TLaunchpad = {
  image: string;
  name: string;
  key: string;
};

type IProject = {
  name: string;
  icon: string;
  tag: string;
  isHot: boolean;
};

type IBanker = {
  image: string;
  key: string;
  name: string;
  tier: number
};

export type IUnlockData = {
  name: {
    displayName: string;
    icon: string;
    tag: string;
  };
  price: {
    ratio: number;
    value: number;
  };
  marketCap: number;
  launchpadList: TLaunchpad[];
  roi: number;
  process: {
    value: number;
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

export type IIeoIdoData = {
  project: IProject;
  initialCap: number;
  totalRaise: number;
  backers: IBanker[];
  category: string;
  launchpadList: TLaunchpad[];
  startedDate: string;
};
