// react
import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
//api
import { useUpdateUserMutation } from '@/entities/user/api/userAPI';
//actions
import { IProduct, productActions } from '@/entities/product';
import { questActions } from '@/entities/quest';
//selectors
import { getUserState, userActions } from '@/entities/user';
import { getQuestState } from '@/entities/quest';
//constants
import { jsonPlaceholderRootURL } from '@/shared/libs/constants/jsonPlaceholderBaseURL';
//assets
import ArrowUp from '@/shared/libs/assets/svg/ArrowUp.svg?react';
import ArrowDown from '@/shared/libs/assets/svg/ArrowDown.svg?react';
import CancelIcon from '@/shared/libs/assets/svg/icon-cancel.svg?react';
// styles
import styles from './CartItem.module.scss';

import { IUser } from '@/entities/user/model/types/userTypes';

interface CartItemProps {
  id: number;
  imageSrc: string;
  titleCard: string;
  price: number;
  discountPercent: number;
  quantity: number;
}

export const CartItem: FC<CartItemProps> = ({
  id,
  imageSrc,
  titleCard,
  price,
  discountPercent,
  quantity
}) => {
  const dispatch = useDispatch();

  const { user, isLoggedIn } = useSelector(getUserState);
  const { quest } = useSelector(getQuestState);

  const [updateUser] = useUpdateUserMutation();

  const [showCancelButton, setShowCancelButton] = useState<boolean>(false);

  const updateProductQuantity = async (updatedQuantity: number) => {
    if (isLoggedIn) {
      const newProductList = user.products?.map((product) =>
        product.id === id
          ? {
              ...product,
              attributes: {
                ...product.attributes,
                quantity: updatedQuantity
              }
            }
          : product
      );

      updateUser({ id: user.id, products: newProductList })
        .unwrap()
        .then((data: IUser) => {
          if (data) {
            dispatch(userActions.setUser(data));
          }
        });
    } else {
      const newProductList = quest.products?.map((product) =>
        product.id === id
          ? {
              ...product,
              attributes: {
                ...product.attributes,
                quantity: updatedQuantity
              }
            }
          : product
      );
      console.log(quest);
      dispatch(questActions.updateQuest({ products: newProductList }));
    }
  };
  //count quantity
  const onIncreaseQuantity = () => {
    updateProductQuantity(quantity + 1);
  };

  const onDecreaseQuantity = () => {
    if (quantity !== 1) {
      updateProductQuantity(quantity - 1);
    }
  };
  //show/hide cancel button
  const handleMouseEnter = () => {
    setShowCancelButton(!showCancelButton);
  };
  const handleMouseLeave = () => {
    setShowCancelButton(!showCancelButton);
  };
  //count price
  const priceWithDiscount = Math.round(price - (price * discountPercent) / 100);
  const currentPrice = discountPercent ? priceWithDiscount : price;

  const totalPrice = quantity * currentPrice;
  //delete product
  const deleteProduct = async (productId: number) => {
    if (isLoggedIn) {
      const newProductList = user.products?.filter(
        (product) => product.id !== productId
      );

      const updateUserData = {
        ...user,
        products: newProductList
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
      const newProductList = quest.products?.filter(
        (product) => product.id !== productId
      );

      const updateQuest = {
        products: newProductList
      };

      dispatch(productActions.deleteProductId(productId));
      dispatch(questActions.updateQuest(updateQuest));
    }
  };

  return (
    <>
      <div
        className={styles.rowTableCart}
        onMouseEnter={() => handleMouseEnter()}
        onMouseLeave={() => handleMouseLeave()}
      >
        {showCancelButton && (
          <div
            className={styles.cancelButton}
            onClick={() => deleteProduct(id)}
          >
            <CancelIcon />
          </div>
        )}
        <div className={styles.product}>
          <img src={`${jsonPlaceholderRootURL}${imageSrc}`} alt={titleCard} />
          <div className={styles.titleProduct}>
            <span>{titleCard}</span>
          </div>
        </div>
        <div className={styles.priceProduct}>
          <span>{currentPrice}</span>
        </div>
        <div className={styles.wrapperQuantity}>
          <div className={styles.quantity}>
            <div className={styles.inputQuantity}>
              <div className={styles.valueQuantity}>
                {quantity < 10 ? '0' + quantity : quantity}
              </div>
              <div className={styles.arrowsQuantity}>
                <ArrowUp onClick={() => onIncreaseQuantity()} />
                <ArrowDown onClick={() => onDecreaseQuantity()} />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.subtotal}>
          <span>{totalPrice > 0 ? totalPrice : 'out of stock'}</span>
        </div>
      </div>
    </>
  );
};
