// react
import { FC, ReactNode } from 'react';
// redux
import { Provider } from 'react-redux';
//redux-persist
import { PersistGate } from 'redux-persist/integration/react';
// config
import { createStore } from './../../config/store/createStore';

interface StoreProviderProps {
  children: ReactNode;
}

const { store, persistor } = createStore();

export const StoreProvider: FC<StoreProviderProps> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export const PersistProvider: FC<StoreProviderProps> = ({ children }) => {
  return (
    <PersistGate loading={null} persistor={persistor}>
      {children}
    </PersistGate>
  );
};

export { createStore };
