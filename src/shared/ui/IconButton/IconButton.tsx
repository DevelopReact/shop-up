// react
import { ChangeEvent, FC, ReactNode } from 'react';
//lib
import classNames from 'classnames';
// styles
import styles from './IconButton.module.scss';

interface IconButtonProps {
  children: ReactNode;
  backgroundColor?: 'white' | 'black' | 'grey';
  textColor?: 'white' | 'black' ;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const IconButton: FC<IconButtonProps> = ({
  children,
  backgroundColor,
  textColor,
  onChange
}) => {
  return (
    <div
      onChange={onChange}
      className={classNames(styles.IconButton, {
        [styles.whiteBC]: backgroundColor === 'white',
        [styles.blackBC]: backgroundColor === 'black',
        [styles.greyBC]: backgroundColor === 'grey',
        [styles.whiteText]: textColor === 'white',
        [styles.blackText]: textColor === 'black',
      })}
    >
      {children}
    </div>
  );
};
