// react
import { FC, ReactNode } from 'react';
import { NavLink as RouterNavLink, To } from 'react-router-dom';
//lib
import classNames from 'classnames';
// styles
import styles from './NavLink.module.scss';

interface NavLinkProps {
  to: To;
  children: ReactNode;
  activeDecoration: 'underline' | 'none';
  activeTextColor: 'black' | 'accent';
  unActiveDecoration?: 'opacity';
  onClick?: () => void;
}

export const NavLink: FC<NavLinkProps> = ({
  to,
  children,
  activeDecoration,
  activeTextColor,
  unActiveDecoration,
  onClick
}) => {
  return (
    <RouterNavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        isActive
          ? classNames(styles.active, {
              [styles.underline]: activeDecoration === 'underline',
              [styles.underlineNone]: activeDecoration === 'none',
              [styles.textColorBlack]: activeTextColor === 'black',
              [styles.textColorAccent]: activeTextColor === 'accent'
            })
          : classNames(styles.unActive, {
              [styles.textOpacity]: unActiveDecoration === 'opacity'
            })
      }
    >
      {children}
    </RouterNavLink>
  );
};
