import TokenomicsInfo from './info/TokenomicsInfo';
import TokenAllocation from './token';

export default function Tokenomics() {
  return (
    <div className='tokenomics fade-top'>
      <TokenomicsInfo />
      <TokenAllocation />
    </div>
  );
}
