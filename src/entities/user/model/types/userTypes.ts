import { IProduct } from '@/entities/product/model/types/productTypes';

export interface IUser {
  id?: number;
  username: string;
  email: string;
  password?: string;
  provider?: string;
  confirmed?: boolean;
  blocked?: boolean;
  createdAt?: string;
  updatedAt?: string;
  products?: IProduct[];
  companyName?: string;
  streetAddress?: string;
  apartment?: string;
  town: string;
  phone?: string;
  wishList?: IProduct[];
}

export type IGetUsersResponse = IUser[];

export interface UserStateSchema {
  isLoggedIn: boolean;
  user: IUser;
}
