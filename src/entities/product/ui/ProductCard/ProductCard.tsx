// react
import { FC, ReactNode, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
//api
import { useGetProductIdQuery } from '../../api/productAPI';
import { useUpdateUserMutation } from '@/entities/user/api/userAPI';
//actions
import { getUserState, userActions } from '@/entities/user';
import { getQuestState, questActions } from '@/entities/quest';
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
import { jsonPlaceholderBaseURL } from '@/shared/libs/constants/jsonPlaceholderBaseURL';
import { scrollUp } from '@/shared/libs/constants/scrollUp';
//assets svg
import EyeIcon from '@/shared/libs/assets/svg/EyeIcon.svg?react';
import LikeIconClickOff from '@/shared/libs/assets/svg/like-icon-off.svg?react';
import LikeIconClickOn from '@/shared/libs/assets/svg/like-icon-on.svg?react';
// styles
import styles from './ProductCard.module.scss';

interface ProductCardProps {
  children: ReactNode;
  src: string;
  titleCard: string;
  price: number;
  discountPercent: number;
  productId: number;
  icon?: ReactNode;
  iconAction: 'addToWishList' | 'DeleteCard';
}

export const ProductCard: FC<ProductCardProps> = ({
  children,
  src,
  titleCard,
  price,
  discountPercent,
  productId,
  icon,
  iconAction
}) => {
  const dispatch = useDispatch();

  const { isLoggedIn, user } = useSelector(getUserState);
  const { quest } = useSelector(getQuestState);
  const [updateUser] = useUpdateUserMutation();
  const { data: productById } = useGetProductIdQuery(productId);

  const [isHovered, setIsHovered] = useState(false);
  const [disabledCard, setDisabledCard] = useState(false);

  const currentUser = isLoggedIn ? user : quest;
  const isProductInWishlist = currentUser?.wishList?.some(
    (item) => item.id === productId
  );
  //disable selected product card
  const productsCart = useSelector(getProductState);
  useEffect(() => {
    productsCart?.data.map((product) => {
      if (product.id === productId) {
        setDisabledCard(true);
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

  const onClickAddToCart = async () => {
    const newProduct: IProduct = productById!.data;

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
      dispatch(questActions.setQuestProduct(newProduct));
    }
  };

  const onClickAddToWishList = () => {
    const newProduct: IProduct = productById!.data;

    if (isLoggedIn) {
      const currentWishList = user.wishList || [];

      const isProductInWishList = user.wishList?.some(
        (item) => item.id === newProduct.id
      );

      const updatedWishList = user.wishList?.map((item) => {
        return item.id === newProduct.id ? newProduct : item;
      });

      if (!isProductInWishList) {
        updateUser({
          ...user,
          wishList: [...currentWishList, newProduct]
        })
          .unwrap()
          .then((data: IUser) => {
            if (data) {
              dispatch(userActions.setUser(data));
            }
          });
      }

      if (isProductInWishList) {
        updateUser({
          ...user,
          wishList: updatedWishList
        })
          .unwrap()
          .then((data: IUser) => {
            if (data) {
              dispatch(userActions.setUser(data));
            }
          });
      }
    } else {
      const isProductInWishList = quest.wishList?.some(
        (item) => item.id === newProduct.id
      );

      const updatedWishList = quest.wishList?.map((item) => {
        return item.id === newProduct.id ? newProduct : item;
      });

      if (!isProductInWishList) {
        dispatch(questActions.setQuestWish(newProduct));
      }

      if (isProductInWishList) {
        dispatch(
          questActions.updateQuest({
            ...quest,
            wishList: updatedWishList
          })
        );
      }
    }
  };

  const onClickDeleteCard = async () => {
    if (isLoggedIn) {
      const newProductList = user.wishList?.filter(
        (product) => product.id !== productId
      );

      const updateUserData = {
        ...user,
        wishList: newProductList
      };

      dispatch(productActions.deleteProductId(productId));

      await updateUser(updateUserData)
        .unwrap()
        .then((data) => {
          if (data) {
            dispatch(userActions.setUser(updateUserData));
          }
        });
    } else {
      const updatedWishList = quest.wishList?.filter(
        (product) => product.id !== productId
      );

      const updateQuest = {
        ...quest,
        wishList: updatedWishList
      };

      dispatch(productActions.deleteProductId(productId));
      dispatch(questActions.updateQuest(updateQuest));
    }
  };

  const onClickIcon = () => {
    if (iconAction === 'addToWishList') {
      onClickAddToWishList();
    } else if (iconAction === 'DeleteCard') {
      onClickDeleteCard();
    }
  };

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
            <IconButton backgroundColor='white' onClick={onClickIcon}>
              <>
                {!icon &&
                  (isProductInWishlist ? (
                    <LikeIconClickOn />
                  ) : (
                    <LikeIconClickOff />
                  ))}
              </>
              {icon}
            </IconButton>
          </div>
          <Link to={`product/${productId}`}>
            <div className={styles.iconCard} onClick={() => scrollUp()}>
              <IconButton backgroundColor='white'>
                <EyeIcon />
              </IconButton>
            </div>
          </Link>
        </div>
        <img src={`${jsonPlaceholderBaseURL}${src}`} alt={titleCard} />
        {isHovered && (
          <Button
            type='button'
            backgroundColor='black'
            textColor='white'
            onClick={() => onClickAddToCart()}
            disabled={disabledCard}
          >
            {!disabledCard ? 'Add To Cart' : 'Added'}
          </Button>
        )}
      </div>
      <div className={styles.titleCard}>
        <div className={styles.describeCard}>
          <p>{titleCard}</p>
        </div>
        <div className={styles.price}>
          <div className={styles.currentPrice}>${priceWithDiscount}</div>
          <div className={styles.previousPrice}>
            {discountPercent ? `$${price}` : null}
          </div>
        </div>
        <LikeStarsCount />
      </div>
    </div>
  );
};
