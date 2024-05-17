// react
import { FC } from 'react';
// styles
import styles from './Loader.module.scss';

interface LoaderProps {}

export const Loader: FC<LoaderProps> = ({}) => {
  return <div className={styles.Loader}>...Loading</div>;
};
