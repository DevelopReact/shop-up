// react
import { FC } from 'react';
// styles
import styles from './ProductSizeOptions.module.scss';
import classNames from 'classnames';

interface ProductSizeOptionsProps {
  size: string;
  selectedSize: string;
  onSelectSize: (size: string) => void;
}

export const ProductSizeOptions: FC<ProductSizeOptionsProps> = ({
  size,
  selectedSize,
  onSelectSize
}) => {
  const onChangeSize = () => {
    onSelectSize(size);
  };

  return (
    <div className={styles.ProductSizeOptions}>
      <div className={styles.checkButton}>
        <button
          onClick={onChangeSize}
          className={classNames(styles.sizeButton, {
            [styles.active]: size === selectedSize
          })}
        >
          {size}
        </button>
      </div>
    </div>
  );
};
