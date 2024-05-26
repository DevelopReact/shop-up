//api
import { jsonPlaceholderAPI } from '@/shared/api/jsonPlaceholderAPI';
//types
import {
  IGetCategories,
  IProduct,
  IProductIdResponse,
  IProductsResponse,
  IUpdateProductIdRequest
} from '../model/types/productTypes';

const productAPI = jsonPlaceholderAPI.injectEndpoints({
  endpoints: (build) => ({
    getProducts: build.query<IProductsResponse, void>({
      query: () => ({
        url: '/products?populate=*',
        method: 'GET',
        providesTags: ['Products']
      })
    }),
    getCategories: build.query<IGetCategories, void>({
      query: () => ({
        url: 'categories?populate=*',
        method: 'GET',
        providesTags: ['Products']
      })
    }),
    getProductId: build.query<IProductIdResponse, number>({
      query: (id) => ({
        url: `/products/${id}?populate=*`,
        method: 'GET',
        providesTags: ['Products']
      })
    }),
    updateProduct: build.mutation<any, IUpdateProductIdRequest>({
      query: (product) => ({
        url: `/products/${product.id}?populate=*`,
        method: 'PUT',
        body: product
      }),
      invalidatesTags: ['Products']
    }),
    deleteProduct: build.mutation<IProduct, number>({
      query: (id) => ({
        url: `/products/${id}`,
        method: 'DELETE',
        body: id
      }),
      invalidatesTags: ['Products']
    })
  })
});

export const {
  useGetProductsQuery,
  useGetCategoriesQuery,
  useGetProductIdQuery,
  useUpdateProductMutation,
  useDeleteProductMutation
} = productAPI;
