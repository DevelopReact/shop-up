// react
import { FC } from 'react';
//api
import { useGetCategoriesQuery } from '@/entities/product/api/productAPI';
//ui
import { IconButton } from '@/shared/ui/IconButton';
import { CategoryButton } from '@/entities/product/ui/CategoryButton';
//libs
import VectorRightBlack from '@/shared/libs/assets/svg/VectorRightBlack.svg?react';
import VectorLeftBlack from '@/shared/libs/assets/svg/VectorLeftBlack.svg?react';
// styles
import styles from './Category.module.scss';

interface CategoryProps {}

export const Category: FC<CategoryProps> = ({}) => {
  const { data } = useGetCategoriesQuery();

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
        {data?.data.map(({ id, attributes }) => (
          <CategoryButton
            title={attributes.title}
            icon={attributes.icon.data
              .map(({ attributes }) => attributes.url)
              .join()}
            key={id}
          ></CategoryButton>
        ))}
      </div>
    </div>
  );
};
