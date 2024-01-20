'use client';
import { FetchUnlockToken } from '@/usecases/coin-info';
import Progress from './progress/Progress';
import Schedule from './schedule/Schedule';
import { useState, useEffect } from 'react';

const Unlock = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    fetchUnlock();
  }, []);

  async function fetchUnlock() {
    let data = await FetchUnlockToken({ coin_key: 'avalanche' });
    setData(data);
  }

  return (
    <div>
      <Progress data={data} />
      <Schedule data={data} />
    </div>
  );
};

export default Unlock;
