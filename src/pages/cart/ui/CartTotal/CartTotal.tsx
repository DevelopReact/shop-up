// react
import { FC } from 'react';
// styles
import styles from './CartTotal.module.scss';

interface CartTotalProps {}

export const CartTotal: FC<CartTotalProps> = ({}) => {
  return (
    <div className={styles.mainTotalCart}>
      <div className={styles.rowTotalCart}>
        <span>Subtotal:</span>
        <span>$1750</span>
      </div>
      <div className={styles.rowTotalCart}>
        <span>Shipping:</span>
        <span>Free</span>
      </div>
      <div className={styles.rowTotalCart}>
        <span>Total:</span>
        <span>$1750</span>
      </div>
    </div>
  );
};
