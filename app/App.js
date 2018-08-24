import React, { Component } from 'react';

import { Provider } from 'react-redux';
import { store } from './reducers/store';

import MainContainer from './components/MainContainer/MainContainer';

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <MainContainer />
      </Provider>
    );
  }
}
