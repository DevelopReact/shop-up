// react
import { FC } from 'react';
import { useNavigate } from 'react-router';
//ui
import { CartClearButton } from '../CartClearButton';
import { Coupon } from '../Coupon';
import { CartItemList } from '../CartItemList';
import { Button } from '@/shared/ui/Button';
import { CartTotal } from '../CartTotal';
//libs
import { getCheckOutRoute } from '@/shared/libs/constants/routes';
// styles
import styles from './Cart.module.scss';

interface CartProps {}

export const Cart: FC<CartProps> = ({}) => {
  const navigate = useNavigate();

  const onNavigateToCheckOut = () => {
    navigate(`${getCheckOutRoute()}`);
    window.scrollTo(0, 0);
  };

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
        <CartItemList />
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
        <div className={styles.CartTotal}>
          <div className={styles.titleCartTotal}>
            <p>Cart Total</p>
          </div>
          <CartTotal />
          <div className={styles.buttonTotalCart}>
            <Button
              type='button'
              backgroundColor='accent'
              textColor='white'
              height='large'
              onClick={onNavigateToCheckOut}
            >
              Process to checkout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
