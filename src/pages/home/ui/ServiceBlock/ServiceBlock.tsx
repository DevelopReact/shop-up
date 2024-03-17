// react
import { FC, ReactNode } from 'react';
// styles
import styles from './ServiceBlock.module.scss';

interface ServiceBlockProps {
  name: string;
  title: string;
  children: ReactNode;
}

export const ServiceBlock: FC<ServiceBlockProps> = ({
  name,
  title,
  children
}) => {
  return (
    <div className={styles.ServiceBlock}>
      <div className={styles.iconService}>{children}</div>
      <div className={styles.titleService}>
        <p>{name}</p>
        <span>{title}</span>
      </div>
    </div>
  );
};
