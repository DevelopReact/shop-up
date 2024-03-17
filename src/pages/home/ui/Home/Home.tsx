// react
import { FC } from 'react';
//ui
import { TodayOffer } from '../TodayOffer';
import { Featured } from '../Featured';
import { OurProduct } from '../OurProduct/OurProduct';
import { MonthOffer } from '../MonthOffer/MonthOffer';
import { Category } from '../Category';
import { BarMenu } from '../BarMenu';
import { ScrollUp } from '@/shared/ui/ScrollUp';
// styles
import styles from './Home.module.scss';

interface HomeProps {}

export const Home: FC<HomeProps> = ({}) => {
  return (
    <div className={styles.Home}>
      <BarMenu />
      <TodayOffer />
      <Category />
      <MonthOffer />
      <OurProduct />
      <Featured />
      <ScrollUp />
    </div>
  );
};
