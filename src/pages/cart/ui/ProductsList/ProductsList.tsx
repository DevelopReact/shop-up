// react
import { FC } from 'react';
//ui
import { CartItem } from '../CartItem';
// styles
import styles from './ProductsList.module.scss';

interface ProductsListProps {}

export const ProductsList: FC<ProductsListProps> = ({}) => {
  return (
    <div className={styles.ProductsList}>
      <CartItem />
    </div>
  );
};
