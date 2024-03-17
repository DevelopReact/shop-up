// react
import { FC } from 'react';
// styles
import styles from './Discount.module.scss';

interface DiscountProps {
  discount?: string;
}

export const Discount: FC<DiscountProps> = ({ discount }) => {
	if (discount == undefined || !parseInt(discount) || +discount === 0) {
		return null
	}
  return (
    <div className={styles.Discount}>
      <p>{`-${discount}%`}</p>
    </div>
  );
};
