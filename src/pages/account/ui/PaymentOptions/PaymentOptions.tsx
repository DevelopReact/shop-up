// react
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
//validation schemas
import { paymentOptionsValidationSchema } from './libs/validationSchema/paymentSchema';
//ui
import { Input } from '@/shared/ui/Input';
import { Button } from '@/shared/ui/Button';
// styles
import styles from './PaymentOptions.module.scss';

interface PaymentOptionsProps {}

export const PaymentOptions: FC<PaymentOptionsProps> = ({}) => {
  const { formState, register, handleSubmit, reset } = useForm({
    mode: 'onChange',
    resolver: yupResolver(paymentOptionsValidationSchema)
  });

  const onSubmit = handleSubmit((values) => {
    console.log(values);

    reset();
  });

  return (
    <>
      <form className={styles.formAccount} onSubmit={onSubmit}>
        <div className={styles.title}>
          <p>Edit Your Payment Options</p>
        </div>
        <div className={styles.securityData}>
          <div className={styles.inputForm}>
            <Input
              type='number'
              placeholder='0000 0000 0000 0000'
              backgroundColor='grey'
              register={register('cardNumber')}
              error={formState.errors.cardNumber}
              label='Card Number'
            />
          </div>
          <div className={styles.inputForm}>
            <Input
              type='text'
              placeholder='Md Rimel'
              backgroundColor='grey'
              register={register('cardName')}
              error={formState.errors.cardName}
              label='Name on Card'
            />
          </div>
        </div>

        <div className={styles.publicData}>
          <div className={styles.inputForm}>
            <Input
              type='text'
              placeholder='MM/YY'
              backgroundColor='grey'
              register={register('cardDate')}
              error={formState.errors.cardDate}
              label='Expiry Date'
            />
          </div>
          <div className={styles.inputForm}>
            <Input
              type='password'
              placeholder='000'
              backgroundColor='grey'
              register={register('securityCode')}
              error={formState.errors.securityCode}
              label='Security Code'
            />
          </div>
        </div>

        <div className={styles.wrapperButtons}>
          <div className={styles.buttonForm}>
            <Button
              type='reset'
              backgroundColor='white'
              textColor='black'
              height='large'
            >
              Cancel
            </Button>
          </div>
          <div className={styles.buttonForm}>
            <Button
              type='submit'
              backgroundColor='accent'
              textColor='white'
              height='large'
              disabled={!formState.isValid}
            >
              Save Changes
            </Button>
          </div>
        </div>
      </form>
    </>
  );
};
