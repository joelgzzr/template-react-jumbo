import { cleanup, fireEvent, screen, waitFor } from '@testing-library/react';
import React from 'react';

import instance from '../../redux/axios';
import renderWithProviders from '../../utils/renderWithProviders';

import SignIn from './SignIn';

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

describe('<SignIn />', () => {
  const changeEvent = (content) => ({
    target: {
      value: content,
    },
  });

  it('does not show auth thumb when variant is not default', async () => {
    renderWithProviders(<SignIn variant="standard" />);
    const result = await screen.findByTestId('signIn_authThumb').catch(() => []);
    expect(result).toHaveLength(0);
  });

  it('shows auth thumb when variant is default', async () => {
    renderWithProviders(<SignIn />);
    const result = await screen.findByTestId('signIn_authThumb');
    expect(result).toBeInTheDocument();
  });

  it('shows error when blurring emailInput', async () => {
    renderWithProviders(<SignIn />);
    const emailInput = await screen.findByTestId('signIn_emailInput');

    fireEvent.focus(emailInput);
    fireEvent.blur(emailInput);

    const emailInputError = await screen.findByText('Email is Required');
    expect(emailInputError).toBeInTheDocument();
  });

  it('shows error when filling invalid email input', async () => {
    renderWithProviders(<SignIn />);
    const emailInput = await screen.findByTestId('signIn_emailInput');

    fireEvent.focus(emailInput);
    fireEvent.blur(emailInput);
    fireEvent.change(emailInput, changeEvent('invalidemail'));

    const emailInputError = await screen.findByText('Invalid Email');
    expect(emailInputError).toBeInTheDocument();
  });

  it('hides error when filling valid email input', async () => {
    renderWithProviders(<SignIn />);
    const emailInput = await screen.findByTestId('signIn_emailInput');

    fireEvent.focus(emailInput);
    fireEvent.blur(emailInput);
    fireEvent.change(emailInput, changeEvent('email@email.com'));

    const emailInputError = await screen.findByText('Invalid Email').catch(() => []);
    expect(emailInputError).toHaveLength(0);
  });

  it('shows error when blurring password input', async () => {
    renderWithProviders(<SignIn />);
    const passwordInput = await screen.findByTestId('signIn_passwordInput');

    fireEvent.focus(passwordInput);
    fireEvent.blur(passwordInput);

    const passwordInputError = await screen.findByText('Password is Required');
    expect(passwordInputError).toBeInTheDocument();
  });

  it('hides error when filling valid password input', async () => {
    renderWithProviders(<SignIn />);
    const passwordInput = await screen.findByTestId('signIn_passwordInput');

    fireEvent.focus(passwordInput);
    fireEvent.blur(passwordInput);
    fireEvent.change(passwordInput, changeEvent('password'));

    const passwordInputError = await screen.findByText('Password is Required').catch(() => []);
    expect(passwordInputError).toHaveLength(0);
  });

  it('does not show error when there is no signInErrors', async () => {
    renderWithProviders(<SignIn />, { auth: { loadingToken: false, signInErrors: {} } });

    const collapse = await screen.findByTestId('signIn_incorrectCredentialsCollapse');
    expect(collapse).toHaveClass('MuiCollapse-hidden');
  });

  it('shows error when invalid credentials are submitted', async () => {
    jest.spyOn(instance, 'post').mockRejectedValue({ response: { data: { error: 401 } } });

    renderWithProviders(<SignIn />, { auth: { loadingToken: false, signInErrors: {} } });
    const emailInput = await screen.findByTestId('signIn_emailInput');
    const passwordInput = await screen.findByTestId('signIn_passwordInput');
    const submitButton = await screen.findByTestId('signIn_submitButton');

    fireEvent.change(emailInput, changeEvent('email@email.com'));
    fireEvent.change(passwordInput, changeEvent('password'));
    fireEvent.click(submitButton);

    const collapse = await screen.findByTestId('signIn_incorrectCredentialsCollapse');
    await waitFor(() => expect(collapse).not.toHaveClass('MuiCollapse-hidden'));
  });

  it('gets token when valid credentials are submitted', async () => {
    jest.spyOn(instance, 'post').mockResolvedValue({ data: { accessToken: 'testToken' } });

    const { store } = renderWithProviders(<SignIn />, { auth: { loadingToken: false, signInErrors: {} } });
    const emailInput = await screen.findByTestId('signIn_emailInput');
    const passwordInput = await screen.findByTestId('signIn_passwordInput');
    const submitButton = await screen.findByTestId('signIn_submitButton');

    fireEvent.change(emailInput, changeEvent('email@email.com'));
    fireEvent.change(passwordInput, changeEvent('password'));
    fireEvent.click(submitButton);

    await waitFor(() => expect(store.getState().auth.token).toBe('testToken'));
  });
});
