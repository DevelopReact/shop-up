// react
import { FC } from 'react';
// styles
import styles from './Discount.module.scss';

interface DiscountProps {
  discount?: number;
}

export const Discount: FC<DiscountProps> = ({ discount }) => {
  if (discount == undefined || discount === 0) {
    return null;
  }
  return (
    <div className={styles.Discount}>
      <p>{`-${discount}%`}</p>
    </div>
  );
};
