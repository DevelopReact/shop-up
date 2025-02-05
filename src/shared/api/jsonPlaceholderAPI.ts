// redux
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
//selectors
import { getUserState } from '@/entities/user/model/selectors/getUserState';
// baseUrl
import {
  jsonPlaceholderBaseURL,
  jsonPlaceholderRootURL
} from '../libs/constants/jsonPlaceholderBaseURL';
//libs
import { JWT_TOKEN } from '../libs/constants/jwtToken';

//wake up render server
setInterval(() => {
  fetch(jsonPlaceholderRootURL).catch(() =>
    console.log('Server is sleeping...')
  );
}, 30000);

export const jsonPlaceholderAPI = createApi({
  reducerPath: 'jsonPlaceholderAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: jsonPlaceholderBaseURL,
    prepareHeaders: (headers, { getState }) => {
      // @ts-expect-error
      const { isLoggedIn } = getUserState(getState());

      if (isLoggedIn) {
        headers.set(
          'Authorization',
          `Bearer ${localStorage.getItem(JWT_TOKEN)}`
        );
      }

      return headers;
    }
  }),
  tagTypes: ['Posts', 'Users', 'Products'],

  endpoints: () => ({})
});
