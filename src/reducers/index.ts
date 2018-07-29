import { combineReducers } from 'redux';
import { itemsReducer as items } from './items-reducer2';
import { activeItemIdReducer as activeItemId } from './active-item-reducer';

export default combineReducers({
  items,
  activeItemId
});
