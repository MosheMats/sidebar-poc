import * as React from 'react';
import { connect } from 'react-redux';
import * as NavItem from 'react-bootstrap/lib/NavItem';
import * as Well from 'react-bootstrap/lib/Well';
import * as Nav from 'react-bootstrap/lib/Nav';
import { fetchItems } from '../../actions/fetch-items';
import { StoreState } from '../../configure-store';
import { currentItemsSelector } from '../../selectors/current-items-selector';
import * as Button from 'react-bootstrap/lib/Button';
import { updateActiveItem } from '../../actions/update-active-item-action';

export type SideBarUIItem = {
  id: string;
  label: string;
  onClick: () => void;
  active: boolean;
}

type Values = {
  loading: boolean;
  items: SideBarUIItem[];
  isTopLevel: boolean;
  topLevelItemId: string;
};

type Actions = {
  fetchItems: () => void;
  updateActiveItem: (id: string) => void;
}

type Props = Values & Actions;

class SideBarComp extends React.PureComponent<Props, {}> {
  constructor(props: Props) {
    super(props);
    props.fetchItems();
    this.goToTopLevel = this.goToTopLevel.bind(this);
  }

  public render() {
    if (this.props.loading) {
      return <span>Loading...</span>;
    }

    const navItems = this.props.items.map(item => (
      <NavItem key={item.id} onClick={item.onClick} active={item.active}>
        {item.label}
      </NavItem>
    ));

    const header = this.props.isTopLevel ?
      <Well>SideBar Header</Well> :
      <Well><Button onClick={this.goToTopLevel}>Main Menu</Button></Well>;
    return (
      <div>
        {header}
        <Nav bsStyle="pills" stacked={true}>
          {navItems}
        </Nav>
      </div>
    );
  }

  private goToTopLevel() {
    this.props.updateActiveItem(this.props.topLevelItemId);
  }
}

const mapStateToProps = (state: StoreState) => {
  const { items, level, topLevelItemId } = currentItemsSelector(state);
  return ({
    loading: false,
    items,
    isTopLevel: level === 0,
    topLevelItemId
  });
};

const mapDispatchToProps: Actions = { fetchItems, updateActiveItem };

export const SideBar = connect(mapStateToProps, mapDispatchToProps)(SideBarComp);
