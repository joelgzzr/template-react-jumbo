import { Box } from '@material-ui/core';
import Hidden from '@material-ui/core/Hidden';
import React from 'react';
import { NavLink } from 'react-router-dom';

import CmtImage from '../../coremat/CmtImage';

function Logo(props) {
  return (
    <Box className="pointer" {...props}>
      <Hidden xsDown>
        <NavLink to="/">
          <CmtImage alt="logo" src="/images/logo-white.png" />
        </NavLink>
      </Hidden>
      <Hidden smUp>
        <NavLink to="/">
          <CmtImage alt="logo" src="/images/logo-white-symbol.png" />
        </NavLink>
      </Hidden>
    </Box>
  );
}

export default Logo;
