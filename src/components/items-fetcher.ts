const buildAddOnClick = ({ navigateTo }) => {
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

export const buildItemsFetcher = ({ onItemsReady }) => {
  let map;
  let activeItemId = 'aaa';
  let currentItems;

  const updateItems = () => {
    currentItems = map[activeItemId].map(item => {
      if (item.id !== activeItemId) {
        return item;
      }
      return {
        ...item,
        active: true
      };
    });
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
