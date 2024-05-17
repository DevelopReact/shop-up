// react
import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
//ui
import { Home } from '@/pages/home';
import { SignUp } from '@/pages/signUp';
import { LogIn } from '@/pages/logIn';
import { WishList } from '@/pages/wishList';
import { Account } from '@/pages/account';
import { Cart } from '@/pages/cart';
import { About } from '@/pages/about';
import { Contact } from '@/pages/contact';
import { Error } from '@/pages/error';
import { Profile } from '@/pages/account/ui/profile';
import { AddressBook } from '@/pages/account/ui/AddressBook';
import { PaymentOptions } from '@/pages/account/ui/PaymentOptions';
import { CheckOut } from '@/pages/checkOut/ui';
import { ProductDetails } from '@/entities/product/ui/ProductDetails';
//routes
import {
  getAboutRoute,
  getAccountRoute,
  getAddressBook,
  getCancellations,
  getCartRoute,
  getCheckOutRoute,
  getContactRoute,
  getErrorRoute,
  getHomeRoute,
  getLogInRoute,
  getPaymentOptions,
  getProductDetailsRoute,
  getProfile,
  getReturns,
  getSignInRoute,
  getWishListRoute
} from '@/shared/libs/constants/routes';
//layouts
import { PageLayout } from '../../../layouts/ui/PageLayout';

export const RouteProvider: FC = ({}) => {
  return (
    <Routes>
      <Route element={<PageLayout />}>
        <Route path={getHomeRoute()} element={<Home />} />
        <Route path={getSignInRoute()} element={<SignUp />} />
        <Route path={getLogInRoute()} element={<LogIn />} />
        <Route path={getWishListRoute()} element={<WishList />} />
        <Route path={getCartRoute()} element={<Cart />} />
        <Route path={getCheckOutRoute()} element={<CheckOut />} />
        <Route path={getAccountRoute()} element={<Account />}>
          <Route path={getProfile()} element={<Profile />} />
          <Route path={getAddressBook()} element={<AddressBook />} />
          <Route path={getPaymentOptions()} element={<PaymentOptions />} />
          <Route path={getReturns()} element={<Account />} />
          <Route path={getCancellations()} element={<Account />} />
        </Route>
        <Route path={getAboutRoute()} element={<About />} />
        <Route path={getContactRoute()} element={<Contact />} />
        <Route path={getErrorRoute()} element={<Error />} />
        <Route path={getProductDetailsRoute()} element={<ProductDetails />} />
      </Route>
    </Routes>
  );
};
