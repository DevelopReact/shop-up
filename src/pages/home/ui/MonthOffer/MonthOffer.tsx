// react
import { FC } from 'react';
import { useNavigate } from 'react-router';
//api
import { useGetProductsQuery } from '@/entities/product/api/productAPI';
//ui
import { Button } from '@/shared/ui/Button';
import { ProductCard } from '@/entities/product/ui/ProductCard';
import { Discount } from '@/shared/ui/Discount';
import { Loader } from '@/shared/ui/Loader';
//constants
import { scrollUp } from '@/shared/libs/constants/scrollUp';
import { getErrorRoute } from '@/shared/libs/constants/routes';
// styles
import styles from './MonthOffer.module.scss';

interface MonthOfferProps {}

export const MonthOffer: FC<MonthOfferProps> = ({}) => {
  const navigate = useNavigate();

  const { data, isLoading, isError } = useGetProductsQuery();

  const visibleFlashProduct = data?.data
    .filter((data) => data.attributes.discountPercent)
    .slice(0, 5);

  const onClickMonthOffer = () => {};

  if (isError) {
    navigate(getErrorRoute());
    scrollUp();
  }

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
          {isLoading ? (
            <Loader />
          ) : (
            visibleFlashProduct?.map(({ id, attributes }) => (
              <ProductCard
                key={id}
                children={<Discount discount={attributes.discountPercent} />}
                src={attributes.mainPicture.data.attributes.url}
                titleCard={attributes.title}
                price={attributes.price}
                discountPercent={attributes.discountPercent}
                productId={id}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};
