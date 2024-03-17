// react
import { FC, ReactNode } from 'react';
//lib
import classNames from 'classnames';
// styles
import styles from './Button.module.scss';

interface ButtonProps {
  children: ReactNode;
  icon?: ReactNode;
  type: 'submit' | 'reset' | 'button';
  disabled?: boolean;
  backgroundColor: 'accent' | 'black' | 'white';
  textColor?: 'white' | 'black';
  borderColor?: 'black' | 'blackOpacity';
  height?: 'medium' | 'small' | 'large';
  onClick?: () => void;
}

export const Button: FC<ButtonProps> = ({
  children,
  icon,
  type,
  disabled,
  backgroundColor,
  textColor,
  height,
  borderColor,
  onClick
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type={type}
      className={classNames(styles.Button, {
        [styles.accentBC]: backgroundColor === 'accent',
        [styles.blackBC]: backgroundColor === 'black',
        [styles.whiteBC]: backgroundColor === 'white',
        [styles.mediumHeight]: height === 'medium',
        [styles.smallHeight]: height === 'small',
        [styles.largeHeight]: height === 'large',
        [styles.whiteTC]: textColor === 'white',
        [styles.blackTC]: textColor === 'black',
        [styles.borderBlack]: borderColor === 'black',
        [styles.borderOpacity]: borderColor === 'blackOpacity',
        [styles.disabledButton]: disabled
      })}
    >
      {icon && <div>{icon}</div>}
      {children}
    </button>
  );
};
