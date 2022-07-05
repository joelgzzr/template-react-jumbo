import { render as rtlRender } from '@testing-library/react';
import PropTypes from 'prop-types';
import React from 'react';
import { Provider } from 'react-redux';

import setupStore from '../redux/store';

function renderWithProvider(ui, { preloadedState = {}, store = setupStore(preloadedState), ...renderOptions }) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>;
  }

  Wrapper.propTypes = {
    children: PropTypes.node.isRequired,
  };

  return { store, ...rtlRender(ui, { wrapper: Wrapper, ...renderOptions }) };
}

export * from '@testing-library/react';
export { renderWithProvider as render };
