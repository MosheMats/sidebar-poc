import * as React from 'react';
import { buildItemsFetcher } from './items-fetcher';
import * as NavItem from 'react-bootstrap/lib/NavItem';
import * as Nav from 'react-bootstrap/lib/Nav';
import * as Well from 'react-bootstrap/lib/Well';

type State = {
  items: any[];
  loading: boolean;
};

export class SideBarContainer extends React.Component<{}, State> {

  constructor(props: any) {
    super(props);

    this.state = {
      loading: true,
      items: []
    };

    buildItemsFetcher({ onItemsReady: items => this.setState({ items, loading: false }) }).fetch();
  }

  public render() {
    if (this.state.loading) {
      return <span>Loading...</span>;
    }

    const navItems = this.state.items.map(item => (
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