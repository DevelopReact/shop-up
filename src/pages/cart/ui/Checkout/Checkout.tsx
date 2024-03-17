// react
import { FC } from 'react';
//ui
import { Button } from '@/shared/ui/Button';
// styles
import styles from './Checkout.module.scss';

interface CheckoutProps {}

export const Checkout: FC<CheckoutProps> = ({}) => {
  return (
    <div className={styles.checkout}>
      <div className={styles.titleCheckout}>
        <p>Cart Total</p>
      </div>
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
      <div className={styles.buttonTotalCart}>
        <Button
          type='button'
          backgroundColor='accent'
          textColor='white'
          height='large'
        >
          Process to checkout
        </Button>
      </div>
    </div>
  );
};
