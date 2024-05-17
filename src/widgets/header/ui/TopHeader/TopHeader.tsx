// react
import { FC } from 'react';
//ui
import { Link } from '@/shared/ui/Link';
import { Select } from '@/shared/ui/Select';
// styles
import styles from './TopHeader.module.scss';

interface TopHeaderProps {}

export const TopHeader: FC<TopHeaderProps> = ({}) => {
  return (
    <div className={styles.TopHeader}>
      <div className={styles.contentTopHeader}>
        <div className={styles.titleWrapper}>
          <div className={styles.titleTopHeader}>
            <p>
              Summer Sale For All Swim Suits And Free Express Delivery - OFF
              50%!
            </p>
          </div>
          <Link
            to='/'
            children='ShopNow'
            fontSize='small'
            lineHeight='medium'
            textColor='white'
          />
        </div>
        <div className={styles.select}>
          <Select />
        </div>
      </div>
    </div>
  );
};
