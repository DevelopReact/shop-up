// react
import { FC } from 'react';
import { Button } from '@/shared/ui/Button';
// styles
import styles from './CartClearButton.module.scss';

interface CartClearButtonProps {}

export const CartClearButton: FC<CartClearButtonProps> = ({}) => {
  const onClearCart = () => {};

  return (
    <div className={styles.CartClearButton}>
      <Button
        type='button'
        backgroundColor='white'
        borderColor='blackOpacity'
        height='medium'
        onClick={onClearCart}
      >
        Clear Cart
      </Button>
    </div>
  );
};
