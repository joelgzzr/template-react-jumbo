import { cleanup, fireEvent, screen, waitFor } from '@testing-library/react';
import React from 'react';

import instance from '../../redux/axios';
import renderWithProviders from '../../utils/renderWithProviders';

import SignUp from './SignUp';

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

describe('<SignUp />', () => {
  const changeEvent = (content) => ({
    target: {
      value: content,
    },
  });

  it('does not show auth thumb when variant is not default', async () => {
    renderWithProviders(<SignUp variant="standard" />);
    const result = await screen.findByTestId('signUp_authThumb').catch(() => []);
    expect(result).toHaveLength(0);
  });

  it('shows auth thumb when variant is default', async () => {
    renderWithProviders(<SignUp />);
    const result = await screen.findByTestId('signUp_authThumb');
    expect(result).toBeInTheDocument();
  });

  it('shows error when blurring name input', async () => {
    renderWithProviders(<SignUp />);
    const nameInput = await screen.findByTestId('signUp_nameInput');

    fireEvent.focus(nameInput);
    fireEvent.blur(nameInput);

    const nameInputError = await screen.findByText('Name is Required');
    expect(nameInputError).toBeInTheDocument();
  });

  it('hides error when filling valid name input', async () => {
    renderWithProviders(<SignUp />);
    const nameInput = await screen.findByTestId('signUp_nameInput');

    fireEvent.focus(nameInput);
    fireEvent.blur(nameInput);
    fireEvent.change(nameInput, changeEvent('Test name'));

    const nameInputError = await screen.findByText('Name is Required').catch(() => []);
    expect(nameInputError).toHaveLength(0);
  });

  it('shows error when blurring email input', async () => {
    renderWithProviders(<SignUp />);
    const emailInput = await screen.findByTestId('signUp_emailInput');

    fireEvent.focus(emailInput);
    fireEvent.blur(emailInput);

    const emailInputError = await screen.findByText('Email is Required');
    expect(emailInputError).toBeInTheDocument();
  });

  it('shows error when filling invalid email input', async () => {
    renderWithProviders(<SignUp />);
    const emailInput = await screen.findByTestId('signUp_emailInput');

    fireEvent.focus(emailInput);
    fireEvent.blur(emailInput);
    fireEvent.change(emailInput, changeEvent('invalidemail'));

    const emailInputError = await screen.findByText('Invalid Email');
    expect(emailInputError).toBeInTheDocument();
  });

  it('hides error when filling valid email input', async () => {
    renderWithProviders(<SignUp />);
    const emailInput = await screen.findByTestId('signUp_emailInput');

    fireEvent.focus(emailInput);
    fireEvent.blur(emailInput);
    fireEvent.change(emailInput, changeEvent('email@email.com'));

    const emailInputError = await screen.findByText('Invalid Email').catch(() => []);
    expect(emailInputError).toHaveLength(0);
  });

  it('shows error when blurring password input', async () => {
    renderWithProviders(<SignUp />);
    const passwordInput = await screen.findByTestId('signUp_passwordInput');

    fireEvent.focus(passwordInput);
    fireEvent.blur(passwordInput);

    const passwordInputError = await screen.findByText('Password is Required');
    expect(passwordInputError).toBeInTheDocument();
  });

  it('shows error when password is not at least 6 characters', async () => {
    renderWithProviders(<SignUp />);
    const passwordInput = await screen.findByTestId('signUp_passwordInput');

    fireEvent.change(passwordInput, changeEvent('pass'));
    fireEvent.blur(passwordInput);

    const passwordInputError = await screen.findByText('Password must be at least 6 characters');
    expect(passwordInputError).toBeInTheDocument();
  });

  it('hides error when filling valid password input', async () => {
    renderWithProviders(<SignUp />);
    const passwordInput = await screen.findByTestId('signUp_passwordInput');

    fireEvent.focus(passwordInput);
    fireEvent.blur(passwordInput);
    fireEvent.change(passwordInput, changeEvent('password'));

    const passwordInputError = await screen.findByText('Password is Required').catch(() => []);
    expect(passwordInputError).toHaveLength(0);
  });

  it('does not show error when there is no signUpErrors', async () => {
    renderWithProviders(<SignUp />, { auth: { loadingToken: false, signUpErrors: {} } });

    const collapse = await screen.findByTestId('signUp_signUpErrorsCollapse');
    expect(collapse).toHaveClass('MuiCollapse-hidden');
  });

  it('shows error when invalid data is submitted', async () => {
    jest.spyOn(instance, 'post').mockRejectedValue({ response: { data: { error: 409 } } });

    renderWithProviders(<SignUp />, { auth: { loadingToken: false, signUpErrors: {} } });
    const nameInput = await screen.findByTestId('signUp_nameInput');
    const emailInput = await screen.findByTestId('signUp_emailInput');
    const passwordInput = await screen.findByTestId('signUp_passwordInput');
    const submitButton = await screen.findByTestId('signUp_submitButton');

    fireEvent.change(nameInput, changeEvent('Test name'));
    fireEvent.change(emailInput, changeEvent('email@email.com'));
    fireEvent.change(passwordInput, changeEvent('password'));
    fireEvent.click(submitButton);

    const collapse = await screen.findByTestId('signUp_signUpErrorsCollapse');
    await waitFor(() => expect(collapse).not.toHaveClass('MuiCollapse-hidden'));
  });

  it('gets token when valid data is submitted', async () => {
    jest.spyOn(instance, 'post').mockResolvedValue({ data: { accessToken: 'testToken' } });

    const { store } = renderWithProviders(<SignUp />, { auth: { loadingToken: false, signUpErrors: {} } });
    const nameInput = await screen.findByTestId('signUp_nameInput');
    const emailInput = await screen.findByTestId('signUp_emailInput');
    const passwordInput = await screen.findByTestId('signUp_passwordInput');
    const submitButton = await screen.findByTestId('signUp_submitButton');

    fireEvent.change(nameInput, changeEvent('Test name'));
    fireEvent.change(emailInput, changeEvent('email@email.com'));
    fireEvent.change(passwordInput, changeEvent('password'));
    fireEvent.click(submitButton);

    await waitFor(() => expect(store.getState().auth.token).toBe('testToken'));
  });
});
