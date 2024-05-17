export interface IUserAuth {
  id: number;
  username: string;
  email: string;
  provider?: string;
  confirmed?: boolean;
  blocked?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

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
  user: IUserAuth;
}
