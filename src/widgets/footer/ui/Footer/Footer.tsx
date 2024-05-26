// react
import { FC } from 'react';
//ui
import { Logo } from '@/shared/ui/Logo';
import { Link } from '@/shared/ui/Link';
import { Input } from '@/shared/ui/Input';
import { IconButton } from '@/shared/ui/IconButton';
//assets
import QrCode from '@/shared/libs/assets/png/QrCode.png';
import GooglePlay from '@/shared/libs/assets/png/google-play-logo.png';
import AppStore from '@/shared/libs/assets/png/download-appstore.png';
import Vector from '@/shared/libs/assets/svg/Vector.svg?react';
import Facebook from '@/shared/libs/assets/svg/Facebook.svg?react';
import Twitter from '@/shared/libs/assets/svg/Twitter.svg?react';
import Instagram from '@/shared/libs/assets/svg/Instagram.svg?react';
import Linkedin from '@/shared/libs/assets/svg/Linkedin.svg?react';
import Group from '@/shared/libs/assets/svg/Group.svg?react';
import {
  getAccountRoute,
  getCartRoute,
  getContactRoute,
  getFaq,
  getHomeRoute,
  getLogInRoute,
  getPrivacyPolicy,
  getShop,
  getSubscribe,
  getTermsOfUse,
  getWishListRoute
} from '@/shared/libs/constants/routes';
import { scrollUp } from '@/shared/libs/constants/scrollUp';
// styles
import styles from './Footer.module.scss';

interface FooterProps {}

export const Footer: FC<FooterProps> = ({}) => {
  const onScrollUp = () => scrollUp();

  return (
    <div className={styles.Footer}>
      <div className={styles.contentFooter}>
        <div className={styles.columnFooter}>
          <Link
            to={getHomeRoute()}
            textColor='white'
            textDecoration='none'
            fontSize='large'
            lineHeight='large'
            onClick={onScrollUp}
          >
            <Logo children='Exclusive' textColor='white' />
          </Link>
          <Link
            to={getSubscribe()}
            textColor='white'
            textDecoration='none'
            fontSize='medium'
            lineHeight='large'
            onClick={onScrollUp}
          >
            Subscribe
          </Link>
          <div>Get 10% off your first order</div>
          <div className={styles.wrapperInputEmail}>
            <Input
              type='email'
              placeholder='Enter your email'
              backgroundColor='black'
              textColor='white'
            />
            <Vector />
          </div>
        </div>

        <div className={styles.columnFooter}>
          <p>Support</p>
          <div>
            111 Bijoy sarani, Dhaka,
            <br />
            DH 1515, Bangladesh.
          </div>
          <div>exclusive@gmail.com</div>
          <div>+88015-88888-9999</div>
        </div>
        <div className={styles.columnFooter}>
          <p>Account</p>
          <Link
            to={getAccountRoute()}
            textColor='white'
            textDecoration='none'
            onClick={onScrollUp}
          >
            My Account
          </Link>
          <Link
            to={getLogInRoute()}
            textColor='white'
            textDecoration='none'
            onClick={onScrollUp}
          >
            Login / Register
          </Link>
          <Link
            to={getCartRoute()}
            textColor='white'
            textDecoration='none'
            onClick={onScrollUp}
          >
            Cart
          </Link>
          <Link
            to={getWishListRoute()}
            textColor='white'
            textDecoration='none'
            onClick={onScrollUp}
          >
            Wishlist
          </Link>
          <Link
            to={getShop()}
            textColor='white'
            textDecoration='none'
            onClick={onScrollUp}
          >
            Shop
          </Link>
        </div>
        <div className={styles.columnFooter}>
          <p>Quick Link</p>
          <Link
            to={getPrivacyPolicy()}
            textColor='white'
            textDecoration='none'
            onClick={onScrollUp}
          >
            Privacy Policy
          </Link>
          <Link
            to={getTermsOfUse()}
            textColor='white'
            textDecoration='none'
            onClick={onScrollUp}
          >
            Terms Of Use
          </Link>
          <Link
            to={getFaq()}
            textColor='white'
            textDecoration='none'
            onClick={onScrollUp}
          >
            FAQ
          </Link>
          <Link
            to={getContactRoute()}
            textColor='white'
            textDecoration='none'
            onClick={onScrollUp}
          >
            Contact
          </Link>
        </div>
        <div className={styles.columnFooter}>
          <p>Download App</p>
          <div className={styles.downloadAppColumn}>
            <span>Save $3 with App New User Only</span>
            <div className={styles.qrCode}>
              <img src={QrCode} />
              <div className={styles.app}>
                <img src={GooglePlay} />
                <img src={AppStore} />
              </div>
            </div>
          </div>
          <div className={styles.socialIcons}>
            <IconButton>
              <Facebook />
            </IconButton>
            <IconButton>
              <Twitter />
            </IconButton>
            <IconButton>
              <Instagram />
            </IconButton>
            <IconButton>
              <Linkedin />
            </IconButton>
          </div>
        </div>
      </div>
      <div className={styles.bottomFooter}>
        <Group />
        <p>Copyright Rimel 2022. All right reserved</p>
      </div>
    </div>
  );
};
