// react
import { FC, useState } from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
//libs
import classNames from 'classnames';
//api
import { useGetProductIdQuery } from '../../api/productAPI';
import { useUpdateUserMutation } from '@/entities/user/api/userAPI';
//entities slice
import { getUserState, userActions } from '@/entities/user';
import { getQuestState, questActions } from '@/entities/quest';
//ui
import { LikeStarsCount } from '../LikeStarsCount';
import { ProductSizeOptions } from '../ProductSizeOptions';
import { ProductColorOptions } from '../ProductColorOptions';
import { RelatedItem } from '../RelatedItem';
import { Button } from '@/shared/ui/Button';
//constants
import { jsonPlaceholderRootURL } from '@/shared/libs/constants/jsonPlaceholderBaseURL';
//assets
import IconDelivery from '@/shared/libs/assets/svg/icon-delivery.svg?react';
import IconReturns from '@/shared/libs/assets/svg/Icon-return.svg?react';
import IconPlus from '@/shared/libs/assets/svg/icon-plus.svg?react';
import IconMinus from '@/shared/libs/assets/svg/icon-minus.svg?react';
import WishIcon from '@/shared/libs/assets/svg/WishIcon.svg?react';
// styles
import styles from './ProductDetails.module.scss';
import { IProduct } from '../..';
import { IUser } from '@/entities/user/model/types/userTypes';

interface ProductDetailsProps {}

