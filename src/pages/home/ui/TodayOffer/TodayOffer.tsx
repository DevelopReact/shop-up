// react
import { FC, useState } from 'react';
//api
import { jsonProducts } from '@/enteties/product/api/JSON/jsonProducts';
//ui
import { Timer } from '../Timer';
import { IconButton } from '@/shared/ui/IconButton';
import VectorRightBlack from '@/shared/libs/assets/svg/VectorRightBlack.svg?react';
import VectorLeftBlack from '@/shared/libs/assets/svg/VectorLeftBlack.svg?react';
import { Discount } from '@/shared/ui/Discount';
import { ProductCard } from '@/enteties/product/ui/ProductCard';
import { Button } from '@/shared/ui/Button';
//libs
import { getAllProducts } from '@/shared/libs/constants/routes';
import { scrollUp } from '@/shared/libs/constants/scrollUp';
// styles
import styles from './TodayOffer.module.scss';
import { useNavigate } from 'react-router';

interface TodayOfferProps {}

export const TodayOffer: FC<TodayOfferProps> = ({}) => {
  const navigate = useNavigate();

  const [visibleFlashProduct, setVisibleFlashProduct] = useState(
    jsonProducts.slice(0, 6)
  );

  const onNavigate = () => {
    navigate(getAllProducts());
    scrollUp();
  };

  return (
    <>
      <div className={styles.todayOfferSection}>
        <div className={styles.headerTodayOffer}>
          <div className={styles.rectangleWrapper}>
            <div className={styles.rectangle}></div>
            <span>Today's</span>
          </div>

          <div className={styles.titleTodayOffer}>
            <div className={styles.saleTimer}>
              <p>Flash Sales</p>

              <Timer />
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
      </div>
      <div className={styles.wrapperProductCards}>
        <div className={styles.productCards}>
          {visibleFlashProduct?.map(
            (
              {
                imageSrc,
                titleCard,
                discount,
                currentPrice,
                previousPrice,
                countLikes
              },
              index
            ) => (
              <ProductCard
                key={index}
                children={<Discount discount={discount} />}
                src={imageSrc}
                titleCard={titleCard}
                currentPrice={currentPrice}
                previousPrice={previousPrice}
                countLikes={countLikes}
              />
            )
          )}
        </div>
      </div>
      <div className={styles.navButton}>
        <Button
          type='button'
          backgroundColor='accent'
          textColor='white'
          height='large'
          onClick={onNavigate}
        >
          View All Products
        </Button>
      </div>
    </>
  );
};
