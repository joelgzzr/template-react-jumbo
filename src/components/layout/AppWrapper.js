import MomentUtils from '@date-io/moment';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createTheme, jssPreset, StylesProvider } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { ThemeProvider } from '@material-ui/styles';
import { create } from 'jss';
import rtl from 'jss-rtl';
import PropTypes from 'prop-types';
import React, { useContext, useMemo } from 'react';
import { IntlProvider } from 'react-intl';

import AppContext from '../../context/app/AppContext';
import AppLocale from '../../i18n';

import AppLayout from './AppLayout';

// Configure JSS
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

function AppWrapper({ children }) {
  const { locale, theme } = useContext(AppContext);

  const muiTheme = useMemo(() => createTheme(theme), [theme]);

  return (
    <IntlProvider locale={AppLocale[locale.locale].locale} messages={AppLocale[locale.locale].messages}>
      <ThemeProvider theme={muiTheme}>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <StylesProvider jss={jss}>
            <CssBaseline />
            <AppLayout>{children}</AppLayout>
          </StylesProvider>
        </MuiPickersUtilsProvider>
      </ThemeProvider>
    </IntlProvider>
  );
}

AppWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppWrapper;
