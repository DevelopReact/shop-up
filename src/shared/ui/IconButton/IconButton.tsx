// react
import { FC, ReactNode } from 'react';
//lib
import classNames from 'classnames';
// styles
import styles from './IconButton.module.scss';

interface IconButtonProps {
  children: ReactNode;
  backgroundColor?: 'white' | 'black' | 'grey' | 'accent';
  textColor?: 'white' | 'black';
  onClick?: () => void;
}

export const IconButton: FC<IconButtonProps> = ({
  children,
  backgroundColor,
  textColor,
  onClick
}) => {
  return (
    <div
      onClick={onClick}
      className={classNames(styles.IconButton, {
        [styles.whiteBC]: backgroundColor === 'white',
        [styles.blackBC]: backgroundColor === 'black',
        [styles.greyBC]: backgroundColor === 'grey',
        [styles.accentBC]: backgroundColor === 'accent',
        [styles.whiteText]: textColor === 'white',
        [styles.blackText]: textColor === 'black'
      })}
    >
      {children}
    </div>
  );
};
