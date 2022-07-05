import { createTheme } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import * as React from 'react';
import { IntlProvider } from 'react-intl';

import AppLocale from '../i18n';
import defaultTheme from '../theme/defaultTheme';

import { render } from './testUtils';

import '../setupTests';

const muiTheme = createTheme(defaultTheme);

const renderWithProviders = (component, preloadedState = {}) => ({
  ...render(
    <ThemeProvider theme={muiTheme}>
      <IntlProvider locale={AppLocale.en.locale} messages={AppLocale.en.messages}>
        {component}
      </IntlProvider>
    </ThemeProvider>,
    { preloadedState }
  ),
});

export default renderWithProviders;
