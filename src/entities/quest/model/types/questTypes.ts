import { IProduct } from '@/entities/product/model/types/productTypes';
import { IUser } from '@/entities/user/model/types/userTypes';

export interface IQuest extends IUser {}
export interface QuestStateSchema {
  quest: IQuest;
}
