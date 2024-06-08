import { useDispatch, useSelector } from 'react-redux';
import { getUserState, userActions } from '../..';
import { useUpdateUserMutation } from '../../api/userAPI';
import { IUser } from '../types/userTypes';

export const useUpdateUser = () => {
  const { user, isLoggedIn } = useSelector(getUserState);

  const dispatch = useDispatch();

  const [updateUser, result] = useUpdateUserMutation();

  const updateUserHandler = (data: Partial<IUser>) => {
    if (isLoggedIn) {
      updateUser({
        id: user.id,
        ...data
      })
        .unwrap()
        .then((data: IUser) => {
          if (data && result.isSuccess) {
            dispatch(userActions.setUser(data));
          }
        });
    }
  };

  return {
    updateUser: updateUserHandler,
    ...result
  };
};
