// redux
import {
  ReducersMapObject,
  combineReducers,
  configureStore
} from '@reduxjs/toolkit';
//react persist
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// api
import { jsonPlaceholderAPI } from '@/shared/api/jsonPlaceholderAPI';
//reducers
import { userReducer } from '@/entities/user';
import { productReducer } from '@/entities/product';
import { questReducer } from '@/entities/quest/model/slice/questSlice';
// types
import { StateSchema } from './stateSchema';

const persistConfig = {
  key: 'root',
  storage: storage,
  blacklist: [jsonPlaceholderAPI.reducerPath]
};

export const createStore = () => {
  const rootReducers: ReducersMapObject<StateSchema> = {
    [jsonPlaceholderAPI.reducerPath]: jsonPlaceholderAPI.reducer,
    user: userReducer,
    product: productReducer,
    quest: questReducer
  };

  const persistedReducer = persistReducer(
    persistConfig,
    combineReducers(rootReducers)
  );

  const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
        }
      }).concat(jsonPlaceholderAPI.middleware)
  });

  const persistor = persistStore(store);

  return { store, persistor };
};
