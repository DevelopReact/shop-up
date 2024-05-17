// react
import { ChangeEventHandler, FC } from 'react';
//lib
import classNames from 'classnames';
// styles
import styles from './Checkbox.module.scss';

interface CheckboxProps {
  label?: string;
  backgroundStyle: 'accent' | 'white';
  onChange: ChangeEventHandler<HTMLInputElement>;
  checked: boolean;
}

export const Checkbox: FC<CheckboxProps> = ({
  label,
  backgroundStyle,
  onChange,
  checked
}) => {
  return (
    <>
      <label className={styles.checkboxWrapper}>
        <input
          type='checkbox'
          checked={checked}
          onChange={onChange}
          className={classNames(styles.Checkbox, {
            [styles.accentBG]: backgroundStyle === 'accent',
            [styles.whiteBG]: backgroundStyle === 'white'
          })}
        />
        {label}
      </label>
    </>
  );
};
