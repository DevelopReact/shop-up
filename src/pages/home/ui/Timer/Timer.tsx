// react
import { FC } from 'react';
//hooks
import { useTimer } from '@/shared/libs/hooks/useTimer';
// styles
import styles from './Timer.module.scss';

interface TimerProps {}

export const Timer: FC<TimerProps> = ({}) => {
  const { days, hours, minutes, seconds } = useTimer();

  return (
    <div className={styles.Timer}>
      <div className={styles.date}>
        <p>Days</p>
        <span>{days}</span>
      </div>
      <div className={styles.colon}>
        <div className={styles.dot}></div>
        <div className={styles.dot}></div>
      </div>
      <div className={styles.date}>
        <p>Hour</p>
        <span>{hours < 10 ? '0' + hours : hours}</span>
      </div>
      <div className={styles.colon}>
        <div className={styles.dot}></div>
        <div className={styles.dot}></div>
      </div>
      <div className={styles.date}>
        <p>Minutes</p>
        <span>{minutes < 10 ? '0' + minutes : minutes}</span>
      </div>
      <div className={styles.colon}>
        <div className={styles.dot}></div>
        <div className={styles.dot}></div>
      </div>
      <div className={styles.date}>
        <p>Seconds</p>
        <span>{seconds < 10 ? '0' + seconds : seconds}</span>
      </div>
    </div>
  );
};
