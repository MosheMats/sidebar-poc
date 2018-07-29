import { createStore, applyMiddleware, Store, AnyAction } from 'redux';
import thunk from 'redux-thunk';
import { default as sideBarModel } from './reducers';
import { ItemsState } from './reducers/items-reducer2';
import { createLogger } from 'redux-logger';

export type StoreState = {
  items: ItemsState;
  activeItemId: string;
}

export const store: Store<StoreState, AnyAction> = createStore(sideBarModel, applyMiddleware(thunk, createLogger()));
