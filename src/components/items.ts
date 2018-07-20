export type TSideBarItem = {
  id: string;
  label: string;
  level: number;
  location: string;
  active: boolean;
  onClick: () => void;
  subItems: TSideBarItem[];
};

const chance = require('chance').Chance();

// const foo = [
//   {
//     id: '0',
//     level: 0,
//     sub: [
//       {
//         id: '0.0',
//         location: '0.0',
//         level: 1,
//         sub: [
//           {
//             id: '0.0.0',
//             level: 2,
//             sub: []
//           }
//         ]
//       },
//       {
//         id: '0.1',
//         sub: []
//       }
//     ]
//   },
//   {
//     id: '1',
//     sub: [
//       {
//         id: '1.0',
//         sub: []
//       }
//     ]
//   }
// ];

const generateItems = (level: number, parentLocation: string | null, length: number): TSideBarItem[] => {
  return Array.apply(null, { length }).map((v: any, i: any) => {
    const subItems = level > 0 ? 0 : chance.integer({ min: 0, max: 1 });
    const location = !parentLocation ? `${i}` : `${parentLocation}.${i}`;
    return ({
      id: location,
      level,
      label: `item ${i} - level ${level}`,
      location,
      onClick: () => console.log('onClick not defined'),
      active: false,
      subItems: generateItems(level + 1, location, subItems)
    });
  });
};

export const print = items => {
  console.log(JSON.stringify(items, null, 2));
};

export const generateItems2 = () => generateItems(0, null, chance.integer({ min: 3, max: 3 }));

export const setFirstItemAsActive = (items: TSideBarItem[]): TSideBarItem[] => {
  if (!items.length) {
    return items;
  }
  const firstItem = items[0];
  firstItem.active = true;
  firstItem.subItems = setFirstItemAsActive(firstItem.subItems);
  return items; // TODO clone
};

const findOnClick = (items: TSideBarItem[]) => {
  const item = items[0];
  if (item && item.subItems.length) {
    return findOnClick(item.subItems);
  }
};

export const setOnClick = (navigateTo, items: TSideBarItem[]): TSideBarItem[] => {
  return items.map(item => {
    const subItems = setOnClick(navigateTo, item.subItems);
    const onClick = !subItems.length ? () => navigateTo(item.id) : findOnClick(item.subItems);
    return ({
      ...item,
      onClick,
      subItems
    });
  });
};

export const updateActiveItem = (items: TSideBarItem[], oldActive: string, newActive: string): TSideBarItem[] => {
  items = setActiveStatus(items, oldActive.split('.'), false);
  items = setActiveStatus(items, newActive.split('.'), true);

  return items.slice(0);
};

export const setActiveStatus = (items: TSideBarItem[], levels: string[], isActive: boolean): TSideBarItem[] => {
  if (levels.length) {
    const [level, ...restLevels] = levels;
    items[level].active = isActive;
    items[level].subItems = setActiveStatus(items[level].subItems, restLevels, isActive);
  }
  console.log(JSON.stringify(items, null, 2));
  return items;
};

export const findActiveTree = (items: TSideBarItem[], active: string): { level: number; items: TSideBarItem[] } => {
  console.log(items, active.split('.'))
  return findActiveTree2(items, active.split('.'));
};

const findActiveTree2 = (items: TSideBarItem[], levels: string[]): { level: number; items: TSideBarItem[] } => {
  const [level, ...restLevels] = levels;
  console.log(level, items);
  if (level && items[level].subItems.length) {
    return {
      ...findActiveTree2(items[level].subItems, restLevels),
      level: parseInt(level, 10)
    };
  }
  return { items, level: 0 };
};