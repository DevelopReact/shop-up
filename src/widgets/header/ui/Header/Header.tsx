// react
import { FC } from 'react';
//ui
import { TopHeader } from '../TopHeader/TopHeader';
import { HeaderNavMenu } from '../HeaderNavMenu/HeaderNavMenu';
// styles
import styles from './Header.module.scss';

interface HeaderProps {}

export const Header: FC<HeaderProps> = ({}) => {
  return (
    <div className={styles.Header}>
      <TopHeader />
      <HeaderNavMenu />
    </div>
  );
};
