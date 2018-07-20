import * as React from 'react';

import { SideBarContainer } from './components/SideBar2';
import * as PageHeader from 'react-bootstrap/lib/PageHeader';

class App extends React.Component {
  public render() {
    return [
      <PageHeader key="header">Business Manager Side Bar POC</PageHeader>,
      <SideBarContainer key="sidebar"/>
    ];
  }
}

export default App;
