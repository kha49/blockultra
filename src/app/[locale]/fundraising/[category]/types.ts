type TLaunchpad = {
  avatarUrl: string;
  name: string;
  // more
};

type IProject = {
  name: string;
  icon: string;
  tag: string;
  isHot: boolean;
};

export type IBacker = {
  image: string;
  name: string;
  group: string;
};

export type IFundingRoundsData = {
  project: IProject;
  date: string;
  amountRaised: number;
  round: string;
  valuation: number;
  backers: IBacker[];
  category: string;
};

export type ITopBackerData = {
  name: {
    name: string;
    icon: string;
  };
  tier: number;
  type: string;
  country: string;
  investments: number;
  marketCap: {
    value: number;
    ratio: number;
  };
  resources: {
    icon: string;
  }[];

  gainers: number;
};
export type IIeoIdoData = {
  project: IProject;
  initialCap: number;
  totalRaise: number;
  backers: any[];
  category: string;
  launchpadList: TLaunchpad[];
  startedDate: string;
};
