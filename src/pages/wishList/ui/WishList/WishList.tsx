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

interface WishListProps {}

export const WishList: FC<WishListProps> = ({}) => {
  const { user, isLoggedIn } = useSelector(getUserState);
  const { quest } = useSelector(getQuestState);

  const currentUser = isLoggedIn ? user : quest;

  const visibleFlashProduct = currentUser.wishList?.slice(0, 5);

  return (
    <div className={styles.WishList}>
      {visibleFlashProduct?.map(({ id, attributes }) => (
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
  );
};
