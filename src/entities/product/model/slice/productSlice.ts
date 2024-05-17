import { PayloadAction, createSlice } from '@reduxjs/toolkit';
//types
import { IProductsResponse, IProduct } from '../types/productTypes';

const initialState: IProductsResponse = {
  data: []
};

const productSlice = createSlice({
  name: 'product',
  initialState: initialState,
  reducers: {
    setProductCart(state, action: PayloadAction<IProduct>) {
      state.data.push(action.payload);
    },
    deleteProductId(state, action) {
      state.data = state.data.filter(
        (product) => product.id !== action.payload
      );
    },
    clearProductCart(state) {
      state.data = [];
    }
  }
});

export const { actions: productActions, reducer: productReducer } =
  productSlice;
