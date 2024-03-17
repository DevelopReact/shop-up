// react
import { FC, useState } from 'react';
//api
import { jsonProducts } from '@/enteties/product/api/JSON/jsonProducts';
//ui
import { Button } from '@/shared/ui/Button';
import { ProductCard } from '@/enteties/product/ui/ProductCard';
import { Discount } from '@/shared/ui/Discount';

// styles
import styles from './MonthOffer.module.scss';

interface MonthOfferProps {}

export const MonthOffer: FC<MonthOfferProps> = ({}) => {
  const [visibleBestProduct, setVisibleBestProduct] = useState(
    jsonProducts.slice(0, 5)
  );

  const onClickMonthOffer = () => {};

  return (
    <div className={styles.MonthOffer}>
      <div className={styles.headerTodayOffer}>
        <div className={styles.rectangleWrapper}>
          <div className={styles.rectangle}></div>
          <span>This Month</span>
        </div>
        <div className={styles.titleTodayOffer}>
          <div className={styles.saleTimer}>
            <p>Best Selling Products</p>
          </div>
          <div className={styles.buttonMonthOffer}>
            <Button
              type='button'
              backgroundColor='accent'
              textColor='white'
              height='large'
              onClick={onClickMonthOffer}
            >
              View All
            </Button>
          </div>
        </div>
      </div>
      <div className={styles.wrapperBestProducts}>
        <div className={styles.productBestCards}>
          {visibleBestProduct?.map(
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
    </div>
  );
};
