// react
import { FC, HTMLInputTypeAttribute } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
//lib
import classNames from 'classnames';
// styles
import styles from './Input.module.scss';

interface InputProps {
  placeholder?: string;
  type: HTMLInputTypeAttribute;
  backgroundColor: 'white' | 'black' | 'grey';
  borderColor?: 'black' | 'blackOpacity';
  textColor?: 'white' | 'black';
  register?: UseFormRegisterReturn;
  error?: {
    message?: string;
  };
  label?: string;
  value?: string;
}

export const Input: FC<InputProps> = ({
  type,
  placeholder,
  backgroundColor,
  borderColor,
  textColor,
  error,
  register,
  label,
  value
}) => {
  return (
    <>
      <div className={styles.label}>
        <label>{label}</label>
      </div>
      <input
        {...register}
        type={type}
        value={value}
        placeholder={placeholder}
        className={classNames(styles.Input, {
          [styles.whiteBC]: backgroundColor === 'white',
          [styles.blackBC]: backgroundColor === 'black',
          [styles.greyBC]: backgroundColor === 'grey',
          [styles.borderBlack]: borderColor === 'black',
          [styles.borderOpacity]: borderColor === 'blackOpacity',
          [styles.whiteColor]: textColor === 'white',
          [styles.errorInput]: error
        })}
      />
      {error && <span>{error.message}</span>}
    </>
  );
};
