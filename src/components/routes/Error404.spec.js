/* eslint-disable react/prop-types */
import { cleanup, screen } from '@testing-library/react';
import React from 'react';

import renderWithProviders from '../../utils/renderWithProviders';

import Error404 from './Error404';

import '@testing-library/jest-dom/extend-expect';

beforeEach(cleanup);

afterEach(() => {
  jest.clearAllMocks();
});

afterAll(() => {
  jest.restoreAllMocks();
});

jest.mock('react-router-dom', () => ({
  useLocation: jest.fn(),
  NavLink: () => <div />,
}));

jest.mock('@material-ui/core', () => ({
  ...jest.requireActual('@material-ui/core'),
  Button: ({ component, ...rest }) => <div {...rest} />,
}));

jest.mock('../layout/VerticalDefault', () => ({
  __esModule: true,
  default: ({ children, ...rest }) => <div {...rest}>{children}</div>,
}));

describe('<Error404 />', () => {
  beforeEach(() => {
    renderWithProviders(<Error404 />);
  });

  it('renders 404', async () => {
    const result = await screen.findByTestId('error404_404');
    expect(result).toBeInTheDocument();
  });

  it('renders not found message', async () => {
    const result = await screen.findByText('Not Found');
    expect(result).toBeInTheDocument();
  });

  it('renders go home button', async () => {
    const result = await screen.findByText('Go Home');
    expect(result).toBeInTheDocument();
  });
});
