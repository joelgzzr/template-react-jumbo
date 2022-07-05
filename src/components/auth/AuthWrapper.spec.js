import { cleanup, screen } from '@testing-library/react';
import React from 'react';

import renderWithProviders from '../../utils/renderWithProviders';

import AuthWrapper from './AuthWrapper';

import '@testing-library/jest-dom/extend-expect';

beforeEach(cleanup);

afterEach(() => {
  jest.clearAllMocks();
});

afterAll(() => {
  jest.restoreAllMocks();
});

describe('<AuthWrapper />', () => {
  beforeEach(() => {
    jest.spyOn(console, 'warn').mockImplementation(() => {});
    renderWithProviders(
      <AuthWrapper variant="bgColor">
        <div>Child</div>
      </AuthWrapper>,
      {}
    );
  });

  it('renders children correctly', async () => {
    const result = await screen.findByText('Child');
    expect(result).toBeInTheDocument();
  });
});
