import { Box, makeStyles } from '@material-ui/core';
import Hidden from '@material-ui/core/Hidden';
import React from 'react';

import FooterLogo from './FooterLogo';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  btnRoot: {
    [theme.breakpoints.down('xs')]: {
      padding: '6px 12px',
      fontSize: 11,
    },
  },
}));

function Footer(props) {
  const classes = useStyles();
  const date = new Date();

  return (
    <Box className={classes.root} {...props}>
      <Box alignItems="center" display="flex">
        <Hidden xsDown>
          <FooterLogo mr={5} />
        </Hidden>
        <Box color="text.disabled" component="p" fontSize={{ xs: 12, sm: 14 }}>
          Copyright Company Name © {date.getFullYear()}
        </Box>
      </Box>
    </Box>
  );
}

export default Footer;
