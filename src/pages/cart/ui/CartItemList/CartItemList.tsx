// react
import { FC } from 'react';
//ui
import { CartItem } from '../CartItem';
// styles
import styles from './CartItemList.module.scss';
import { useSelector } from 'react-redux';
import { getUserState } from '@/entities/user';
import { getQuestState } from '@/entities/quest';

interface CartItemListProps {}

export const CartItemList: FC<CartItemListProps> = ({}) => {
  const { user, isLoggedIn } = useSelector(getUserState);
  const { quest } = useSelector(getQuestState);

  const currentUser = isLoggedIn ? user.products : quest.products;

  return currentUser?.map(({ id, attributes }) => (
    <div className={styles.CartItemList} key={id}>
      <CartItem
        id={id}
        imageSrc={attributes.mainPicture.data.attributes.url}
        titleCard={attributes.title}
        price={attributes.price}
        discountPercent={attributes.discountPercent}
        quantity={attributes.quantity!}
      />
    </div>
  ));
};
