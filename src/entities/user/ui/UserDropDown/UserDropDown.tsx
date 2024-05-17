// react
import { FC } from 'react';
import { useNavigate } from 'react-router';
//react-redux
import { useDispatch } from 'react-redux';
//actions
import { userActions } from '../../model/slice/userSlice';
//ui
import { Link } from '@/shared/ui/Link';
//constants
import {
  getCancellations,
  getHomeRoute,
  getMyOrders,
  getProfile,
  getReviews
} from '@/shared/libs/constants/routes';
//assets
import UserIcon from '@/shared/libs/assets/svg/userLink.svg?react';
import MallBagIcon from '@/shared/libs/assets/svg/icon-mallbag.svg?react';
import CancelIcon from '@/shared/libs/assets/svg/icon-cancel.svg?react';
import ReviewsIcon from '@/shared/libs/assets/svg/Icon-Reviews.svg?react';
import LogOutIcon from '@/shared/libs/assets/svg/Icon-logout.svg?react';
// styles
import styles from './UserDropDown.module.scss';

interface UserDropDownProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

export const UserDropDown: FC<UserDropDownProps> = ({ isOpen, setIsOpen }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onCloseClick = () => {
    setIsOpen(false);
  };

  const onLogOutClick = () => {
    dispatch(userActions.logOut());
    navigate(getHomeRoute());
    onCloseClick();
  };

  return (
    isOpen && (
      <div className={styles.UserDropDown}>
        <>
          <div className={styles.linkDropDown}>
            <UserIcon />
            <Link
              to={getProfile()}
              textColor='white'
              textDecoration='none'
              fontSize='small'
              lineHeight='small'
              onClick={onCloseClick}
            >
              Manage My Account
            </Link>
          </div>
          <div className={styles.linkDropDown}>
            <MallBagIcon />
            <Link
              to={getMyOrders()}
              textColor='white'
              textDecoration='none'
              fontSize='small'
              lineHeight='large'
              onClick={onCloseClick}
            >
              My Order
            </Link>
          </div>
          <div className={styles.linkDropDown}>
            <CancelIcon />
            <Link
              to={getCancellations()}
              textColor='white'
              textDecoration='none'
              fontSize='small'
              lineHeight='large'
              onClick={onCloseClick}
            >
              My Cancellations
            </Link>
          </div>
          <div className={styles.linkDropDown}>
            <ReviewsIcon />
            <Link
              to={getReviews()}
              textColor='white'
              textDecoration='none'
              fontSize='small'
              lineHeight='large'
              onClick={onCloseClick}
            >
              My Reviews
            </Link>
          </div>
          <div className={styles.linkDropDown}>
            <LogOutIcon />
            <Link
              to={getHomeRoute()}
              textColor='white'
              textDecoration='none'
              fontSize='small'
              lineHeight='large'
              onClick={onLogOutClick}
            >
              Logout
            </Link>
          </div>
        </>
      </div>
    )
  );
};
