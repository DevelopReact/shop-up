// react
import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
//api
import { jsonProducts } from '@/enteties/product/api/JSON/jsonProducts';
//ui
import { IconButton } from '@/shared/ui/IconButton';
import { ProductCard } from '@/enteties/product/ui/ProductCard';
import { Button } from '@/shared/ui/Button';
import { Discount } from '@/shared/ui/Discount';
//libs
import VectorLeftBlack from '@/shared/libs/assets/svg/VectorLeftBlack.svg?react';
import VectorRightBlack from '@/shared/libs/assets/svg/VectorRightBlack.svg?react';
import { getAllProducts } from '@/shared/libs/constants/routes';
// styles
import styles from './OurProduct.module.scss';

interface OurProductProps {}

export const OurProduct: FC<OurProductProps> = ({}) => {
  const navigate = useNavigate();

  const [visibleOurProduct, setVisibleOurProduct] = useState(
    jsonProducts.slice(0, 10)
  );

  const onNavigate = () => {
    navigate(getAllProducts());
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={styles.OurProduct}>
      <div className={styles.headerTodayOffer}>
        <div className={styles.rectangleWrapper}>
          <div className={styles.rectangle}></div>
          <span>Our Products</span>
        </div>

        <div className={styles.titleTodayOffer}>
          <div className={styles.saleTimer}>
            <p>Explore Our Products</p>
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
      <div className={styles.wrapperOurProducts}>
        <div className={styles.productOurCards}>
          {visibleOurProduct?.map(
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
      <div className={styles.buttonOurProducts}>
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
      </div>
    </div>
  );
};
