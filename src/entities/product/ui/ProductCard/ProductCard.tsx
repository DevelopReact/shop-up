// react
import { FC, ReactNode, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
//api
import {
  useGetProductIdMutation,
  useGetProductsQuery
} from '../../api/productAPI';
import {
  useGetUsersQuery,
  useUpdateUserMutation
} from '@/entities/user/api/userAPI';
//selectors actions user
import { getUserState, userActions } from '@/entities/user';
//types actions products
import { IProduct, productActions } from '../..';
//selectors products
import { getProductState } from '@/entities/product/model/selector/getProductState';
//types
import { IUser } from '@/entities/user/model/types/userTypes';
//ui
import { LikeStarsCount } from '../LikeStarsCount';
import { IconButton } from '@/shared/ui/IconButton';
import { Button } from '@/shared/ui/Button';
//constants
import { jsonPlaceholderRootURL } from '@/shared/libs/constants/jsonPlaceholderBaseURL';
//assets svg
import WishIcon from '@/shared/libs/assets/svg/WishIcon.svg?react';
import EyeIcon from '@/shared/libs/assets/svg/EyeIcon.svg?react';
// styles
import styles from './ProductCard.module.scss';
import { IQuest } from '@/entities/quest/model/types/questTypes';
import { questActions } from '@/entities/quest/model/slice/questSlice';
import { computedTypesResolver } from '@hookform/resolvers/computed-types';

interface ProductCardProps {
  children: ReactNode;
  src: string;
  titleCard: string;
  price: number;
  discountPercent: number;
  productId: number;
}

export const ProductCard: FC<ProductCardProps> = ({
  children,
  src,
  titleCard,
  price,
  discountPercent,
  productId
}) => {
  const dispatch = useDispatch();

  const { isLoggedIn, user } = useSelector(getUserState);

  const [getProductId] = useGetProductIdMutation();
  const [updateUser] = useUpdateUserMutation();

  const [isHovered, setIsHovered] = useState(false);
  const [disabled, setDisabled] = useState(false);

  //disable selected product card
  const productsCart = useSelector(getProductState);
  useEffect(() => {
    productsCart?.data.map((product) => {
      if (product.id === productId) {
        setDisabled(true);
      }
    });
  }, [productsCart]);
  //calculation product price with discount
  const priceWithDiscount = Math.round(price - (price * discountPercent) / 100);
  //show/hide add card button
  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  //click add product to cart
  const onClickAddToCart = async (productId: number) => {
    const productData = await getProductId(productId);
    const newProduct: IProduct = productData.data.data;

    dispatch(productActions.setProductCart(newProduct));

    if (isLoggedIn) {
      const currentProducts = user.products || [];
      const updatedProducts = [...currentProducts, newProduct];

      await updateUser({
        ...user,
        products: updatedProducts
      })
        .unwrap()
        .then((data: IUser) => {
          if (data) {
            dispatch(userActions.setUser(data));
          }
        });
    } else {
      dispatch(questActions.setQuest(newProduct));
    }
  };

  return (
    <div
      className={styles.ProductCard}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={styles.card}>
        <Link to={`product/${productId}`}>
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
          <img src={`${jsonPlaceholderRootURL}${src}`} alt={titleCard} />
        </Link>
        {isHovered && (
          <Button
            type='button'
            backgroundColor='black'
            textColor='white'
            onClick={() => onClickAddToCart(productId)}
            disabled={disabled}
          >
            {!disabled ? 'Add To Cart' : 'Added'}
          </Button>
        )}
      </div>
      <div className={styles.titleCard}>
        <Link to={`product/${productId}`}>
          <div className={styles.describeCard}>
            <p>{titleCard}</p>
          </div>
          <div className={styles.price}>
            <div className={styles.currentPrice}>${priceWithDiscount}</div>
            <div className={styles.previousPrice}>
              {discountPercent ? `$${price}` : null}
            </div>
          </div>
        </Link>
        <LikeStarsCount />
      </div>
    </div>
  );
};
