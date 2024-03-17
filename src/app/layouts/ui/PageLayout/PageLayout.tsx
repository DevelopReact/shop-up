// react
import { FC } from 'react';
import { Outlet } from 'react-router';
//widgets
import { Header } from '@/widgets/header';
import { Footer } from '@/widgets/footer';
// styles
import styles from './PageLayout.module.scss';

export const PageLayout: FC = ({}) => {
  return (
    <div className={styles.PageLayout}>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};
