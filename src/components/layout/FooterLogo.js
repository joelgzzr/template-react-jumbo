import { Box } from '@material-ui/core';
import React from 'react';
import { NavLink } from 'react-router-dom';

import CmtImage from '../../coremat/CmtImage';

function FooterLogo(props) {
  return (
    <Box className="pointer" {...props}>
      <NavLink to="/">
        <CmtImage alt="logo" data-testid="footerLogo_logo" src="/images/footer-logo.png" />
      </NavLink>
    </Box>
  );
}

export default FooterLogo;
