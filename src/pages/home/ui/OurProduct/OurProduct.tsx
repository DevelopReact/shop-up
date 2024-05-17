// react
import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
//api
import { useGetProductsQuery } from '@/entities/product/api/productAPI';
//ui
import { IconButton } from '@/shared/ui/IconButton';
import { ProductCard } from '@/entities/product/ui/ProductCard';
import { Button } from '@/shared/ui/Button';
import { Discount } from '@/shared/ui/Discount';
import { Loader } from '@/shared/ui/Loader';
//constants
import { scrollUp } from '@/shared/libs/constants/scrollUp';
//libs
import VectorLeftBlack from '@/shared/libs/assets/svg/VectorLeftBlack.svg?react';
import VectorRightBlack from '@/shared/libs/assets/svg/VectorRightBlack.svg?react';
import { getAllProducts, getErrorRoute } from '@/shared/libs/constants/routes';
// styles
import styles from './OurProduct.module.scss';

interface OurProductProps {}

export const OurProduct: FC<OurProductProps> = ({}) => {
  const navigate = useNavigate();

  const { data, isLoading, isError } = useGetProductsQuery();

  const visibleOurProduct = data?.data.slice(0, 10);

  const [rowStartIndex, setRowStartIndex] = useState(5);
  //move list right on click
  const onClickMoveListLeft = () => {
    if (visibleOurProduct) {
      setRowStartIndex((prevLowerIndex) =>
        prevLowerIndex === 0 ? visibleOurProduct.length - 1 : prevLowerIndex - 1
      );
    }
  };
  //move list left on click
  const onClickMoveListRight = () => {
    if (visibleOurProduct) {
      setRowStartIndex((prevLowerIndex) =>
        prevLowerIndex === visibleOurProduct.length - 1 ? 0 : prevLowerIndex + 1
      );
    }
  };

  const onNavigate = () => {
    navigate(getAllProducts());
    scrollUp();
  };

  if (isError) {
    navigate(getErrorRoute());
    scrollUp();
  }

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
            <IconButton backgroundColor='grey' onClick={onClickMoveListLeft}>
              <VectorLeftBlack />
            </IconButton>
            <IconButton backgroundColor='grey' onClick={onClickMoveListRight}>
              <VectorRightBlack />
            </IconButton>
          </div>
        </div>
      </div>
      <div className={styles.wrapperOurProducts}>
        <div className={styles.productOurCards}>
          {isLoading ? (
            <Loader />
          ) : (
            <>
              {visibleOurProduct
                ?.slice(rowStartIndex)
                .map(({ id, attributes }) => (
                  <ProductCard
                    key={id}
                    children={
                      <Discount discount={attributes.discountPercent} />
                    }
                    src={attributes.mainPicture.data.attributes.url}
                    titleCard={attributes.title}
                    price={attributes.price}
                    discountPercent={attributes.discountPercent}
                    productId={id}
                  />
                ))}
              {visibleOurProduct
                ?.slice(0, rowStartIndex)
                .map(({ id, attributes }) => (
                  <ProductCard
                    key={id}
                    children={
                      <Discount discount={attributes.discountPercent} />
                    }
                    src={attributes.mainPicture.data.attributes.url}
                    titleCard={attributes.title}
                    price={attributes.price}
                    discountPercent={attributes.discountPercent}
                    productId={id}
                  />
                ))}
            </>
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
