// react
import { FC, HTMLInputTypeAttribute, useEffect } from 'react';
import {
  FieldValues,
  UseFormRegisterReturn,
  UseFormSetValue
} from 'react-hook-form';
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
  setValue?: UseFormSetValue<FieldValues>;
  value?: string;
  error?: {
    message?: string;
  };
  label?: string;
}

export const Input: FC<InputProps> = ({
  type,
  placeholder,
  backgroundColor,
  borderColor,
  textColor,
  error,
  register,
  setValue,
  value,
  label
}) => {
  //TODO use setValue in component
  useEffect(() => {
    if (setValue && value) {
      setValue(register?.name!, value, { shouldValidate: true });
    }
  }, [value, setValue, register]);

  return (
    <>
      <div className={styles.label}>
        <label>{label}</label>
      </div>
      <input
        {...register}
        type={type}
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
