import { cleanup } from '@testing-library/react';
import React from 'react';

import { render } from './testUtils';

import '@testing-library/jest-dom/extend-expect';

beforeEach(cleanup);

afterEach(() => {
  jest.clearAllMocks();
});

afterAll(() => {
  jest.restoreAllMocks();
});

describe('tesUtils', () => {
  it('renders intial state correctly', async () => {
    const { store } = render(<div />, {});
    expect(store.getState()).toStrictEqual({
      auth: {
        loadingUser: false,
        loadingToken: false,
        user: {},
        signInErrors: {},
        signUpErrors: {},
        token: '',
      },
    });
  });

  it('renders preloaded state correctly', async () => {
    const { store } = render(<div />, { preloadedState: { auth: 'preloaded' } });
    expect(store.getState()).toStrictEqual({ auth: 'preloaded' });
  });
});
