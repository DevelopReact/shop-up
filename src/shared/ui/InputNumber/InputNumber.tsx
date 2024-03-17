// react
import { FC, useState } from 'react';
//libs
import ArrowUp from '@/shared/libs/assets/svg/ArrowUp.svg?react';
import ArrowDown from '@/shared/libs/assets/svg/ArrowDown.svg?react';
// styles
import styles from './InputNumber.module.scss';

interface InputNumberProps {}

export const InputNumber: FC<InputNumberProps> = ({}) => {
  const [value, setValue] = useState(0);

  const increaseValue = () => setValue(value + 1);

  const decreaseValue = () => {
    if (value === 0) {
      return;
    }
    setValue(value - 1);
  };

  return (
    <div className={styles.inputWrapper}>
      <input
        type='number'
        className={styles.InputNumber}
        value={value < 10 ? `0${value}` : value}
      />
      <div className={styles.arrowsWrapper}>
        <ArrowUp className={styles.arrow} onClick={increaseValue} />
        <ArrowDown className={styles.arrow} onClick={decreaseValue} />
      </div>
    </div>
  );
};
