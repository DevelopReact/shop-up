//api
import { jsonPlaceholderAPI } from '@/shared/api/jsonPlaceholderAPI';
//types
import { IUser } from '../model/types/userTypes';

const userAPI = jsonPlaceholderAPI.injectEndpoints({
  endpoints: (build) => ({
    getUsers: build.query<IUser, void | null>({
      query: () => ({
        url: '/users/me',
        cache: 'no-cache',
        method: 'GET',
        providesTags: ['Users']
      })
    }),
    updateUser: build.mutation<IUser, Partial<IUser>>({
      query: (user) => ({
        url: `/users/${user.id}`,
        method: 'PUT',
        body: {
          ...user
        }
      }),
      invalidatesTags: ['Users']
    }),
    deleteUser: build.mutation<IUser, number>({
      query: (id) => ({
        url: `/users/${id}`,
        method: 'DELETE',
        body: id
      }),
      invalidatesTags: ['Users']
    })
  })
});

export const {
  useGetUsersQuery,
  useUpdateUserMutation,
  useDeleteUserMutation
} = userAPI;
