// react
import { FC } from 'react';
import { useLocation } from 'react-router-dom';
//ui
import { Logo } from '@/shared/ui/Logo';
import { NavLink } from '@/shared/ui/NavLink';
import { Input } from '@/shared/ui/Input';
import { IconButton } from '@/shared/ui/IconButton';
import { Link } from '@/shared/ui/Link';
//libs
import SearchIcon from '@/shared/libs/assets/svg/SearchIcon.svg?react';
import WishIcon from '@/shared/libs/assets/svg/WishIcon.svg?react';
import CartIcon from '@/shared/libs/assets/svg/CartIcon.svg?react';
import { scrollUp } from '@/shared/libs/constants/scrollUp';
import {
  getAboutRoute,
  getContactRoute,
  getHomeRoute,
  getLogInRoute,
  getSignInRoute
} from '@/shared/libs/constants/routes';
// styles
import styles from './HeaderNavMenu.module.scss';

interface HeaderNavMenuProps {}

export const HeaderNavMenu: FC<HeaderNavMenuProps> = ({}) => {
  const location = useLocation().pathname;

  const onChange = () => {};

  const onScrollUp = () => scrollUp();

  const arr = [getSignInRoute(), getLogInRoute()];

  return (
    <div className={styles.HeaderNavMenu}>
      <div className={styles.wrapperNavMenu}>
        <Link
          to={getHomeRoute()}
          textColor='black'
          textDecoration='none'
          fontSize='large'
          lineHeight='large'
          onClick={onScrollUp}
        >
          <Logo children='Exclusive' textColor='black' />
        </Link>
        <div className={styles.wrapperNavLink}>
          <NavLink
            to={getHomeRoute()}
            children='Home'
            activeDecoration='underline'
            activeTextColor='black'
            onClick={onScrollUp}
          />
          <NavLink
            to={getContactRoute()}
            children='Contact'
            activeTextColor='black'
            activeDecoration='underline'
            onClick={onScrollUp}
          />
          <NavLink
            to={getAboutRoute()}
            children='About'
            activeTextColor='black'
            activeDecoration='underline'
            onClick={onScrollUp}
          />
          <NavLink
            to={getSignInRoute()}
            children='Sign In'
            activeTextColor='black'
            activeDecoration='underline'
            onClick={onScrollUp}
          />
        </div>
        <div className={styles.wrapperInputSearch}>
          <Input
            type='text'
            placeholder='What are you looking for?'
            backgroundColor='grey'
            onChange={onChange}
          />
          <SearchIcon className={styles.searchIcon} />
        </div>
        {!arr.includes(location) && (
          <div className={styles.wrapperIconButtons}>
            <IconButton
              backgroundColor='white'
              onChange={onChange}
              children={<WishIcon />}
            />
            <IconButton
              backgroundColor='white'
              onChange={onChange}
              children={<CartIcon />}
            />
          </div>
        )}
      </div>
    </div>
  );
};
