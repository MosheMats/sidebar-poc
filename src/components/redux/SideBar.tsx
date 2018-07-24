import * as React from 'react';
import { connect } from 'react-redux';
import * as NavItem from 'react-bootstrap/lib/NavItem';
import * as Well from 'react-bootstrap/lib/Well';
import * as Nav from 'react-bootstrap/lib/Nav';
import { fetchItems } from '../../actions/fetch-items';
import { StoreState } from '../../configure-store';
import { currentItemsSelector } from '../../selectors/current-items-selector';

export type SideBarUIItem = {
  id: string;
  label: string;
  onClick: () => void;
  active: boolean;
}

type Values = {
  loading: boolean;
  items: SideBarUIItem[];
};

type Actions = {
  fetchItems: () => void;
}

type Props = Values & Actions;

class SideBarComp extends React.PureComponent<Props, {}> {
  constructor(props: Props) {
    super(props);
    props.fetchItems();
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

    return (
      <div>
        <Well>SideBar Header</Well>
        <Nav bsStyle="pills" stacked={true}>
          {navItems}
        </Nav>
      </div>
    );
  }
}

const mapStateToProps = (state: StoreState): Values => ({
  loading: false,
  items: currentItemsSelector(state)
});

const mapDispatchToProps: Actions = { fetchItems };

export const SideBar = connect(mapStateToProps, mapDispatchToProps)(SideBarComp);
