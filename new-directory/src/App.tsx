import * as React from 'react';

import * as PageHeader from 'react-bootstrap/lib/PageHeader';
import { SideBar } from './components/redux/SideBar';
import { Provider } from 'react-redux';
import { store } from './configure-store';

class App extends React.Component {
  public render() {
    return [
      <PageHeader key="header">Business Manager Side Bar POC</PageHeader>,
      <Provider key="redux-sidebar" store={store}>
        <SideBar/>
      </Provider>
    ];
  }
}

export default App;
