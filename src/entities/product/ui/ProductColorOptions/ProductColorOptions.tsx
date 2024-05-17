// react
import { FC } from 'react';
//lib
import classNames from 'classnames';
// styles
import styles from './ProductColorOptions.module.scss';

interface ProductColorOptionsProps {
  color: string;
  selectColor: string;
  onSelectColor: (color: string) => void;
  buttonBackground: string;
}

export const ProductColorOptions: FC<ProductColorOptionsProps> = ({
  color,
  selectColor,
  onSelectColor,
  buttonBackground
}) => {
  const onClickColor = () => {
    onSelectColor(color);
  };

  return (
    <div className={styles.ProductColorOptions}>
      <button
        onClick={onClickColor}
        style={{ backgroundColor: buttonBackground }}
        className={classNames(styles.colorButton, {
          [styles.active]: color === selectColor
        })}
      />
    </div>
  );
};
