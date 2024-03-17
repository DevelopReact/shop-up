// react
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
//validation schema
import { addressBookValidationSchema } from './libs/validationSchemas/addressBookSchema';
//ui
import { Input } from '@/shared/ui/Input';
import { Button } from '@/shared/ui/Button';
import { Textarea } from '@/shared/ui/Textarea';
// styles
import styles from './AddressBook.module.scss';

interface AddressBookProps {}

export const AddressBook: FC<AddressBookProps> = ({}) => {
  const { formState, register, handleSubmit, reset } = useForm({
    mode: 'onChange',
    resolver: yupResolver(addressBookValidationSchema)
  });

  const onSubmit = handleSubmit((values) => {
    console.log(values);

    reset();
  });

  return (
    <>
      <form className={styles.formAccount} onSubmit={onSubmit}>
        <div className={styles.title}>
          <p>Edit Your Address</p>
        </div>
        <div className={styles.publicData}>
          <div className={styles.inputForm}>
            <Input
              type='text'
              placeholder='Ukraine'
              backgroundColor='grey'
              register={register('country')}
              error={formState.errors.country}
              label='Country'
            />
          </div>
          <div className={styles.inputForm}>
            <Input
              type='text'
              placeholder='Kyiv'
              backgroundColor='grey'
              register={register('city')}
              error={formState.errors.city}
              label='City'
            />
          </div>
        </div>
        <div className={styles.publicData}>
          <div className={styles.inputForm}>
            <Input
              type='text'
              placeholder='00000'
              backgroundColor='grey'
              register={register('postCode')}
              error={formState.errors.postCode}
              label='Post Code'
            />
          </div>
          <div className={styles.inputForm}>
            <Input
              type='text'
              placeholder='Stepana Bandery Avenue, 6'
              backgroundColor='grey'
              register={register('bookAddress')}
              error={formState.errors.bookAddress}
              label='Address'
            />
          </div>
        </div>
        <div className={styles.securityData}>
          <div className={styles.inputForm}>
            <Textarea
              placeholder='...'
              backgroundColor='grey'
              register={register('notions')}
              error={formState.errors.notions}
              label='Notions'
            ></Textarea>
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
