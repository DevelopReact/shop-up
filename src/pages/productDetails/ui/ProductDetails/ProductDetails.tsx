// react
import { FC } from 'react';
// styles
import styles from './ProductDetails.module.scss';

interface ProductDetailsProps {}

export const ProductDetails: FC<ProductDetailsProps> = ({}) => {
  return <div className={styles.ProductDetails}>ProductDetails</div>;
};
