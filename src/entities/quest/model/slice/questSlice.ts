//redux
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
//types
import { IQuest, QuestStateSchema } from '../types/questTypes';
import { IProduct } from '@/entities/product';

const initialState: QuestStateSchema = {
  quest: {
    products: []
  }
};

const questSlice = createSlice({
  name: 'quest',
  initialState: initialState,
  reducers: {
    setQuest(state, action: PayloadAction<IProduct>) {
      state.quest.products?.push(action.payload);
    },
    updateQuest(state, action: PayloadAction<IQuest>) {
      state.quest = action.payload;
    },
    clearQuest(state) {
      state.quest = initialState.quest;
    }
  }
});

export const { actions: questActions, reducer: questReducer } = questSlice;
