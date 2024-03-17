// react
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
//libs
import GoogleIcon from '@/shared/libs/assets/svg/Icon-Google.svg?react';
import logInIcon from '@/shared/libs/assets/png/loginIcon.png';
import { getLogInRoute } from '@/shared/libs/constants/routes';
import { signUpValidationSchema } from '../../libs/validation/signUpValidationSchema';
//ui
import { Input } from '@/shared/ui/Input';
import { Button } from '@/shared/ui/Button';
import { Link } from '@/shared/ui/Link';
// styles
import styles from './SignUp.module.scss';

interface SignUpProps {}

export const SignUp: FC<SignUpProps> = ({}) => {
  const { formState, register, handleSubmit, reset } = useForm({
    mode: 'onChange',
    resolver: yupResolver(signUpValidationSchema)
  });

  const onSubmit = handleSubmit((values) => {
    console.log(values);

    reset();
  });
  return (
    <div className={styles.SignUp}>
      <div className={styles.icon}>
        <img src={logInIcon} alt='logIn icon' />
      </div>
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
              register={register('name')}
              error={formState.errors.name}
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
    </div>
  );
};
