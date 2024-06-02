// react
import { FC } from 'react';
import { useNavigate } from 'react-router';
//api
import { useGetProductsQuery } from '@/entities/product/api/productAPI';
//ui
import { ProductCard } from '@/entities/product/ui/ProductCard';
import { Discount } from '@/shared/ui/Discount';
import { Loader } from '@/shared/ui/Loader';
//constants
import { scrollUp } from '@/shared/libs/constants/scrollUp';
import { getErrorRoute } from '@/shared/libs/constants/routes';
//assets
import WishIcon from '@/shared/libs/assets/svg/WishIcon.svg?react';
// styles
import styles from './RelatedItem.module.scss';

interface RelatedItemProps {}

export const RelatedItem: FC<RelatedItemProps> = ({}) => {
  const navigate = useNavigate();

  const { data, isLoading, isError } = useGetProductsQuery();

  const visibleFlashProduct = data?.data
    .filter((data) => data.attributes.discountPercent)
    .slice(0, 5);

  if (isError) {
    navigate(getErrorRoute());
    scrollUp();
  }

  return (
    <div className={styles.RelatedItem}>
      <div className={styles.headerTodayOffer}>
        <div className={styles.rectangleWrapper}>
          <div className={styles.rectangle}></div>
          <span>Related Item</span>
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
                icon={<WishIcon />}
                iconAction='addToWishList'
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};
