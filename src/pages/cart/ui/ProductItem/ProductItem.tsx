// react
import { FC } from 'react';
// styles
import styles from './ProductItem.module.scss';

interface ProductItemProps {
  imageSrc: string;
  titleCard: string;
  currentPrice: string;
}

export const ProductItem: FC<ProductItemProps> = ({
  imageSrc,
  titleCard,
  currentPrice
}) => {
  return (
    <>
      <div className={styles.column}>
        <div className={styles.imgProduct}>
          <img src={imageSrc} />
        </div>
        <div className={styles.titleProduct}>
          <span>{titleCard}</span>
        </div>
      </div>
      <div className={styles.column}>${currentPrice}</div>
    </>
  );
};
