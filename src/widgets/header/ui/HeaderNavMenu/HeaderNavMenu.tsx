// react
import { FC } from 'react';
import { useSelector } from 'react-redux';
//entities
import { UserProfileButton } from '@/entities/user/ui/UserProfileButton/UserProfileButton';
//selectors
import { getUserState } from '@/entities/user';
import { getQuestState } from '@/entities/quest';
//ui
import { Logo } from '@/shared/ui/Logo';
import { NavLink } from '@/shared/ui/NavLink';
import { Input } from '@/shared/ui/Input';
import { IconButton } from '@/shared/ui/IconButton';
import { Link } from '@/shared/ui/Link';
//assets
import SearchIcon from '@/shared/libs/assets/svg/SearchIcon.svg?react';
import WishIcon from '@/shared/libs/assets/svg/WishIcon.svg?react';
import CartIcon from '@/shared/libs/assets/svg/CartIcon.svg?react';
//constants
import { scrollUp } from '@/shared/libs/constants/scrollUp';
import {
  getAboutRoute,
  getCartRoute,
  getContactRoute,
  getHomeRoute,
  getSignInRoute,
  getWishListRoute
} from '@/shared/libs/constants/routes';
// styles
import styles from './HeaderNavMenu.module.scss';

interface HeaderNavMenuProps {}

export const HeaderNavMenu: FC<HeaderNavMenuProps> = ({}) => {
  const { user, isLoggedIn } = useSelector(getUserState);
  const { quest } = useSelector(getQuestState);

  const currentUser = isLoggedIn ? user : quest;

  return (
    <div className={styles.HeaderNavMenu}>
      <div className={styles.wrapperNavMenu}>
        <Link
          to={getHomeRoute()}
          textColor='black'
          textDecoration='none'
          fontSize='large'
          lineHeight='large'
          onClick={() => scrollUp()}
        >
          <Logo children='Exclusive' textColor='black' />
        </Link>
        <div className={styles.wrapperNavLink}>
          <NavLink
            to={getHomeRoute()}
            children='Home'
            activeDecoration='underline'
            activeTextColor='black'
            onClick={() => scrollUp()}
          />
          <NavLink
            to={getContactRoute()}
            children='Contact'
            activeTextColor='black'
            activeDecoration='underline'
            onClick={() => scrollUp()}
          />
          <NavLink
            to={getAboutRoute()}
            children='About'
            activeTextColor='black'
            activeDecoration='underline'
            onClick={() => scrollUp()}
          />
          <NavLink
            to={getSignInRoute()}
            children='Sign In'
            activeTextColor='black'
            activeDecoration='underline'
            onClick={() => scrollUp()}
          />
        </div>
        <div className={styles.wrapperInputSearch}>
          <Input
            type='text'
            placeholder='What are you looking for?'
            backgroundColor='grey'
          />
          <SearchIcon className={styles.searchIcon} />
        </div>
        <div className={styles.wrapperIconButtons}>
          <Link
            to={getWishListRoute()}
            textColor='white'
            textDecoration='none'
            onClick={() => scrollUp()}
          >
            <div className={styles.cartButton}>
              {currentUser.wishList?.length != 0 ? (
                <div className={styles.counterSelectedProducts}>
                  <span>{currentUser.wishList?.length}</span>
                </div>
              ) : null}
              <IconButton backgroundColor='white' children={<WishIcon />} />
            </div>
          </Link>
          <Link
            to={getCartRoute()}
            textColor='white'
            textDecoration='none'
            onClick={() => scrollUp()}
          >
            <div className={styles.cartButton}>
              {currentUser.products?.length != 0 ? (
                <div className={styles.counterSelectedProducts}>
                  <span>{currentUser.products?.length}</span>
                </div>
              ) : null}
              <IconButton backgroundColor='white' children={<CartIcon />} />
            </div>
          </Link>
          {isLoggedIn && <UserProfileButton />}
        </div>
      </div>
    </div>
  );
};
