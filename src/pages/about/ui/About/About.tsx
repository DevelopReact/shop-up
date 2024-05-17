// react
import { FC } from 'react';
// enteties

// styles
import styles from './About.module.scss';

interface AboutProps {}

export const About: FC<AboutProps> = ({}) => {
  return <div className={styles.About}>About</div>;
};
