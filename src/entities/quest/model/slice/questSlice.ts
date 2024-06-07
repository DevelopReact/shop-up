//redux
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
//types
import { IQuest, QuestStateSchema } from '../types/questTypes';
import { IProduct } from '@/entities/product';

const initialState: QuestStateSchema = {
  quest: {
    username: '',
    email: '',
    password: '',
    town: '',
    products: [],
    wishList: []
  }
};

const questSlice = createSlice({
  name: 'quest',
  initialState: initialState,
  reducers: {
    setQuestProduct(state, action: PayloadAction<IProduct>) {
      state.quest.products?.push(action.payload);
    },
    setQuestWish(state, action: PayloadAction<IProduct>) {
      state.quest.wishList?.push(action.payload);
    },
    updateQuest(state, action: PayloadAction<IQuest>) {
      state.quest = action.payload;
    },
    clearQuestProduct(state) {
      state.quest.products = initialState.quest.products;
    }
  }
});

export const { actions: questActions, reducer: questReducer } = questSlice;
