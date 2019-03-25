import { createBrowserHistory } from 'history';
import React, { Component } from 'react';
import ReactGA from 'react-ga';
import { Provider } from 'react-redux';
import { Route, Router, Switch } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { Reset } from 'styled-reset';
import configureStore from './common/configureStore';
import About from './components/About';
import GlobalStyle from './components/GlobalStyle';
import RootContainer from './containers/RootContainer';
import './icons';

ReactGA.initialize('UA-109344681-2');
ReactGA.set({ anonymizeIp: true });

const history = createBrowserHistory();
history.listen(location => {
  ReactGA.set({ page: location.pathname });
  ReactGA.pageview(location.pathname);
});

const { store, persistor } = configureStore();

class App extends Component {
  componentDidMount() {
    ReactGA.pageview(window.location.pathname);
  }

  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Reset />
          <GlobalStyle />
          <Router history={history}>
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
