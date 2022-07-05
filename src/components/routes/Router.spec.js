import { cleanup, screen } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import renderWithProviders from '../../utils/renderWithProviders';

import Router from './Router';

import '@testing-library/jest-dom/extend-expect';

beforeEach(cleanup);

afterEach(() => {
  jest.clearAllMocks();
});

afterAll(() => {
  jest.restoreAllMocks();
});

jest.mock('../sample/SamplePage', () => ({
  __esModule: true,
  default: () => <div>Sample Page</div>,
}));

jest.mock('../auth/SignIn', () => ({
  __esModule: true,
  default: () => <div>Sign In</div>,
}));

jest.mock('../auth/SignUp', () => ({
  __esModule: true,
  default: () => <div>Sign Up</div>,
}));

jest.mock('./Error404', () => ({
  __esModule: true,
  default: () => <div>Error 404</div>,
}));

describe('<Router />', () => {
  it('renders sample page', async () => {
    renderWithProviders(
      <MemoryRouter initialEntries={['/']}>
        <Router />
      </MemoryRouter>,
      { auth: { token: 'test' } }
    );

    const result = await screen.findByText('Sample Page');

    expect(result).toBeInTheDocument();
  });

  it('renders sign in page', async () => {
    renderWithProviders(
      <MemoryRouter initialEntries={['/signin']}>
        <Router />
      </MemoryRouter>,
      { auth: { token: '' } }
    );

    const result = await screen.findByText('Sign In');

    expect(result).toBeInTheDocument();
  });

  it('renders sign up page', async () => {
    renderWithProviders(
      <MemoryRouter initialEntries={['/signup']}>
        <Router />
      </MemoryRouter>,
      { auth: { token: '' } }
    );

    const result = await screen.findByText('Sign Up');

    expect(result).toBeInTheDocument();
  });

  it('renders 404 page', async () => {
    renderWithProviders(
      <MemoryRouter initialEntries={['/no-match']}>
        <Router />
      </MemoryRouter>,
      { auth: { token: '' } }
    );

    const result = await screen.findByText('Error 404');

    expect(result).toBeInTheDocument();
  });
});
