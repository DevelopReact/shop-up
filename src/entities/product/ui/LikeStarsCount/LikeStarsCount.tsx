// react
import { FC, useState } from 'react';
//lib
import { FaStar } from 'react-icons/fa';
// styles
import styles from './LikeStarsCount.module.scss';

interface LikeStarsCountProps {}

export const LikeStarsCount: FC<LikeStarsCountProps> = ({}) => {
  const [likes, setLikes] = useState(0);

  const handleLikeClick = (index: any) => {
    if (likes === index) {
      setLikes(0);
    }
    setLikes(index);
  };

  return (
    <div className={styles.LikeStarsCount}>
      <div className={styles.stars}>
        {[1, 2, 3, 4, 5].map((index) => {
          return (
            <FaStar
              key={index}
              style={{ cursor: 'pointer' }}
              color={likes >= index ? '#FFAD33' : 'grey'}
              onClick={() => handleLikeClick(index)}
            ></FaStar>
          );
        })}
      </div>
      <span>45</span>
    </div>
  );
};
