// react
import { FC } from 'react';
//libs
import IconDelivery from '@/shared/libs/assets/svg/icon-delivery.svg?react';
import IconCustomer from '@/shared/libs/assets/svg/Icon-Customer service.svg?react';
import IconSecure from '@/shared/libs/assets/svg/Icon-secure.svg?react';
// styles
import styles from './Featured.module.scss';
import { ServiceBlock } from '../ServiceBlock';

interface FeaturedProps {}

export const Featured: FC<FeaturedProps> = ({}) => {
  return (
    <div className={styles.Featured}>
      <div className={styles.headerTodayOffer}>
        <div className={styles.rectangleWrapper}>
          <div className={styles.rectangle}></div>
          <span>Featured</span>
        </div>
        <div className={styles.titleTodayOffer}>
          <div className={styles.saleTimer}>
            <p>New Arrival</p>
          </div>
        </div>
      </div>
      <div className={styles.featuredBottom}>
        <div className={styles.wrapperServices}>
          <ServiceBlock
            name='FREE AND FAST DELIVERY'
            title='Free delivery for all orders over $140'
          >
            {<IconDelivery />}
          </ServiceBlock>
          <ServiceBlock
            name='24/7 CUSTOMER SERVICE'
            title='Friendly 24/7 customer support'
          >
            {<IconCustomer />}
          </ServiceBlock>
          <ServiceBlock
            name='MONEY BACK GUARANTEE'
            title='We return money within 30 days'
          >
            {<IconSecure />}
          </ServiceBlock>
        </div>
      </div>
    </div>
  );
};
