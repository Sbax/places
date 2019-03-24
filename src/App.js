import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { Reset } from 'styled-reset';
import configureStore from './common/configureStore';
import GlobalStyle from './components/GlobalStyle';
import RootContainer from './containers/RootContainer';
import './icons';
import About from './components/About';

const { store, persistor } = configureStore();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Reset />
          <GlobalStyle />
          <Router>
            <Switch>
              <Route path="/about" component={About} />
              <Route path="/:cityKey?/:placeKey?" component={RootContainer} />
            </Switch>
          </Router>
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
