// react
import { ChangeEvent, FC } from 'react';
//lib
import classNames from 'classnames';
// styles
import styles from './RadioButton.module.scss';

interface RadioButtonProps {
  label?: string;
  checked: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  backgroundColor: 'yellow' | 'accent' | 'blue' | 'red';
}

export const RadioButton: FC<RadioButtonProps> = ({
  label,
  checked,
  onChange,
  backgroundColor
}) => {
  return (
    <>
      <label className={styles.buttonWrapper}>
        <input
          type='radio'
          onChange={onChange}
          checked={checked}
          className={classNames(styles.RadioButton, {
            [styles.yellowBC]: backgroundColor === 'yellow',
            [styles.redBC]: backgroundColor === 'red',
            [styles.accentBC]: backgroundColor === 'accent',
            [styles.blueBC]: backgroundColor === 'blue'
          })}
        />
        {label}
      </label>
    </>
  );
};
