// react
import { FC } from 'react';
//classnames lib
import classNames from 'classnames';
//shared constant
import { jsonPlaceholderRootURL } from '@/shared/libs/constants/jsonPlaceholderBaseURL';
// styles
import styles from './ProductItem.module.scss';

interface ProductItemProps {
  imageSrc: string;
  titleCard: string;
  price: number;
  discountPercent: number;
  columnStyle: 'columnEnd' | 'columnCenter';
}

export const ProductItem: FC<ProductItemProps> = ({
  imageSrc,
  titleCard,
  price,
  discountPercent,
  columnStyle
}) => {
  const priceWithDiscount = Math.round(price - (price * discountPercent) / 100);

  return (
    <>
      <div
        className={classNames(styles.column, {
          [styles.columnEnd]: columnStyle === 'columnEnd',
          [styles.columnCenter]: columnStyle === 'columnCenter'
        })}
      >
        <div className={styles.imgProduct}>
          <img src={`${jsonPlaceholderRootURL}${imageSrc}`} alt={titleCard} />
        </div>
        <div className={styles.titleProduct}>
          <span>{titleCard}</span>
        </div>
      </div>
      <div
        className={classNames(styles.column, {
          [styles.columnEnd]: columnStyle === 'columnEnd',
          [styles.columnCenter]: columnStyle === 'columnCenter'
        })}
      >
        ${discountPercent ? priceWithDiscount : price}
      </div>
    </>
  );
};
