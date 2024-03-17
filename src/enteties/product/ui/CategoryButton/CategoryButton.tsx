// react
import { FC, ReactNode } from 'react';
// styles
import styles from './CategoryButton.module.scss';

interface CategoryButtonProps {
  title: string;
  picture: ReactNode;
}

export const CategoryButton: FC<CategoryButtonProps> = ({
  title,
  picture
}) => {
  return (
    <div className={styles.CategoryButton}>
      {picture}
      <p>{title}</p>
    </div>
  );
};
