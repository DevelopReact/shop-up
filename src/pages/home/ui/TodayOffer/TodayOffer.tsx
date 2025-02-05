// react
import { FC, useState } from 'react';
import { useNavigate } from 'react-router';
//api
import { useGetProductsQuery } from '@/entities/product/api/productAPI';
//types
import { IProduct } from '@/entities/product/model/types/productTypes';
//ui
import { Timer } from '../Timer';
import { IconButton } from '@/shared/ui/IconButton';
import { Discount } from '@/shared/ui/Discount';
import { ProductCard } from '@/entities/product/ui/ProductCard';
import { Button } from '@/shared/ui/Button';
import { Loader } from '@/shared/ui/Loader';
//assets
import VectorRightBlack from '@/shared/libs/assets/svg/VectorRightBlack.svg?react';
import VectorLeftBlack from '@/shared/libs/assets/svg/VectorLeftBlack.svg?react';
//constants
import { getAllProducts, getErrorRoute } from '@/shared/libs/constants/routes';
import { scrollUp } from '@/shared/libs/constants/scrollUp';
// styles
import styles from './TodayOffer.module.scss';

interface TodayOfferProps {}

export const TodayOffer: FC<TodayOfferProps> = ({}) => {
  const navigate = useNavigate();

  const { data, isLoading, isError } = useGetProductsQuery();
  console.log(data);

  const visibleFlashProduct = data?.data
    .slice(0, 7)
    .filter((data: IProduct) => data.attributes.discountPercent);

  console.log(visibleFlashProduct?.map((card) => card));

  const [startVisibleIndex, setStartVisibleIndex] = useState(0);
  //move list left on click
  const onClickMoveListLeft = () => {
    if (visibleFlashProduct) {
      setStartVisibleIndex((prevIndex) =>
        prevIndex === visibleFlashProduct.length - 1 ? 0 : prevIndex + 1
      );
    }
  };
  //move list right on click
  const onClickMoveListRight = () => {
    if (visibleFlashProduct) {
      setStartVisibleIndex((prevIndex) =>
        prevIndex === 0 ? visibleFlashProduct.length - 1 : prevIndex - 1
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
              <IconButton backgroundColor='grey' onClick={onClickMoveListRight}>
                <VectorLeftBlack />
              </IconButton>
              <IconButton backgroundColor='grey' onClick={onClickMoveListLeft}>
                <VectorRightBlack />
              </IconButton>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.wrapperProductCards}>
        <div className={styles.productCards}>
          {isLoading ? (
            <Loader />
          ) : (
            <>
              {visibleFlashProduct
                ?.slice(startVisibleIndex)
                .map(({ attributes, id }) => (
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
                    iconAction='addToWishList'
                  />
                ))}
              {visibleFlashProduct
                ?.slice(0, startVisibleIndex)
                .map(({ attributes, id }) => (
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
                    iconAction='addToWishList'
                  />
                ))}
            </>
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
