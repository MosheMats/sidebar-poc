import * as React from 'react';
import {
  generateItems2, setFirstItemAsActive, setOnClick, TSideBarItem, updateActiveItem, print,
  findActiveTree
} from './items';

const buildNavigator = ({ updateActive, currentActive }) => {
  let currentLocation = currentActive;
  return {
    navigateTo: location => {
      if (location !== currentLocation) {
        currentLocation = location;
        updateActive(currentLocation);
      }
    }
  };
};

const buildActiveManager = ({ onActiveChanged }) => {
  let currentActive = '0';
  return {
    updateActive: active => {
      if (active !== currentActive) {
        onActiveChanged(currentActive, active);
        currentActive = active;
      }
    },
    currentActive
  };
};

type Props = {
  itemsPerLevel?: number
};

type State = {
  items: any[];
  items2: TSideBarItem[];
  level: number;
  active: string;
  activeItems: TSideBarItem[];
};

function generateItems(level, itemsPerLevel: any, navigateTo, currentActive) {
  return Array.apply(null, { length: itemsPerLevel }).map((v: any, i: any) => {
    const [currentLevel, currentItem] = currentActive.split('.');
    return {
      id: `${level}.${i}`,
      label: `item ${i} - level ${level}`,
      onClick: () => {
        navigateTo(`${level}.${i}`);
      },
      active: currentLevel === `${level}` && currentItem === `${i}`
    };
  });
}

export class SideBarContainer extends React.PureComponent<Props, State> {
  private navigator;

  constructor(props: any) {
    super(props);
    const activeManager = buildActiveManager({ onActiveChanged: this.onActiveChanged2.bind(this) });
    this.navigator = buildNavigator(activeManager);

    const { levels = 2, itemsPerLevel = 4 } = props;

    let items2 = generateItems2();
    items2 = setFirstItemAsActive(items2);
    items2 = setOnClick(this.navigator.navigateTo, items2);

    print(items2);

    const items = Array.apply(null, { length: levels }).map((v: any, i: any) => {
      return generateItems(i, itemsPerLevel, this.navigator.navigateTo, activeManager.currentActive);
    });
    this.state = {
      items,
      items2,
      level: 0,
      active: activeManager.currentActive,
      activeItems: items2
    };

    this.toggleLevel = this.toggleLevel.bind(this);
    this.goToMain = this.goToMain.bind(this);
  }

  public render() {
    return (
      <div>
        <div>SideBar</div>
        <button onClick={this.toggleLevel}>Toggle level</button>
        {!!this.state.level && <button onClick={this.goToMain}>Go to main</button>}
        <SideBar items={this.state.activeItems}/>
      </div>
    );
  }

  private toggleLevel() {
    this.setState({ level: !this.state.level ? 1 : 0 });
  }

  private goToMain() {
    this.setState({ level: 0 });
  }

  private onActiveChanged2(prevActive, newActive) {
    if (prevActive !== newActive) {
      const { items, level } = findActiveTree(this.state.items2, this.state.active);
      this.setState({
        items2: updateActiveItem(this.state.items2, prevActive, newActive),
        active: newActive,
        activeItems: items,
        level
      });
    }
  }
}

const SideBar = ({ items }) => {
  return items.map(item => {
    return <SideBarItem key={item.id} label={item.label} onClick={item.onClick} active={item.active}/>;
  });
};

const SideBarItem = ({ label, onClick, active }: any) => {
  const style: any = { fontWeight: active ? 'bold' : 'normal' };
  return <div onClick={onClick} style={style}>{label}</div>;
};