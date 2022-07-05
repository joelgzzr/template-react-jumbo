import { cleanup, fireEvent, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import AppContextProvider from '../../context/app';
import renderWithProviders from '../../utils/renderWithProviders';

import LanguageSwitcher from './LanguageSwitcher';

import '@testing-library/jest-dom/extend-expect';

beforeEach(cleanup);

afterEach(() => {
  jest.clearAllMocks();
});

afterAll(() => {
  jest.restoreAllMocks();
});

describe('<LanguageSwitcher />', () => {
  beforeEach(() => {
    renderWithProviders(
      <AppContextProvider>
        <LanguageSwitcher />
      </AppContextProvider>,
      {}
    );
  });

  it('popover is not open initially', async () => {
    const result = await screen.findByTestId('laguageSwitcher_popover').catch(() => []);
    expect(result).toHaveLength(0);
  });

  it('opens popover on button click', async () => {
    const button = await screen.findByTestId('languageSwitcher_iconButton');

    fireEvent.click(button);

    const popover = await screen.findByTestId('laguageSwitcher_popover');
    expect(popover).toBeInTheDocument();
  });

  it('closes popover on language click', async () => {
    const button = await screen.findByTestId('languageSwitcher_iconButton');

    fireEvent.click(button);

    const english = await screen.findByTestId('languageSwitcher_english');

    fireEvent.click(english);

    await waitFor(() => expect(screen.queryAllByTestId('laguageSwitcher_popover')).toHaveLength(0));
  });

  it('closes popover on escape click', async () => {
    const button = await screen.findByTestId('languageSwitcher_iconButton');

    fireEvent.click(button);
    userEvent.keyboard('{esc}');

    await waitFor(() => expect(screen.queryAllByTestId('laguageSwitcher_popover')).toHaveLength(0));
  });
});
