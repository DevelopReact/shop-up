import { useEffect, useState } from 'react';
//libs
import {
  getDay,
  getHours,
  getMinutes,
  getSeconds
} from '@/shared/libs/constants/date';

export const useTimer = () => {
  const [days, setDays] = useState(getDay());
  const [hours, setHours] = useState(getHours());
  const [minutes, setMinutes] = useState(getMinutes());
  const [seconds, setSeconds] = useState(getSeconds());
  //timer for flash sales section
  const getTime = () => {
    setDays(getDay());
    setHours(getHours());
    setMinutes(getMinutes());
    setSeconds(getSeconds());
  };

  useEffect(() => {
    const interval = setInterval(() => getTime(), 1000);

    return () => clearInterval(interval);
  }, []);

  return {
    days,
    hours,
    minutes,
    seconds
  };
};
