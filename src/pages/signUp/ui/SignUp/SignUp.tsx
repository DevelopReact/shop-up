// react
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router';
//react-redux
import { useDispatch } from 'react-redux';
//types
import { ISignUpFormValues } from '../../model/signUpTypes';
//validation schemas
import { signUpValidationSchema } from '../../libs/validation/signUpValidationSchema';
//slice actions
import { userActions } from '@/entities/user';
//features api
import { useRegisterUserMutation } from '@/features/userAuth/api/userAuthAPI';
//feature types
import { IPostUserResponse } from '@/features/userAuth/model/userAuthTypes';
//shared ui
import { Input } from '@/shared/ui/Input';
import { Button } from '@/shared/ui/Button';
import { Link } from '@/shared/ui/Link';
import { Loader } from '@/shared/ui/Loader';
//routes
import {
  getErrorRoute,
  getHomeRoute,
  getLogInRoute
} from '@/shared/libs/constants/routes';
//constants
import { scrollUp } from '@/shared/libs/constants/scrollUp';
//assets
import GoogleIcon from '@/shared/libs/assets/svg/Icon-Google.svg?react';
import logInIcon from '@/shared/libs/assets/png/loginIcon.png';
// styles
import styles from './SignUp.module.scss';

interface SignUpProps {}

export const SignUp: FC<SignUpProps> = ({}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [registerUser, { isLoading, isError, isSuccess }] =
    useRegisterUserMutation();

  const { formState, register, handleSubmit, reset } =
    useForm<ISignUpFormValues>({
      mode: 'onChange',
      criteriaMode: 'firstError',
      resolver: yupResolver<any>(signUpValidationSchema),
      defaultValues: {
        email: '',
        password: '',
        username: ''
      }
    });

  const onSubmit = handleSubmit((data: ISignUpFormValues) => {
    registerUser({
      username: data.username,
      email: data.email,
      password: data.password
    })
      .unwrap()
      .then((data: IPostUserResponse) => {
        if (data && isSuccess) {
          dispatch(userActions.setUser(data.user));
          navigate(getHomeRoute());
          scrollUp();
        }
      });

    reset();
  });

  if (isError) {
    navigate(getErrorRoute());
    scrollUp();
  }

  return (
    <div className={styles.SignUp}>
      <div className={styles.icon}>
        <img src={logInIcon} alt='logIn icon' />
      </div>
      {isLoading ? (
        <Loader />
      ) : (
        <form className={styles.form} onSubmit={onSubmit}>
          <div className={styles.titleForm}>
            <p>Create an account</p>
            <span>Enter your details below</span>
          </div>
          <div className={styles.wrapperInputs}>
            <div className={styles.inputForm}>
              <Input
                type='name'
                placeholder='Name'
                backgroundColor='white'
                register={register('username')}
                error={formState.errors.username}
              />
            </div>
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
          <div className={styles.submitForm}>
            <Button
              type='submit'
              backgroundColor='accent'
              textColor='white'
              height='large'
              disabled={!formState.isValid}
            >
              Create Account
            </Button>
            <Button
              type='button'
              backgroundColor='white'
              textColor='black'
              borderColor='black'
              height='large'
            >
              <GoogleIcon />
              <p>Sign up with Google</p>
            </Button>
          </div>
          <div className={styles.footerForm}>
            <span>Already have account?</span>
            <Link
              to={getLogInRoute()}
              textColor='black'
              textDecoration='underline'
            >
              Log in
            </Link>
          </div>
        </form>
      )}
    </div>
  );
};
