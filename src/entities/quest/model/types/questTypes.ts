import { IProduct } from '@/entities/product/model/types/productTypes';

export interface IQuest {
  products?: IProduct[];
}

export interface QuestStateSchema {
  quest: IQuest;
}
