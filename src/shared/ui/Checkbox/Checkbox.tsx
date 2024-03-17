// react
import { FC, useState } from 'react';
//lib
import classNames from 'classnames';
// styles
import styles from './Checkbox.module.scss';

interface CheckboxProps {
  label: string;
  backgroundStyle: 'accent';
}

export const Checkbox: FC<CheckboxProps> = ({ label, backgroundStyle }) => {
  const [isChecked, setIsChecked] = useState(false);

  const onChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <>
      <label className={styles.checkboxWrapper}>
        <input
          type='checkbox'
          checked={isChecked}
          onChange={onChange}
          className={classNames(styles.Checkbox, {
            [styles.accent]: backgroundStyle === 'accent'
          })}
        />
        {label}
      </label>
    </>
  );
};
