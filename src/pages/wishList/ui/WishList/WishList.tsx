// react
import { FC } from 'react';
// styles
import styles from './WishList.module.scss';

interface WishListProps {}

export const WishList: FC<WishListProps> = ({}) => {
  return <div className={styles.WishList}></div>;
};
