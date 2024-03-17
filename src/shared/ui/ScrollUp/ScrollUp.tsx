// react
import { FC } from 'react';
//ui
import { IconButton } from '@/shared/ui/IconButton';
//libs
import VectorUp from '@/shared/libs/assets/svg/VectorUp.svg?react';
import { scrollUp } from '@/shared/libs/constants/scrollUp';
// styles
import styles from './ScrollUp.module.scss';

interface ScrollUpProps {}

export const ScrollUp: FC<ScrollUpProps> = ({}) => {
  const onScrollUp = () => {
    scrollUp();
  };

  return (
    <div className={styles.ScrollUp}>
      <div className={styles.arrowSlider} onClick={onScrollUp}>
        <IconButton backgroundColor='grey'>
          <VectorUp />
        </IconButton>
      </div>
    </div>
  );
};
