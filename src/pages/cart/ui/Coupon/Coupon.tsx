// react
import { FC } from 'react';
//ui
import { Button } from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';
// styles
import styles from './Coupon.module.scss';

interface CouponProps {}

export const Coupon: FC<CouponProps> = ({}) => {
  return (
    <div className={styles.coupon}>
      <div className={styles.couponInput}>
        <Input type='text' placeholder='Coupon Code' backgroundColor='white' />
      </div>
      <div className={styles.couponButton}>
        <Button
          type='button'
          backgroundColor='accent'
          textColor='white'
          height='large'
        >
          Apply Coupon
        </Button>
      </div>
    </div>
  );
};
