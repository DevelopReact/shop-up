// react
import { FC } from 'react';
import { Button } from '@/shared/ui/Button';
// styles
import styles from './CartClearButton.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getUserState, userActions } from '@/entities/user';
import {
  useGetUsersQuery,
  useUpdateUserMutation
} from '@/entities/user/api/userAPI';
import { productActions } from '@/entities/product';
import { getQuestState } from '@/entities/quest/model/selectors/getQuestState';
import { questActions } from '@/entities/quest/model/slice/questSlice';

interface CartClearButtonProps {}

export const CartClearButton: FC<CartClearButtonProps> = ({}) => {
  const dispatch = useDispatch();

  const { isLoggedIn } = useSelector(getUserState);
  const { data: userData, refetch } = useGetUsersQuery(null, {
    skip: !isLoggedIn
  });
  const [updateUser] = useUpdateUserMutation();
  // const { user } = useSelector(getUserState);

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
