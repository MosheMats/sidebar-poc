import { StoreState } from '../configure-store';
import { SideBarUIItem } from '../components/redux/SideBar';
import { asSideBarUIItems } from '../components/items-fetcher';
import { Foo } from '../reducers/items-reducer2';

const getParent = (allItemsMap: { [itemId: string]: Foo }, currentActive: string) => {
  const parentItemId = allItemsMap[currentActive] && allItemsMap[currentActive].parentItemId;
  return parentItemId ? getParent(allItemsMap, parentItemId) : currentActive;
};

export const currentItemsSelector = (state: StoreState): { level: number, items: SideBarUIItem[], topLevelItemId: string } => {
  const byItemId = state.items.byItemId[state.activeItemId];
  return {
    items: asSideBarUIItems(byItemId && byItemId.items || state.items.tree, state.activeItemId),
    level: byItemId && byItemId.level || 0,
    topLevelItemId: getParent(state.items.byItemId, state.activeItemId)
  };
};
