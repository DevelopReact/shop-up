// react
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
//libs
import logInIcon from '@/shared/libs/assets/png/loginIcon.png';
import { getSignInRoute } from '@/shared/libs/constants/routes';
import { logInValidationSchema } from '../../libs/validation/logInValidationSchema';
//ui
import { Input } from '@/shared/ui/Input';
import { Button } from '@/shared/ui/Button';
import { Link } from '@/shared/ui/Link';
// styles
import styles from './LogIn.module.scss';

interface LogInProps {}

export const LogIn: FC<LogInProps> = ({}) => {
  const { formState, register, handleSubmit, reset } = useForm({
    mode: 'onChange',
    resolver: yupResolver(logInValidationSchema)
  });

  const onSubmit = handleSubmit((values) => {
    console.log(values);

    reset();
  });

  return (
    <div className={styles.LogIn}>
      <div className={styles.icon}>
        <img src={logInIcon} alt='logIn icon' />
      </div>
      <form className={styles.form} onSubmit={onSubmit}>
        <div className={styles.titleForm}>
          <p>Log in to Exclusive</p>
          <span>Enter your details below</span>
        </div>
        <div className={styles.wrapperInputs}>
          <div className={styles.inputForm}>
            <Input
              type='email'
              placeholder='Email'
              backgroundColor='white'
              register={register('email')}
              error={formState.errors.email}
            />
          </div>
          <div className={styles.inputForm}>
            <Input
              type='password'
              placeholder='Password'
              backgroundColor='white'
              register={register('password')}
              error={formState.errors.password}
            />
          </div>
        </div>
        <div className={styles.footerForm}>
          <div className={styles.submitForm}>
            <Button
              type='submit'
              backgroundColor='accent'
              textColor='white'
              height='large'
              disabled={!formState.isValid}
            >
              Log In
            </Button>
          </div>

          <Link to={getSignInRoute()} textColor='accent' textDecoration='none'>
            Forget Password?
          </Link>
        </div>
      </form>
    </div>
  );
};
