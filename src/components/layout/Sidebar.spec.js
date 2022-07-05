import { cleanup, screen } from '@testing-library/react';
import React from 'react';

import renderWithProviders from '../../utils/renderWithProviders';

import Sidebar from './Sidebar';

import '@testing-library/jest-dom/extend-expect';

beforeEach(cleanup);

afterEach(() => {
  jest.clearAllMocks();
});

afterAll(() => {
  jest.restoreAllMocks();
});

jest.mock('react-perfect-scrollbar', () => ({
  __esModule: true,
  default: ({ children }) => <div data-testid="sidebar_perfectScrollbar">{children}</div>,
}));

jest.mock('../../coremat/CmtNavigation/Vertical', () => ({
  __esModule: true,
  default: () => <div>Cmt Vertical Navigation</div>,
}));

describe('<Sidebar />', () => {
  beforeEach(() => {
    renderWithProviders(<Sidebar />);
  });

  it('renders PerfectScrollbar correctly', async () => {
    const result = await screen.findByTestId('sidebar_perfectScrollbar');
    expect(result).toBeInTheDocument();
  });

  it('renders CmtVertical scrollbar correctly', async () => {
    const result = await screen.findByText('Cmt Vertical Navigation');
    expect(result).toBeInTheDocument();
  });
});
