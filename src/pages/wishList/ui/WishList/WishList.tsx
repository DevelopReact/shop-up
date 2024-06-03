// react
import { FC } from 'react';
import { useSelector } from 'react-redux';
//selectors
import { getUserState } from '@/entities/user';
import { getQuestState } from '@/entities/quest';
//ui
import { ProductCard } from '@/entities/product/ui/ProductCard';
import { Discount } from '@/shared/ui/Discount';
//assets
import DeleteIcon from '@/shared/libs/assets/svg/icon-delete.svg?react';
// styles
import styles from './WishList.module.scss';
import { Button } from '@/shared/ui/Button';
import { useGetProductsQuery } from '@/entities/product/api/productAPI';
import { Loader } from '@/shared/ui/Loader';

interface WishListProps {}

export const WishList: FC<WishListProps> = ({}) => {
  const { data, isLoading, isError } = useGetProductsQuery();
  const { user, isLoggedIn } = useSelector(getUserState);
  const { quest } = useSelector(getQuestState);

  const currentUser = isLoggedIn ? user : quest;

  const visibleFlashProduct = data?.data
    .filter((data) => data.attributes.discountPercent)
    .slice(0, 5);

  return (
    <div className={styles.WishList}>
      <div className={styles.headerWishList}>
        <div className={styles.roadMap}>
          <p>Wishlist&nbsp;</p>
          <span>({currentUser.wishList?.length})</span>
        </div>
        <div className={styles.navButton}>
          <Button
            backgroundColor='white'
            borderColor='black'
            textColor='black'
            type='button'
          >
            Move All To Bag
          </Button>
        </div>
      </div>
      <div className={styles.wishListProducts}>
        {currentUser.wishList?.map(({ id, attributes }) => (
          <ProductCard
            key={id}
            children={<Discount discount={attributes.discountPercent} />}
            src={attributes.mainPicture.data.attributes.url}
            titleCard={attributes.title}
            price={attributes.price}
            discountPercent={attributes.discountPercent}
            productId={id}
            icon={<DeleteIcon />}
            iconAction='DeleteCard'
          />
        ))}
      </div>
      <div className={styles.RelatedItem}>
        <div className={styles.headerTodayOffer}>
          <div className={styles.rectangleWrapper}>
            <div className={styles.rectangle}></div>
            <span>Just For You</span>
          </div>
          <div className={styles.navButton}>
            <Button
              backgroundColor='white'
              borderColor='black'
              textColor='black'
              type='button'
            >
              See All
            </Button>
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
                  iconAction='addToWishList'
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
