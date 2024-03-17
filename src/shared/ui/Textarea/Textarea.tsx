// react
import { FC } from 'react';
//lib
import classNames from 'classnames';
// styles
import styles from './Textarea.module.scss';
import { UseFormRegisterReturn } from 'react-hook-form';

interface TextareaProps {
  placeholder?: string;
  backgroundColor: 'white' | 'grey';
  textColor?: 'white';
  register?: UseFormRegisterReturn;
  error?: {
    message?: string;
  };
  label?: string;
}

export const Textarea: FC<TextareaProps> = ({
  placeholder,
  backgroundColor,
  textColor,
  error,
  register,
  label
}) => {
  return (
    <>
      <label>{label}</label>
      <textarea
        placeholder={placeholder}
        {...register}
        className={classNames(styles.Input, {
          [styles.whiteBC]: backgroundColor === 'white',
          [styles.greyBC]: backgroundColor === 'grey',
          [styles.whiteColor]: textColor === 'white',
          [styles.errorTextarea]: error
        })}
      />
      {error && <span>{error.message}</span>}
    </>
  );
};
