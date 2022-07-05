import { cleanup, screen } from '@testing-library/react';
import React from 'react';

import renderWithProviders from '../../utils/renderWithProviders';

import AppLayout from './AppLayout';

import '@testing-library/jest-dom/extend-expect';

beforeEach(cleanup);

afterEach(() => {
  jest.clearAllMocks();
});

afterAll(() => {
  jest.restoreAllMocks();
});

describe('<AppLayout />', () => {
  beforeEach(() => {
    jest.spyOn(console, 'warn').mockImplementation(() => {});
    renderWithProviders(
      <AppLayout>
        <div>Child</div>
      </AppLayout>,
      {}
    );
  });

  it('renders children correctly', async () => {
    const result = await screen.findByText('Child');
    expect(result).toBeInTheDocument();
  });
});
