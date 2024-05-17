// react
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router';
//react-redux
import { useDispatch } from 'react-redux';
//types
import { ILogInFormValues } from '../../model/logInTypes';
//slice
import { userActions } from '@/entities/user';
//libs assets
import logInIcon from '@/shared/libs/assets/png/loginIcon.png';
//features api
import { useLogInUserMutation } from '@/features/userAuth/api/userAuthAPI';
//shared ui
import { Input } from '@/shared/ui/Input';
import { Button } from '@/shared/ui/Button';
import { Link } from '@/shared/ui/Link';
import { Loader } from '@/shared/ui/Loader';
//constants
import { scrollUp } from '@/shared/libs/constants/scrollUp';
import { getHomeRoute, getSignInRoute } from '@/shared/libs/constants/routes';
//validation schemas
import { logInValidationSchema } from '../../libs/validation/logInValidationSchema';
// styles
import styles from './LogIn.module.scss';
import { IPostUserResponse } from '@/features/userAuth/model/userAuthTypes';

interface LogInProps {}

export const LogIn: FC<LogInProps> = ({}) => {
  const [logInUser, { isLoading, isError, isSuccess }] = useLogInUserMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { formState, register, handleSubmit, reset } =
    useForm<ILogInFormValues>({
      mode: 'onChange',
      resolver: yupResolver(logInValidationSchema) as any
    });

  const onSubmit = handleSubmit(async (data: ILogInFormValues) => {
    await logInUser({
      identifier: data.email,
      password: data.password
    })
      .unwrap()
      .then((data: IPostUserResponse) => {
        if (data) {
          dispatch(userActions.setUser(data.user));
        }
      });

    reset();
  });

  if (isError) {
    navigate(getSignInRoute());
    scrollUp();
  }

  if (isSuccess) {
    navigate(getHomeRoute());
    scrollUp();
  }

  return (
    <div className={styles.LogIn}>
      <div className={styles.icon}>
        <img src={logInIcon} alt='logIn icon' />
      </div>
      {isLoading ? (
        <Loader />
      ) : (
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

            <Link
              to={getSignInRoute()}
              textColor='accent'
              textDecoration='none'
            >
              Forget Password?
            </Link>
          </div>
        </form>
      )}
    </div>
  );
};
