import { FETCH_ITEMS, NAVIGATE_TO, UPDATE_ACTIVE_ITEM } from '../actions/types';

export const activeItemIdReducer = (state = null, action) => {
  switch (action.type) {
    case FETCH_ITEMS:
      return action.items[0].id;
    case NAVIGATE_TO:
      return action.url;
    case UPDATE_ACTIVE_ITEM:
      return action.id;
    default:
      return state;
  }
};
