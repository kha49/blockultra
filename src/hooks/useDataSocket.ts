import { socket } from '@/helpers/socketClient';
import { cloneDeep, isArray, isEmpty, isEqual, isObject, merge } from 'lodash';
import { useCallback, useEffect, useState } from 'react';

export const useDataSocket = <T>(eventName: string) => {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [data, setData] = useState<T | null>(null);
  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }
    function onDisconnect() {
      setIsConnected(false);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on(eventName, setStateData);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off(eventName);
    };
  }, []);

  const setStateData = (newData: T | T[]) => {
    setData((preData) => {
      if (!preData) return preData;

      const newState = compareData(preData, newData);
      return newState ?? preData;
    });
  };
  const compareData = (preData: T | T[], newData: T | T[]) => {
    let newState = null;
    if (isEmpty(newData)) return null;

    if (isObject(preData) && !isArray(preData)) {
      const dataClone = merge(data, newData);
      if (!isEqual(dataClone, preData)) {
        newState = cloneDeep(dataClone);
      }
    }

    if (isArray(preData) && isObject(newData)) {
      const dataClone: any = cloneDeep(preData).map((dt: any) => {
        const objectCheck = newData[dt.key];
        if (!objectCheck) return dt;
        return merge(dt, objectCheck);
      });
      if (!isEqual(dataClone, preData)) {
        newState = cloneDeep(dataClone);
      }
    }
    return newState;
  };

  return {
    data,
    isConnected,
    setDefaultData: (dt: T | null) => setData(dt),
  };
};
