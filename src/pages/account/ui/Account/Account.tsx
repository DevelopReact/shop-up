// react
import { FC } from 'react';
import { Outlet } from 'react-router';
//ui
import { NavLink } from '@/shared/ui/NavLink';
//libs
import {
  getAddressBook,
  getCancellations,
  getPaymentOptions,
  getProfile,
  getReturns
} from '@/shared/libs/constants/routes';
// styles
import styles from './Account.module.scss';
import { useSelector } from 'react-redux';
import { getUserState } from '@/entities/user';

interface AccountProps {}

export const Account: FC<AccountProps> = ({}) => {
  const data = useSelector(getUserState);

  return (
    <div className={styles.Account}>
      <div className={styles.headerAccount}>
        <div className={styles.roadMap}>
          <p>Home&nbsp;/&nbsp;</p>
          <span>My Account</span>
        </div>
        <div className={styles.welcome}>
          <p>Welcome!&nbsp;</p>
          <span>{data?.user.username}</span>
        </div>
      </div>
      <div className={styles.mainAccount}>
        <div className={styles.accountMenu}>
          <div className={styles.groupLinks}>
            <p>Manage My Account</p>
            <div className={styles.links}>
              <NavLink
                to={getProfile()}
                activeDecoration='none'
                activeTextColor='accent'
                unActiveDecoration='opacity'
              >
                My Profile
              </NavLink>
              <NavLink
                to={getAddressBook()}
                activeDecoration='none'
                activeTextColor='accent'
                unActiveDecoration='opacity'
              >
                Address Book
              </NavLink>
              <NavLink
                to={getPaymentOptions()}
                activeDecoration='none'
                activeTextColor='accent'
                unActiveDecoration='opacity'
              >
                My Payment Options
              </NavLink>
            </div>
          </div>
          <div className={styles.groupLinks}>
            <p>My Orders</p>
            <div className={styles.links}>
              <NavLink
                to={getReturns()}
                activeDecoration='none'
                activeTextColor='accent'
                unActiveDecoration='opacity'
              >
                My Returns
              </NavLink>
              <NavLink
                to={getCancellations()}
                activeDecoration='none'
                activeTextColor='accent'
                unActiveDecoration='opacity'
              >
                My Cancellations
              </NavLink>
            </div>
          </div>
          <div className={styles.groupLinks}>
            <p>My WishList</p>
          </div>
        </div>
        <Outlet />
      </div>
    </div>
  );
};
