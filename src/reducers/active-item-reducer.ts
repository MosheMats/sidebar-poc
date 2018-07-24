import { FETCH_ITEMS, NAVIGATE_TO } from '../actions/types';

export const activeItemIdReducer = (state = null, action) => {
  switch (action.type) {
    case FETCH_ITEMS:
      return action.items[0].id;
    case NAVIGATE_TO:
      return action.url;
    default:
      return state;
  }
};
