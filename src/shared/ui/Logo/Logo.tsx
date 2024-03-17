// react
import { FC } from 'react';
//lib
import classNames from 'classnames';
// styles
import styles from './Logo.module.scss';

interface LogoProps {
  children: string;
  textColor: 'white' | 'black';
}

export const Logo: FC<LogoProps> = ({ children, textColor }) => {
  return (
    <div
      className={classNames(styles.Logo, {
        [styles.whiteColor]: textColor === 'white',
        [styles.blackColor]: textColor === 'black'
      })}
    >
      {children}
    </div>
  );
};
