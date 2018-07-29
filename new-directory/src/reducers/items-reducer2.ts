import { FETCH_ITEMS } from '../actions/types';
import { buildAddOnClick } from '../components/items-fetcher';
import { navigateToAction } from '../actions/navigate-to';
import { store } from '../configure-store';

export type SideBarNode = {
  id: string;
  label: string;
  subItems: SideBarNode[];
};

export type SideBarUINode = {
  id: string;
  label: string;
  onClick: () => void;
  subItems: SideBarUINode[];
};

export type Foo = { level: number, items: SideBarUINode[], parentItemId: string | null };

export type ItemsState = {
  tree: SideBarUINode[];
  byItemId: { [itemId: string]: Foo };
};

const navigateTo = (url) => {
  store.dispatch(navigateToAction(url));
};

const { addOnClick } = buildAddOnClick({ navigateTo });

const mapItemsById = (items: SideBarUINode[], level: number = 0, parentItemId: string | null = null) => {
  return items.reduce((all, item) => ({
    ...all,
    ...mapItemsById(item.subItems, level + 1, item.id),
    [item.id]: { items, level, parentItemId }
  }), {});
};

export const itemsReducer = (state: ItemsState = { tree: [], byItemId: {} }, action): ItemsState => {
  switch (action.type) {
    case FETCH_ITEMS:
      const tree = addOnClick(action.items);
      const byItemId = mapItemsById(tree);
      return { tree, byItemId };
    default:
      return state;
  }
};
