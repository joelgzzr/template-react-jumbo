import { cleanup, screen } from '@testing-library/react';
import React from 'react';

import AppContextProvider from '../../context/app';
import renderWithProviders from '../../utils/renderWithProviders';

import VerticalDefault from './VerticalDefault';

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

describe('<VerticalDefault />', () => {
  beforeEach(() => {
    jest.spyOn(console, 'warn').mockImplementation(() => {});
    renderWithProviders(
      <AppContextProvider>
        <VerticalDefault>
          <div>Child</div>
        </VerticalDefault>
      </AppContextProvider>,
      {}
    );
  });

  it('renders child correctly', async () => {
    const result = await screen.findByText('Child');
    expect(result).toBeInTheDocument();
  });
});
