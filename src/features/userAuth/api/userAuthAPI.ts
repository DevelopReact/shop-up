//shared api
import { jsonPlaceholderAPI } from '@/shared/api/jsonPlaceholderAPI';
//shared constants
import { JWT_TOKEN } from '@/shared/libs/constants/jwtToken';
//types
import {
  IPostUserLogInRequest,
  IPostUserResponse,
  IPostUserSignUpRequest
} from '../model/userAuthTypes';

const userAuthAPI = jsonPlaceholderAPI.injectEndpoints({
  endpoints: (build) => ({
    registerUser: build.mutation<IPostUserResponse, IPostUserSignUpRequest>({
      query: (user) => ({
        url: '/auth/local/register',
        method: 'POST',
        body: user
      }),
      transformResponse: (response: IPostUserResponse) => {
        localStorage.setItem(JWT_TOKEN, response.jwt);
        return {
          jwt: response.jwt,
          user: response.user
        };
      },
      invalidatesTags: ['Users']
    }),

    logInUser: build.mutation<IPostUserResponse, IPostUserLogInRequest>({
      query: (user) => ({
        url: '/auth/local',
        method: 'POST',
        body: user
      }),
      transformResponse: (response: IPostUserResponse) => {
        localStorage.setItem(JWT_TOKEN, response.jwt);
        return {
          jwt: response.jwt,
          user: response.user
        };
      },
      invalidatesTags: ['Users']
    })
  })
});

export const { useRegisterUserMutation, useLogInUserMutation } = userAuthAPI;
