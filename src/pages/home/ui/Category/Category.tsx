// react
import { FC, useState } from 'react';
//api
import { categoryJSON } from '@/enteties/product/api/JSON/categoryJSON';
//ui
import { IconButton } from '@/shared/ui/IconButton';
import { CategoryButton } from '@/enteties/product/ui/CategoryButton';
//libs
import VectorRightBlack from '@/shared/libs/assets/svg/VectorRightBlack.svg?react';
import VectorLeftBlack from '@/shared/libs/assets/svg/VectorLeftBlack.svg?react';
// styles
import styles from './Category.module.scss';

interface CategoryProps {}

export const Category: FC<CategoryProps> = ({}) => {
  const [visibleButtons, setVisibleButtons] = useState(
    categoryJSON.slice(0, 8)
  );

  return (
    <div className={styles.Category}>
      <div className={styles.headerTodayOffer}>
        <div className={styles.rectangleWrapper}>
          <div className={styles.rectangle}></div>
          <span>Categories</span>
        </div>
        <div className={styles.titleTodayOffer}>
          <div className={styles.saleTimer}>
            <p>Browse By Category</p>
          </div>
          <div className={styles.arrowSlider}>
            <IconButton backgroundColor='grey'>
              <VectorLeftBlack />
            </IconButton>
            <IconButton backgroundColor='grey'>
              <VectorRightBlack />
            </IconButton>
          </div>
        </div>
      </div>
      <div className={styles.categoryButtons}>
        {visibleButtons?.map(({ category, picture }, index) => (
          <CategoryButton
            title={category}
            picture={picture}
            key={index}
          ></CategoryButton>
        ))}
      </div>
    </div>
  );
};
