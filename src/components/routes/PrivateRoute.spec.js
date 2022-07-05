import { cleanup, screen } from '@testing-library/react';
import React from 'react';

import { render } from '../../utils/testUtils';

import PrivateRoute from './PrivateRoute';

import '@testing-library/jest-dom/extend-expect';

beforeEach(cleanup);

afterEach(() => {
  jest.clearAllMocks();
});

afterAll(() => {
  jest.restoreAllMocks();
});

jest.mock('react-router-dom', () => ({
  Outlet: (props) => <div {...props} />,
  Navigate: (props) => <div {...props} />,
}));

describe('<PrivateRoute />', () => {
  it('renders Navigate when no token', async () => {
    render(<PrivateRoute />, { preloadedState: { auth: { token: '' } } });
    const result = await screen.findByTestId('privateRoute_navigate');
    expect(result).toBeInTheDocument();
  });

  it('renders Outlet when token', async () => {
    render(<PrivateRoute />, { preloadedState: { auth: { token: 'test' } } });
    const result = await screen.findByTestId('privateRoute_outlet');
    expect(result).toBeInTheDocument();
  });
});
