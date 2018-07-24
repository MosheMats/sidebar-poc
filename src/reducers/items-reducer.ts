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
  subItems: SideBarNode[];
};

export type ItemsState = {
  tree: SideBarUINode[];
  byItemId: { [itemId: string]: SideBarUINode[] };
};

const navigateTo = (url) => {
  store.dispatch(navigateToAction(url));
};

const { addOnClick } = buildAddOnClick({ navigateTo });

const mapItemsById = items => items.reduce((all, item) => ({
  ...all,
  ...mapItemsById(item.subItems),
  [item.id]: items
}), {});

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
