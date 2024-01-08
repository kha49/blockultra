interface ITokenomics {
  id: number;
  round: IRound;
  allowcationPercent: string;
  allowcationToken: string;
  tgeUnlock: string;
  tokenReleaseSchedule: string;
}

interface IRound {
  color: string;
  label: string;
}
