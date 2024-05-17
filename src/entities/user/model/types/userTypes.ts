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
}

export type IGetUsersResponse = IUser[];

export interface UserStateSchema {
  isLoggedIn: boolean;
  user: IUser;
}
