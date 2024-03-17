// react
import { FC, ReactNode, useState } from 'react';
//lib
import { FaStar } from 'react-icons/fa';
//ui
import { IconButton } from '@/shared/ui/IconButton';
import { Button } from '@/shared/ui/Button';
//assets svg
import WishIcon from '@/shared/libs/assets/svg/WishIcon.svg?react';
import EyeIcon from '@/shared/libs/assets/svg/EyeIcon.svg?react';
// styles
import styles from './ProductCard.module.scss';

interface ProductCardProps {
  children: ReactNode;
  src: string;
  titleCard: string;
  currentPrice: string;
  previousPrice?: string;
  countLikes: string;
}

export const ProductCard: FC<ProductCardProps> = ({
  children,
  src,
  titleCard,
  currentPrice,
  previousPrice,
  countLikes
}) => {
  const [likes, setLikes] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleLikeClick = (index: any) => {
    if (likes === index) {
      setLikes(0);
    }
    setLikes(index);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  //adding to cart
  const onClickAddToCart = () => {};

  return (
    <div
      className={styles.ProductCard}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={styles.card}>
        {children}
        <div className={styles.iconsWrapper}>
          <div className={styles.iconCard}>
            <IconButton backgroundColor='white'>
              <WishIcon />
            </IconButton>
          </div>
          <div className={styles.iconCard}>
            <IconButton backgroundColor='white'>
              <EyeIcon />
            </IconButton>
          </div>
        </div>
        <img src={src} alt={titleCard} />
        {isHovered && (
          <Button
            type='button'
            backgroundColor='black'
            textColor='white'
            onClick={onClickAddToCart}
          >
            Add To Cart
          </Button>
        )}
      </div>
      <div className={styles.titleCard}>
        <div className={styles.describeCard}>
          <p>{titleCard}</p>
        </div>
        <div className={styles.price}>
          <div className={styles.currentPrice}>${currentPrice}</div>
          <div className={styles.previousPrice}>
            {previousPrice ? `$${previousPrice}` : null}
          </div>
        </div>
        <div className={styles.assessment}>
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
          <span>({countLikes})</span>
        </div>
      </div>
    </div>
  );
};
