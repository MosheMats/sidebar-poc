import { UPDATE_ACTIVE_ITEM } from './types';

export const updateActiveItem = (id: string) => ({
  type: UPDATE_ACTIVE_ITEM,
  id
});