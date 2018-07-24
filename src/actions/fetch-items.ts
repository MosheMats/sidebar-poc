import { FETCH_ITEMS } from './types';

export const fetchItems = () => dispatch => dispatch({
  type: FETCH_ITEMS,
  items: require('../components/side-bar-items.json')
});
