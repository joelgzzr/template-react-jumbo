import { Button } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import { alpha, makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { NavLink } from 'react-router-dom';

import IntlMessages from '../common/IntlMessages';
import VerticalDefault from '../layout/VerticalDefault';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  errorNumber: {
    color: theme.palette.text.primary,
    fontWeight: 800,
    lineHeight: 1,
    marginBottom: 30,
    textShadow: '10px 6px 8px hsla(0,0%,45.9%,.8)',
  },
  searchRoot: {
    position: 'relative',
    width: 260,
    [theme.breakpoints.up('md')]: {
      width: 350,
    },
    '& .searchBtn': {
      position: 'absolute',
      right: 0,
      top: '50%',
      transform: 'translateY(-50%)',
      zIndex: 1,
    },
    '& .MuiInputBase-root': {
      width: '100%',
    },
    '& .MuiInputBase-input': {
      height: 48,
      borderRadius: 4,
      position: 'relative',
      backgroundColor: theme.palette.background.paper,
      border: '1px solid #ced4da',
      fontSize: 16,
      boxSizing: 'border-box',
      padding: '5px 50px 5px 15px',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      '&:focus': {
        boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
        borderColor: theme.palette.primary.main,
      },
    },
  },
}));

function Error404() {
  const classes = useStyles();

  return (
    <VerticalDefault>
      <Box className={classes.root}>
        <Box className={classes.errorNumber} data-testid="error404_404" fontSize={{ xs: 100, sm: 160 }}>
          404
        </Box>
        <Box color="grey.500" fontSize={{ xs: 16, sm: 24 }} mb={8}>
          <IntlMessages id="notFound.message" />
        </Box>
        <Box mt={8}>
          <Button color="primary" component={NavLink} to="/" variant="contained">
            <IntlMessages id="notFound.goHome" />
          </Button>
        </Box>
      </Box>
    </VerticalDefault>
  );
}

export default Error404;