export const ProductDetails: FC<ProductDetailsProps> = ({}) => {
  const dispatch = useDispatch();
  const { productId } = useParams();

  const { user, isLoggedIn } = useSelector(getUserState);
  const { quest } = useSelector(getQuestState);

  const [updateUser] = useUpdateUserMutation();

  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [activeDecreaseButton, setActiveDecreaseButton] = useState(false);
  const [activeIncreaseButton, setActiveIncreaseButton] = useState(false);
  const [count, setCount] = useState(1);
  const [activeWish, setActiveWish] = useState(false);

  const { data: productById } = useGetProductIdQuery(Number(productId));

  const handleSizeChange = (size: string) => {
    setSelectedSize(size);
  };
  const handleColorChange = (color: string) => {
    setSelectedColor(color);
  };

  const priceWithDiscount = Math.round(
    productById! &&
      productById.data.attributes.price -
        (productById.data.attributes.price *
          productById.data.attributes.discountPercent) /
          100
  );

  const onClickDecrease = () => {
    if (count > 1) {
      setActiveDecreaseButton(true);
      setActiveIncreaseButton(false);
      setCount(count - 1);
    }
  };
  const onClickIncrease = () => {
    setActiveIncreaseButton(true);
    setActiveDecreaseButton(false);
    setCount(count + 1);
    if (count < 1) {
      setCount(1);
    }
  };

  const onClickUpdateCartProducts = () => {
    const updateProductById: IProduct = {
      id: productById?.data.id!,
      attributes: {
        ...productById?.data.attributes!,
        sizes: [selectedSize] || [],
        colors: [selectedColor] || [],
        quantity: count
      }
    };

    if (isLoggedIn) {
      const currentProducts = user.products || [];

      const isProductInCart = currentProducts.some(
        (item) => item.id === productById?.data.id
      );

      const updatedProducts = currentProducts.map((item) => {
        return item.id === productById?.data.id ? updateProductById : item;
      });

      if (!isProductInCart) {
        updateUser({
          id: user.id,
          products: [...currentProducts, updateProductById]
        })
          .unwrap()
          .then((data) => {
            if (data) {
              dispatch(userActions.setUser(data));
            }
          });
      }

      if (isProductInCart) {
        updateUser({
          id: user.id,
          products: updatedProducts
        })
          .unwrap()
          .then((data) => {
            if (data) {
              dispatch(userActions.setUser(data));
            }
          });
      }
    } else {
      const currentProducts = quest.products || [];

      const isProductInCart = currentProducts.some(
        (item) => item.id === productById?.data.id
      );

      const updatedProducts = currentProducts.map((item) => {
        return item.id === productById?.data.id ? updateProductById : item;
      });

      if (!isProductInCart) {
        dispatch(questActions.setQuestProduct(updateProductById));
      }

      if (isProductInCart) {
        dispatch(
          questActions.updateQuest({
            ...quest,
            products: updatedProducts
          })
        );
      }
    }
  };

  const onClickAddToWishList = () => {
    setActiveWish(!activeWish);

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
  //unblock buy button
  const isBuyButtonDisabled = !(
    (productById?.data.attributes.sizes.length === 0 || selectedSize) &&
    (productById?.data.attributes.colors.length === 0 || selectedColor) &&
    count > 0
  );

  return (
    <div className={styles.ProductDetails}>
      <div className={styles.headerContact}>
        <div className={styles.roadMap}>
          <p>
            Account&nbsp;/&nbsp;{productById?.data.attributes.category}
            &nbsp;/&nbsp;
          </p>
          <span>{productById?.data.attributes.title}</span>
        </div>
      </div>
      <div className={styles.mainProductDetails}>
        <div className={styles.productPictures}>
          <div className={styles.minorPictures}>
            {productById?.data.attributes.pictures.data?.map((data) => {
              return (
                <div className={styles.picture} key={data.id}>
                  <img
                    src={`${jsonPlaceholderRootURL}${data.attributes.url}`}
                  />
                </div>
              );
            })}
          </div>
          <div className={styles.mainPicture}>
            <img
              src={`${jsonPlaceholderRootURL}${productById?.data.attributes.mainPicture.data.attributes.url}`}
              alt={productById?.data.attributes.title}
            />
          </div>
        </div>
        <div className={styles.productOptions}>
          <div className={styles.productData}>
            <div className={styles.productTitle}>
              <h1>{productById?.data.attributes.title}</h1>
            </div>
            <div className={styles.productLikes}>
              <LikeStarsCount />
              <span>(150 Reviews)</span>
              <span>&nbsp;|&nbsp;</span>
              <p>In Stock</p>
            </div>
            <div className={styles.productPrice}>
              <h2>${priceWithDiscount.toFixed(2)}</h2>
            </div>
            <div className={styles.productDescription}>
              <p>{productById?.data.attributes.description}</p>
            </div>
          </div>
          <div className={styles.productVarietyChoice}>
            <div className={styles.productColors}>
              {productById?.data.attributes.colors ? <p>Colors:</p> : null}
              {productById?.data.attributes.colors?.map((color: string) => {
                return (
                  <ProductColorOptions
                    buttonBackground={color}
                    color={color}
                    key={color}
                    onSelectColor={handleColorChange}
                    selectColor={selectedColor}
                  />
                );
              })}
            </div>
            <div className={styles.productSizes}>
              {productById?.data.attributes.sizes ? <p>Size:&nbsp;</p> : null}
              {productById?.data.attributes.sizes?.map((size: string) => {
                return (
                  <ProductSizeOptions
                    key={size}
                    size={size}
                    selectedSize={selectedSize}
                    onSelectSize={handleSizeChange}
                  />
                );
              })}
            </div>
            <div className={styles.wrapperChoiceButtons}>
              <div className={styles.ProductButtonOptions}>
                <div className={styles.wrapperCountButtons}>
                  <button
                    onClick={onClickDecrease}
                    className={classNames(styles.countDecreaseButton, {
                      [styles.active]: activeDecreaseButton
                    })}
                  >
                    <IconMinus />
                  </button>
                  <div className={styles.count}>
                    <p>{count}</p>
                  </div>
                  <button
                    onClick={onClickIncrease}
                    className={classNames(styles.countIncreaseButton, {
                      [styles.active]: activeIncreaseButton
                    })}
                  >
                    <IconPlus />
                  </button>
                </div>
                <div className={styles.buyButton}>
                  <Button
                    backgroundColor='accent'
                    type='button'
                    disabled={isBuyButtonDisabled}
                    onClick={onClickUpdateCartProducts}
                  >
                    Buy Now
                  </Button>
                </div>
                <button
                  className={classNames(styles.wishButton, {
                    [styles.activeWish]: activeWish
                  })}
                  onClick={() => onClickAddToWishList()}
                >
                  <WishIcon />
                </button>
              </div>
            </div>
          </div>
          <div className={styles.delivery}>
            <div className={styles.freeDelivery}>
              <IconDelivery />
              <div className={styles.titleDelivery}>
                <p>Free Delivery</p>
                <span>Enter your postal code for Delivery Availability</span>
              </div>
            </div>
            <div className={styles.returnDelivery}>
              <IconReturns />
              <div className={styles.titleDelivery}>
                <p>Return Delivery</p>
                <span>Free 30 Days Delivery Returns. Details</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <RelatedItem />
    </div>
  );
};
