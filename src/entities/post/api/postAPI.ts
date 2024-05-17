// api
import { jsonplaceholderAPI } from '@/shared/api/jsonPlaceholderAPI';
// types
import { IGetPostsResponse } from '../model/types/post';

const postAPI = jsonplaceholderAPI.injectEndpoints({
  endpoints: (build) => ({
    getPosts: build.query<IGetPostsResponse, void>({
      query: () => ({
        url: `/posts`,
        method: 'GET'
      })
    })
  })
});

export const { useGetPostsQuery } = postAPI;
