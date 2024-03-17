// react
import { FC } from 'react';
//ui
import { Link } from '@/shared/ui/Link';
import { IconButton } from '@/shared/ui/IconButton';
//libs
import ArrowRight from '@/shared/libs/assets/svg/ArrowRight.svg?react';
import Logo_apple from '@/shared/libs/assets/svg/Logo_apple.svg?react';
import VectorRight from '@/shared/libs/assets/svg/VectorRight.svg?react';
import Iphone14 from '@/shared/libs/assets/png/iphone14.png';
import {
  getBabyToys,
  getElectronics,
  getGroceriesPets,
  getHealthBeauty,
  getMedicine,
  getMensFashion,
  getShop,
  getSportOutdoor,
  getWomansFashion
} from '@/shared/libs/constants/routes';
// styles
import { scrollUp } from '@/shared/libs/constants/scrollUp';
import styles from './BarMenu.module.scss';

interface BarMenuProps {}

export const BarMenu: FC<BarMenuProps> = ({ }) => {
  const onScrollUp = () => scrollUp()
  return (
    <div className={styles.BarMenu}>
      <div className={styles.barMenuSection}>
        <div className={styles.liBarMenu}>
          <Link to={getWomansFashion()} textColor='black' textDecoration='none' onClick = {onScrollUp}>
            Woman’s Fashion
          </Link>
          <IconButton backgroundColor='white'>{<ArrowRight />}</IconButton>
        </div>
        <div className={styles.liBarMenu}>
          <Link to={getMensFashion()} textColor='black' textDecoration='none' onClick = {onScrollUp}>
            Men’s Fashion
          </Link>
          <IconButton backgroundColor='white'>{<ArrowRight />}</IconButton>
        </div>
        <div className={styles.liBarMenu}>
          <Link to={getElectronics()} textColor='black' textDecoration='none' onClick = {onScrollUp}>
            Electronics
          </Link>
        </div>
        <div className={styles.liBarMenu}>
          <Link to={getMedicine()} textColor='black' textDecoration='none' onClick = {onScrollUp}>
            Medicine
          </Link>
        </div>
        <div className={styles.liBarMenu}>
          <Link to={getSportOutdoor()} textColor='black' textDecoration='none' onClick = {onScrollUp}>
            Sports & Outdoor
          </Link>
        </div>
        <div className={styles.liBarMenu}>
          <Link to={getBabyToys()} textColor='black' textDecoration='none' onClick = {onScrollUp}>
            Baby’s & Toys
          </Link>
        </div>
        <div className={styles.liBarMenu}>
          <Link to={getGroceriesPets()} textColor='black' textDecoration='none' onClick = {onScrollUp}>
            Groceries & Pets
          </Link>
        </div>
        <div className={styles.liBarMenu}>
          <Link to={getHealthBeauty()} textColor='black' textDecoration='none' onClick = {onScrollUp}>
            Health & Beauty
          </Link>
        </div>
      </div>
      <div className={styles.slideBarWrapper}>
        <div className={styles.slideBar}>
          <div className={styles.titleSlideBar}>
            <div className={styles.headerSlideBar}>
              <Logo_apple />
              <p>iPhone 14 Series</p>
            </div>

            <div className={styles.mainSlideBar}>
              Up to 10%
              <br />
              off Voucher
            </div>

            <div className={styles.footerSlideBar}>
              <Link to={getShop()} textColor='white'>
                Shop Now
              </Link>
              <VectorRight />
            </div>
          </div>
          <img src={Iphone14} />
        </div>
        <div className={styles.slide}>
          <div className={styles.ellipse}></div>
          <div className={styles.ellipse}></div>
          <div className={styles.ellipse}></div>
          <div className={styles.ellipse}></div>
          <div className={styles.ellipse}></div>
        </div>
      </div>
    </div>
  );
};
