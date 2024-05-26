// react
import { FC } from 'react';
import { useSelector } from 'react-redux';
//selectors
import { getUserState } from '@/entities/user';
import { getQuestState } from '@/entities/quest';
//types
import { IProduct } from '@/entities/product';
// styles
import styles from './CartTotal.module.scss';

interface CartTotalProps {}

export const CartTotal: FC<CartTotalProps> = ({}) => {
  const { user, isLoggedIn } = useSelector(getUserState);
  const { quest } = useSelector(getQuestState);

  const currentUser = isLoggedIn ? user : quest;

  const countPriceWithDiscount = (
    price: number,
    discountPercent: number,
    quantity: number
  ) => {
    if (!discountPercent) {
      discountPercent = 1;
    }
    const priceWithDiscount = Math.round(
      price - (price * discountPercent) / 100
    );
    return priceWithDiscount * quantity;
  };

  const totalPriceProductsCart = currentUser.products?.reduce(
    (a: number, b: IProduct) =>
      a +
      countPriceWithDiscount(
        b.attributes.price,
        b.attributes.discountPercent,
        b.attributes.quantity!
      ),
    0
  );

  return (
    <div className={styles.mainTotalCart}>
      <div className={styles.rowTotalCart}>
        <span>Subtotal:</span>
        <span>{totalPriceProductsCart}</span>
      </div>
      <div className={styles.rowTotalCart}>
        <span>Shipping:</span>
        <span>Free</span>
      </div>
      <div className={styles.rowTotalCart}>
        <span>Total:</span>
        <span>{totalPriceProductsCart}</span>
      </div>
    </div>
  );
};
