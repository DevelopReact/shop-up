import { IUser } from '@/entities/user/model/types/userTypes';
export interface IPostUserSignUpRequest {
  username: string;
  email: string;
  password?: string;
  confirmed?: boolean;
}

export interface IPostUserLogInRequest {
  identifier: string;
  password: string;
}

export interface IPostUserResponse {
  jwt: string;
  user: IUser;
}
