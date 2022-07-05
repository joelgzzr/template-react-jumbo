import { createMemoryHistory } from 'history';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import AppWrapper from './components/layout/AppWrapper';
import Router from './components/routes/Router';
import AppContextProvider from './context/app';
import setupStore from './redux/store';

import 'react-perfect-scrollbar/dist/css/styles.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';

function App() {
  const history = createMemoryHistory();

  return (
    <Provider store={setupStore()}>
      <BrowserRouter location={history.location} navigator={history}>
        <AppContextProvider>
          <AppWrapper>
            <Router />
          </AppWrapper>
        </AppContextProvider>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
