// react
import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
//api
import {
  useGetUsersQuery,
  useUpdateUserMutation
} from '@/entities/user/api/userAPI';
//actions
import { getUserState, userActions } from '@/entities/user';
import { productActions } from '@/entities/product';
import { questActions } from '@/entities/quest/model/slice/questSlice';
//ui
import { Button } from '@/shared/ui/Button';
// styles
import styles from './CartClearButton.module.scss';

interface CartClearButtonProps {}

export const CartClearButton: FC<CartClearButtonProps> = ({}) => {
  const dispatch = useDispatch();

  const { isLoggedIn } = useSelector(getUserState);
  const { data: userData, refetch } = useGetUsersQuery(null, {
    skip: !isLoggedIn
  });
  const [updateUser] = useUpdateUserMutation();

  const onClearCart = async () => {
    dispatch(productActions.clearProductCart());

    if (userData) {
      const updateUserData = {
        ...userData,
        products: []
      };
      dispatch(userActions.setUser(updateUserData));
      await updateUser(updateUserData);
      refetch();
    } else {
      dispatch(questActions.clearQuest());
    }
  };

  return (
    <div className={styles.CartClearButton}>
      <Button
        type='button'
        backgroundColor='white'
        borderColor='blackOpacity'
        height='medium'
        onClick={onClearCart}
      >
        Clear Cart
      </Button>
    </div>
  );
};
