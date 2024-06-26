// react
import { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
//lib
import { yupResolver } from '@hookform/resolvers/yup';
//actions
import { useUpdateUserMutation } from '@/entities/user/api/userAPI';
//selectors
import { getUserState, userActions } from '@/entities/user';
import { getQuestState, questActions } from '@/entities/quest';
//ui
import { Input } from '@/shared/ui/Input';
import { Button } from '@/shared/ui/Button';
import { CartItem } from '@/pages/cart/ui/CartItem';
import { CartTotal } from '@/pages/cart/ui/CartTotal';
import { Checkbox } from '@/shared/ui/Checkbox';
//assets
import Check from '@/shared/libs/assets/svg/Check.svg?react';
import Bkash from '@/shared/libs/assets/png/Bkash.png';
import Visa from '@/shared/libs/assets/png/Visa.png';
import Nagad from '@/shared/libs/assets/png/Nagad.png';
import Mastercard from '@/shared/libs/assets/png/Mastercard.png';
//validationSchemas
import { checkOutSchema } from './libs/validationSchemas/checkOutSchema';
// styles
import styles from './CheckOut.module.scss';

interface CheckOutProps {}

export const CheckOut: FC<CheckOutProps> = ({}) => {
  const dispatch = useDispatch();
  const [isChecked, setIsChecked] = useState(false);

  const { user, isLoggedIn } = useSelector(getUserState);
  const { quest } = useSelector(getQuestState);
  const [updateUser] = useUpdateUserMutation();

  const currentUser = isLoggedIn ? user : quest;

  const onChange = () => {
    setIsChecked(!isChecked);
  };

  const { formState, register, handleSubmit, reset, setValue } = useForm<any>({
    mode: 'onChange',
    resolver: yupResolver(checkOutSchema)
  });

  const onSubmit = handleSubmit(
    ({
      companyName,
      streetAddress,
      apartment,
      town,
      phone,
      firstName,
      email
    }) => {
      if (isLoggedIn) {
        updateUser({
          ...user,
          companyName: companyName,
          streetAddress: streetAddress,
          apartment: apartment,
          town: town,
          phone: phone
        })
          .unwrap()
          .then((data) => {
            if (data) {
              dispatch(userActions.setUser(data));
            }
          });
      } else {
        dispatch(
          questActions.updateQuest({
            products: quest.products,
            wishList: quest.wishList,
            username: firstName,
            email,
            companyName,
            streetAddress,
            apartment,
            town,
            phone
          })
        );
      }

      reset();
    }
  );

  useEffect(() => {
    if (isLoggedIn) {
      setValue('firstName', user.username);
      setValue('companyName', user.companyName);
      setValue('streetAddress', user.streetAddress);
      setValue('apartment', user.apartment);
      setValue('town', user.town);
      setValue('phone', user.phone);
      setValue('email', user.email);
    }
  }, [currentUser, setValue]);

  return (
    <div className={styles.CheckOut}>
      <div className={styles.headerAccount}>
        <div className={styles.roadMap}>
          <p>
            Account My&nbsp;/&nbsp;Account&nbsp;/&nbsp;Product
            View&nbsp;/&nbsp;Cart&nbsp;/&nbsp;
          </p>
          <span>CheckOut</span>
        </div>
      </div>
      <div className={styles.title}>
        <p>Billing Details</p>
      </div>
      <div className={styles.wrapperCheckOut}>
        <div className={styles.billingDetails}>
          <form className={styles.formBillingDetails} onSubmit={onSubmit}>
            <div className={styles.inputForm}>
              <Input
                type='text'
                backgroundColor='grey'
                register={register('firstName')}
                error={formState.errors.firstName}
                label='First Name*'
                setValue={setValue}
              />
            </div>
            <div className={styles.inputForm}>
              <Input
                type='text'
                backgroundColor='grey'
                register={register('companyName')}
                error={formState.errors.companyName}
                label='Company Name'
                setValue={setValue}
              />
            </div>
            <div className={styles.inputForm}>
              <Input
                type='text'
                backgroundColor='grey'
                register={register('streetAddress')}
                error={formState.errors.streetAddress}
                label='Street Address*'
                setValue={setValue}
              />
            </div>
            <div className={styles.inputForm}>
              <Input
                type='text'
                backgroundColor='grey'
                register={register('apartment')}
                error={formState.errors.apartment}
                label='Apartment, floor, etc. (optional)'
                setValue={setValue}
              />
            </div>
            <div className={styles.inputForm}>
              <Input
                type='text'
                backgroundColor='grey'
                register={register('town')}
                error={formState.errors.town}
                label='Town/City*'
                setValue={setValue}
              />
            </div>
            <div className={styles.inputForm}>
              <Input
                type='tel'
                backgroundColor='grey'
                register={register('phone')}
                error={formState.errors.phone}
                label='Phone Number*'
                setValue={setValue}
              />
            </div>
            <div className={styles.inputForm}>
              <Input
                type='email'
                backgroundColor='grey'
                register={register('email')}
                error={formState.errors.email}
                label='Email Address*'
                setValue={setValue}
              />
            </div>
            <div className={styles.buttonForm}>
              <Button
                type='submit'
                backgroundColor='accent'
                textColor='white'
                height='large'
                disabled={!formState.isValid}
              >
                <Check />
              </Button>
              <span>Save this information for faster check-out next time</span>
            </div>
          </form>
        </div>
        <div className={styles.orderDetails}>
          <div className={styles.listCart}>
            {currentUser.products?.map(({ id, attributes }) => {
              return (
                <div className={styles.rowTableCart} key={id}>
                  <CartItem
                    id={id}
                    imageSrc={attributes.mainPicture.data.attributes.url}
                    titleCard={attributes.title}
                    price={attributes.price}
                    discountPercent={attributes.discountPercent}
                    quantity={attributes.quantity!}
                  />
                </div>
              );
            })}
          </div>
          <CartTotal />
          <div className={styles.paymentDetails}>
            <div className={styles.paymentCheckbox}>
              <Checkbox
                label='Bank'
                backgroundStyle='white'
                onChange={onChange}
                checked={isChecked}
              />
              <Checkbox
                label='Cash on delivery'
                backgroundStyle='white'
                onChange={onChange}
                checked={!isChecked}
              />
            </div>
            <div className={styles.payCards}>
              <img src={Bkash} />
              <img src={Visa} />
              <img src={Mastercard} />
              <img src={Nagad} />
            </div>
          </div>
          <div className={styles.buttonPlaceOrder}>
            <Button type='button' backgroundColor='accent' textColor='white'>
              Place Order
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
