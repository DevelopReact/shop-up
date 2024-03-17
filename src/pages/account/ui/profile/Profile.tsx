// react
import { FC } from 'react';
import { useForm } from 'react-hook-form';
//lib
import { yupResolver } from '@hookform/resolvers/yup';
//validation schemas
import { profileValidationSchema } from './libs/validationSchemas/profileSchema';
//ui
import { Input } from '@/shared/ui/Input';
import { Button } from '@/shared/ui/Button';
// styles
import styles from './Profile.module.scss';

interface ProfileProps {}

export const Profile: FC<ProfileProps> = ({}) => {
  const { formState, register, handleSubmit, reset } = useForm({
    mode: 'onChange',
    resolver: yupResolver(profileValidationSchema)
  });

  const onSubmit = handleSubmit((values) => {
    console.log(values);

    reset();
  });

  return (
    <>
      <form className={styles.formAccount} onSubmit={onSubmit}>
        <div className={styles.title}>
          <p>Edit Your Profile</p>
        </div>
        <div className={styles.publicData}>
          <div className={styles.inputForm}>
            <Input
              type='text'
              placeholder='Md'
              backgroundColor='grey'
              register={register('name')}
              error={formState.errors.name}
              label='First Name'
            />
          </div>
          <div className={styles.inputForm}>
            <Input
              type='text'
              placeholder='Rimel'
              backgroundColor='grey'
              error={formState.errors.lastName}
              register={register('lastName')}
              label='Last Name'
            />
          </div>
        </div>
        <div className={styles.publicData}>
          <div className={styles.inputForm}>
            <Input
              type='email'
              placeholder='rimel1111@gmail.com'
              backgroundColor='grey'
              error={formState.errors.email}
              register={register('email')}
              label='Email'
            />
          </div>
          <div className={styles.inputForm}>
            <Input
              type='text'
              placeholder='Kingston, 5236, United State'
              backgroundColor='grey'
              error={formState.errors.address}
              register={register('address')}
              label='Address'
            />
          </div>
        </div>
        <div className={styles.securityData}>
          <div className={styles.inputForm}>
            <Input
              type='password'
              placeholder='Current Passwod'
              backgroundColor='grey'
              error={formState.errors.password}
              register={register('password')}
              label='Password Changes'
            />
          </div>
          <div className={styles.inputForm}>
            <Input
              type='password'
              placeholder='New Passwod'
              backgroundColor='grey'
              error={formState.errors.newPassword}
              register={register('newPassword')}
            />
          </div>
          <div className={styles.inputForm}>
            <Input
              type='password'
              placeholder='Confirm New Password'
              backgroundColor='grey'
              error={formState.errors.confirmPassword}
              register={register('confirmPassword')}
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
