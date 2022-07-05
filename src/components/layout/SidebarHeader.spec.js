import { cleanup, fireEvent, screen, waitFor } from '@testing-library/react';
import React from 'react';

import AppContextProvider from '../../context/app';
import SidebarThemeProvider from '../../coremat/CmtLayouts/SidebarThemeContext';
import instance from '../../redux/axios';
import renderWithProviders from '../../utils/renderWithProviders';

import SidebarHeader from './SidebarHeader';

import '@testing-library/jest-dom/extend-expect';

beforeEach(cleanup);

afterEach(() => {
  jest.clearAllMocks();
});

afterAll(() => {
  jest.restoreAllMocks();
});

describe('<SidebarHeader />', () => {
  it('renders user name when user is not loading', async () => {
    jest.spyOn(instance, 'get').mockResolvedValue({ data: { name: 'Test name', email: 'test@test.com' } });
    renderWithProviders(
      <AppContextProvider>
        <SidebarThemeProvider>
          <SidebarHeader />
        </SidebarThemeProvider>
      </AppContextProvider>,
      {
        auth: { loadingUser: false, user: { name: 'Test name', email: 'test@test.com' } },
      }
    );
    const result = await screen.findByText('Test name');
    expect(result).toBeInTheDocument();
  });

  it('renders user name skeleton when user is loading', async () => {
    jest.spyOn(instance, 'get').mockResolvedValue({ data: {} });
    renderWithProviders(
      <AppContextProvider>
        <SidebarThemeProvider>
          <SidebarHeader />
        </SidebarThemeProvider>
      </AppContextProvider>,
      {
        auth: { loadingUser: true, user: {} },
      }
    );
    const result = await screen.findByTestId('sidebarHeader_userNameSkeleton');
    await waitFor(() => expect(result).toBeInTheDocument());
  });

  it('renders user email when user is not loading', async () => {
    jest.spyOn(instance, 'get').mockResolvedValue({ data: { name: 'Test name', email: 'test@test.com' } });
    renderWithProviders(
      <AppContextProvider>
        <SidebarThemeProvider>
          <SidebarHeader />
        </SidebarThemeProvider>
      </AppContextProvider>,
      {
        auth: { loadingUser: false, user: { name: 'Test name', email: 'test@test.com' } },
      }
    );
    const result = await screen.findByText('test@test.com');
    expect(result).toBeInTheDocument();
  });

  it('renders user email skeleton when user is loading', async () => {
    jest.spyOn(instance, 'get').mockResolvedValue({ data: {} });
    renderWithProviders(
      <AppContextProvider>
        <SidebarThemeProvider>
          <SidebarHeader />
        </SidebarThemeProvider>
      </AppContextProvider>,
      {
        auth: { loadingUser: true, user: {} },
      }
    );
    const result = await screen.findByTestId('sidebarHeader_userEmailSkeleton');
    await waitFor(() => expect(result).toBeInTheDocument());
  });

  it('popover is not open initially', async () => {
    jest.spyOn(instance, 'get').mockResolvedValue({ data: { name: 'Test name', email: 'test@test.com' } });
    renderWithProviders(
      <AppContextProvider>
        <SidebarThemeProvider>
          <SidebarHeader />
        </SidebarThemeProvider>
      </AppContextProvider>,
      {
        auth: { loadingUser: false, user: { name: 'Test name', email: 'test@test.com' } },
      }
    );
    const result = await screen.findByTestId('sidebarHeader_popover').catch(() => []);
    expect(result).toHaveLength(0);
  });

  it('opens popover on popover open click', async () => {
    jest.spyOn(instance, 'get').mockResolvedValue({ data: { name: 'Test name', email: 'test@test.com' } });
    renderWithProviders(
      <AppContextProvider>
        <SidebarThemeProvider>
          <SidebarHeader />
        </SidebarThemeProvider>
      </AppContextProvider>,
      {
        auth: { loadingUser: false, user: { name: 'Test name', email: 'test@test.com' } },
      }
    );
    const popoverOpen = await screen.findByTestId('sidebarHeader_popoverOpen');

    fireEvent.click(popoverOpen);

    const popover = await screen.findByTestId('sidebarHeader_popover');
    expect(popover).toBeInTheDocument();
  });

  it('closes popover on menu item click', async () => {
    jest.spyOn(instance, 'get').mockResolvedValue({ data: { name: 'Test name', email: 'test@test.com' } });
    renderWithProviders(
      <AppContextProvider>
        <SidebarThemeProvider>
          <SidebarHeader />
        </SidebarThemeProvider>
      </AppContextProvider>,
      {
        auth: { loadingUser: false, user: { name: 'Test name', email: 'test@test.com' } },
      }
    );
    const popoverOpen = await screen.findByTestId('sidebarHeader_popoverOpen');

    fireEvent.click(popoverOpen);

    const settings = await screen.findByTestId('sidebarHeader_settings');

    fireEvent.click(settings);

    const popover = await screen.findByTestId('sidebarHeader_popover').catch(() => []);
    expect(popover).toHaveLength(0);
  });

  it('removes token on logout click', async () => {
    jest.spyOn(instance, 'get').mockResolvedValue({ data: { name: 'Test name', email: 'test@test.com' } });
    const { store } = renderWithProviders(
      <AppContextProvider>
        <SidebarThemeProvider>
          <SidebarHeader />
        </SidebarThemeProvider>
      </AppContextProvider>,
      {
        auth: { loadingUser: false, user: { name: 'Test name', email: 'test@test.com' }, token: 'test' },
      }
    );
    const popoverOpen = await screen.findByTestId('sidebarHeader_popoverOpen');

    fireEvent.click(popoverOpen);

    const logout = await screen.findByTestId('sidebarHeader_logout');

    fireEvent.click(logout);

    expect(store.getState().auth.token).toBe('');
  });
});
