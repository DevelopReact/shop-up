//shared api
import { jsonPlaceholderAPI } from '@/shared/api/jsonPlaceholderAPI';
//entities
import { UserStateSchema } from '@/entities/user';
import { IProductsResponse } from '@/entities/product/model/types/productTypes';
import { QuestStateSchema } from '@/entities/quest/model/types/questTypes';

export interface StateSchema {
  // user : UserStateSchema
  [jsonPlaceholderAPI.reducerPath]: ReturnType<
    typeof jsonPlaceholderAPI.reducer
  >;
  user: UserStateSchema;
  product: IProductsResponse;
  quest: QuestStateSchema;
}
