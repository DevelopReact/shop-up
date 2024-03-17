// react
import { FC, ReactNode } from 'react';
import { Link as RouterLink, To } from 'react-router-dom';
//lib
import classNames from 'classnames';
// styles
import styles from './Link.module.scss';

interface LinkProps {
  to: To;
  children: ReactNode;
  textColor: 'white' | 'black' | 'accent';
  textDecoration?: 'underline' | 'none';
  fontSize?: 'large' | 'medium' | 'small';
  lineHeight?: 'large' | 'medium' | 'small';
  onClick?: () => void
}

export const Link: FC<LinkProps> = ({
  to,
  children,
  textColor,
  textDecoration,
  fontSize,
  lineHeight,
  onClick
}) => {
  return (
    <RouterLink
      to={to}
      onClick={onClick}
      className={classNames(styles.Link, {
        [styles.whiteTextColor]: textColor === 'white',
        [styles.blackTextColor]: textColor === 'black',
        [styles.accentTextColor]: textColor === 'accent',
        [styles.textUnderline]: textDecoration === 'underline',
        [styles.textNoneUnderline]: textDecoration === 'none',
        [styles.largeFontSize]: fontSize === 'large',
        [styles.mediumFontSize]: fontSize === 'medium',
        [styles.smallFontSize]: fontSize === 'small',
        [styles.largeLine]: lineHeight === 'large',
        [styles.mediumLine]: lineHeight === 'medium',
        [styles.smallLine]: lineHeight === 'small'
      })}
    >
      {children}
    </RouterLink>
  );
};
