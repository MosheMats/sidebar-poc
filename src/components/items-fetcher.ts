import { SideBarUINode } from '../reducers/items-reducer';
import { SideBarUIItem } from './redux/SideBar';

export const buildAddOnClick = ({ navigateTo }) => {
  const addOnClick = items => {
    return items.map(item => {
      const subItems = addOnClick(item.subItems);
      const [firstSubItem] = subItems;
      const onClick = firstSubItem ? firstSubItem.onClick : () => navigateTo(item.id);
      return {
        ...item,
        subItems,
        onClick
      };
    });
  };

  return {
    addOnClick
  };
};

export const asSideBarUIItems = (items: SideBarUINode[], activeItemId: string): SideBarUIItem[] => {
  return items.map(({ id, label, onClick }) => ({
    id,
    onClick,
    label,
    active: id === activeItemId
  }));
};

export const buildItemsFetcher = ({ onItemsReady }) => {
  let map;
  let activeItemId = '0';
  let currentItems;

  const updateItems = () => {
    currentItems = asSideBarUIItems(map[activeItemId], activeItemId);
    onItemsReady(currentItems);
  };

  const navigateTo = id => {
    console.log('navigateTo', id);
    if (activeItemId !== id) {
      activeItemId = id;
      updateItems();
    }
  };

  const { addOnClick } = buildAddOnClick({ navigateTo });

  const mapItemsById = items => items.reduce((all, item) => {
    return ({
      ...all,
      ...mapItemsById(item.subItems),
      [item.id]: items
    });
  }, {});

  return {
    fetch: () => {
      setTimeout(() => {
        const items = require('./side-bar-items.json');
        const itemsWithOnClick = addOnClick(items);

        map = mapItemsById(itemsWithOnClick);

        updateItems();
      }, 1000);
    }
  };
};
