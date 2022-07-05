import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

import { darkTheme, lightTheme, semiDarkTheme } from '../../theme/themeColors';

import AppContext from './AppContext';
import defaultContext from './defaultContext';

const initialThemeValue = defaultContext.theme;
const otherThemes = {
  light: lightTheme,
  'semi-dark': semiDarkTheme,
  dark: darkTheme,
};

function AppContextProvider({ children }) {
  const [locale, setLocale] = useState(defaultContext.defaultLng);
  const [theme, setTheme] = useState(initialThemeValue);
  const [themeType, setThemeType] = useState(defaultContext.themeType);
  const [layout, setLayout] = useState(defaultContext.layout);
  const [cardRadius, setCardRadius] = useState(defaultContext.theme.overrides.MuiCard.root.borderRadius);
  const [direction, setDirection] = useState(initialThemeValue.direction);
  const [showTourGuide, setTourGuideStatus] = useState(false);

  const contextValue = React.useMemo(
    () => ({
      locale,
      setLocale,
      theme,
      setTheme,
      layout,
      setLayout,
      themeType,
      setThemeType,
      cardRadius,
      setCardRadius,
      direction,
      setDirection,
      showTourGuide,
      setTourGuideStatus,
    }),
    [locale, theme, themeType, layout, direction, showTourGuide, cardRadius]
  );

  useEffect(() => {
    setTheme((prevState) => ({
      ...prevState,
      palette: {
        ...prevState.palette,
        ...otherThemes[themeType].palette,
      },
      overrides: {
        ...prevState.overrides,
        ...otherThemes[themeType].overrides,
      },
    }));
  }, [themeType]);

  useEffect(() => {
    setTheme((prevState) => ({
      ...prevState,
      overrides: {
        ...prevState.overrides,
        MuiCard: {
          ...prevState.overrides.MuiCard,
          root: {
            ...prevState.overrides.MuiCard.root,
            borderRadius: cardRadius,
          },
        },
      },
    }));
  }, [cardRadius]);

  useEffect(() => {
    setTheme((prevState) => ({
      ...prevState,
      direction,
    }));
    document.body.setAttribute('dir', direction);
  }, [direction]);

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
}

AppContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppContextProvider;
