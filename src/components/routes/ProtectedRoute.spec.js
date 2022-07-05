import { cleanup, waitFor, screen } from '@testing-library/react';
import React from 'react';

import { render } from '../../utils/testUtils';

import ProtectedRoute from './ProtectedRoute';

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

describe('<ProtectedRoute />', () => {
  it('renders Navigate when token', async () => {
    render(<ProtectedRoute />, { preloadedState: { auth: { token: 'test' } } });

    const result = screen.getByTestId('protectedRoute_navigate');
    await waitFor(() => expect(result).toBeInTheDocument());
  });

  it('renders Outlet when no token', async () => {
    render(<ProtectedRoute />, { preloadedState: { auth: { token: '' } } });

    const result = screen.getByTestId('protectedRoute_outlet');
    await waitFor(() => expect(result).toBeInTheDocument());
  });
});
