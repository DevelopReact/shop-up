// react
import { FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
//api
import { useUpdateUserMutation } from '@/entities/user/api/userAPI';
//actions
import { IProduct, productActions } from '@/entities/product';
import { questActions } from '@/entities/quest';
//selectors
import { getUserState, userActions } from '@/entities/user';
import { getQuestState } from '@/entities/quest';
//ui
import { ProductItem } from '../ProductItem';
//assets
import ArrowUp from '@/shared/libs/assets/svg/ArrowUp.svg?react';
import ArrowDown from '@/shared/libs/assets/svg/ArrowDown.svg?react';
import CancelIcon from '@/shared/libs/assets/svg/icon-cancel.svg?react';
// styles
import styles from './CartItem.module.scss';
import { useGetProductIdMutation } from '@/entities/product/api/productAPI';

interface CartItemProps {}

export const CartItem: FC<CartItemProps> = ({}) => {
  const dispatch = useDispatch();

  const { user, isLoggedIn } = useSelector(getUserState);
  const { quest } = useSelector(getQuestState);

  const [updateUser] = useUpdateUserMutation();
  const [getProductId] = useGetProductIdMutation();

  const [showCancelButton, setShowCancelButton] = useState<number | null>(null);
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});

  const updateQuantity = (productId: number, quantity: number) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: quantity
    }));
  };

  const getQuantity = (productId: number) => {
    return quantities[productId] || 1;
  };

  const onIncreaseQuantity = async (productId: number) => {
    const newQuantity = getQuantity(productId) + 1;
    updateQuantity(productId, newQuantity);

    const productData = await getProductId(productId).unwrap();
    const currentProduct: IProduct = productData.data;

    const productWithQuantity = {
      ...currentProduct,
      attributes: {
        ...currentProduct.attributes,
        quantity: newQuantity
      }
    };

    if (isLoggedIn) {
      const updatedUserData = {
        ...user,
        products: user.products?.map((product) => {
          product.id === productId ? productWithQuantity : product;
        })
      };

      console.log(updatedUserData);

      // await updateUser(updatedUserData)
      //   .unwrap()
      //   .then((data) => console.log(data));
    }
  };

  const onDecreaseQuantity = (productId: number) => {
    const currentQuantity = getQuantity(productId);
    if (currentQuantity > 1) {
      const newQuantity = currentQuantity - 1;
      updateQuantity(productId, newQuantity);
    }
  };

  const handleMouseEnter = (productId: number) => {
    setShowCancelButton(productId);
  };

  const handleMouseLeave = () => {
    setShowCancelButton(null);
  };

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

      dispatch(questActions.updateQuest(updateQuest));
    }
  };

  const productsList = isLoggedIn ? user.products : quest.products;

  return productsList?.map(({ id, attributes }) => {
    const priceWithDiscount = Math.round(
      attributes?.price -
        (attributes?.price * attributes?.discountPercent) / 100
    );
    const quantity = quantities[id] || 1;

    const totalPrice = attributes?.discountPercent
      ? priceWithDiscount * quantity
      : attributes?.price * quantity;

    return (
      <div
        className={styles.rowTableCart}
        key={id}
        onMouseEnter={() => handleMouseEnter(id)}
        onMouseLeave={() => handleMouseLeave()}
      >
        {showCancelButton === id && (
          <div
            className={styles.cancelButton}
            onClick={() => deleteProduct(id)}
          >
            <CancelIcon />
          </div>
        )}
        <ProductItem
          imageSrc={attributes?.mainPicture.data.attributes.url}
          titleCard={attributes?.title}
          price={attributes?.price}
          discountPercent={attributes?.discountPercent}
          columnStyle='columnCenter'
        />
        <div className={styles.column}>
          <div className={styles.quantity}>
            <div className={styles.inputQuantity}>
              <div className={styles.valueQuantity}>
                {quantity < 10 ? '0' + quantity : quantity}
              </div>
              <div className={styles.arrowsQuantity}>
                <ArrowUp onClick={() => onIncreaseQuantity(id)} />
                <ArrowDown onClick={() => onDecreaseQuantity(id)} />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.column}>${totalPrice}</div>
      </div>
    );
  });
};
