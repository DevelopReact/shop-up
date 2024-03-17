// react
import { FC, useState } from 'react';
//libs
import ArrowUp from '@/shared/libs/assets/svg/ArrowUp.svg?react';
import ArrowDown from '@/shared/libs/assets/svg/ArrowDown.svg?react';
import { jsonProducts } from '@/enteties/product/api/JSON/jsonProducts';
// styles
import styles from './ProductsList.module.scss';
import { ProductItem } from '../ProductItem/ProductItem';

interface ProductsListProps {}

export const ProductsList: FC<ProductsListProps> = ({}) => {
  const productListJSX = jsonProducts?.map(
    ({ imageSrc, titleCard, currentPrice }, index) => {
      const [value, setValue] = useState(1);

      const onIncreaseQuantity = () => {
        setValue(() => value + 1);
      };
      const onDecreaseQuantity = () => {
        if (value == 1) return;
        setValue(value - 1);
      };
      const subtotal = +currentPrice * value;
      return (
        <div className={styles.rowTableCart} key={index}>
          <ProductItem
            imageSrc={imageSrc}
            titleCard={titleCard}
            currentPrice={currentPrice}
          />
          <div className={styles.column}>
            <div className={styles.quantity}>
              <div className={styles.inputQuantity}>
                <div className={styles.valueQuantity}>
                  {value < 10 ? '0' + value : value}
                </div>
                <div className={styles.arrowsQuantity}>
                  <ArrowUp onClick={() => onIncreaseQuantity()} />
                  <ArrowDown onClick={() => onDecreaseQuantity()} />
                </div>
              </div>
            </div>
          </div>
          <div className={styles.column}>${subtotal}</div>
        </div>
      );
    }
  );

  return <div className={styles.ProductsList}>{productListJSX}</div>;
};
