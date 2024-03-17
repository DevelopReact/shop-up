// react
import { FC } from 'react';
//ui
import { CartClearButton } from '../CartClearButton/CartClearButton';
import { Coupon } from '../Coupon/Coupon';
import { ProductsList } from '..//ProductsList/ProductsList';
import { Button } from '@/shared/ui/Button';
// styles
import styles from './Cart.module.scss';
import { Checkout } from '../Checkout/Checkout';

interface CartProps {}

export const Cart: FC<CartProps> = ({}) => {
  const onNavigateToShop = () => {};

  return (
    <div className={styles.Cart}>
      <div className={styles.headerAccount}>
        <div className={styles.roadMap}>
          <p>Home&nbsp;/&nbsp;</p>
          <span>Cart</span>
        </div>
      </div>
      <div className={styles.tableCart}>
        <div className={styles.rowTableCart}>
          <div className={styles.column}>Product</div>
          <div className={styles.column}>Price</div>
          <div className={styles.column}>Quantity</div>
          <div className={styles.column}>Subtotal</div>
        </div>
        <ProductsList />
        <div className={styles.buttonsTableCart}>
          <div className={styles.buttonCart}>
            <Button
              type='button'
              backgroundColor='white'
              borderColor='blackOpacity'
              height='medium'
              onClick={onNavigateToShop}
            >
              Return To Shop
            </Button>
          </div>
          <CartClearButton />
        </div>
      </div>
      <div className={styles.footerCart}>
        <Coupon />
        <Checkout />
      </div>
    </div>
  );
};
