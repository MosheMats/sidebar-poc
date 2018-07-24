import { asSideBarUIItems } from '../components/items-fetcher';
import { StoreState } from '../configure-store';
import { SideBarUIItem } from '../components/redux/SideBar';

export const currentItemsSelector = (state: StoreState): SideBarUIItem[] => {
  return asSideBarUIItems(state.items.byItemId[state.activeItemId] || state.items.tree, state.activeItemId);
};
