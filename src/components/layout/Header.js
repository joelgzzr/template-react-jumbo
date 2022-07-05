import { Box } from '@material-ui/core';
import Toolbar from '@material-ui/core/Toolbar';
import { alpha } from '@material-ui/core/styles';
import makeStyles from '@material-ui/core/styles/makeStyles';
import React from 'react';

import SidebarToggleHandler from '../../coremat/CmtLayouts/Vertical/SidebarToggleHandler';

import LanguageSwitcher from './LanguageSwitcher';
import Logo from './Logo';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    paddingLeft: 16,
    paddingRight: 16,
    minHeight: 64,
    [theme.breakpoints.up('md')]: {
      minHeight: 72,
    },
    [theme.breakpoints.up('md')]: {
      paddingLeft: 24,
      paddingRight: 24,
    },
  },
  searchRoot: {
    position: 'relative',
    width: 260,
    [theme.breakpoints.up('md')]: {
      width: 350,
    },
    '& .MuiSvgIcon-root': {
      position: 'absolute',
      left: 18,
      top: '50%',
      transform: 'translateY(-50%)',
      zIndex: 1,
    },
    '& .MuiInputBase-root': {
      width: '100%',
    },
    '& .MuiInputBase-input': {
      height: 48,
      borderRadius: 30,
      backgroundColor: alpha(theme.palette.common.dark, 0.38),
      color: alpha(theme.palette.common.white, 0.7),
      boxSizing: 'border-box',
      padding: '5px 15px 5px 50px',
      transition: 'all 0.3s ease',
      '&:focus': {
        backgroundColor: alpha(theme.palette.common.dark, 0.58),
        color: alpha(theme.palette.common.white, 0.7),
      },
    },
  },
  langRoot: {
    borderLeft: `solid 1px ${alpha(theme.palette.common.dark, 0.15)}`,
    minHeight: 72,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 8,
    paddingRight: 8,
    position: 'relative',
    [theme.breakpoints.down('sm')]: {
      minHeight: 64,
    },
  },
  iconBtn: {
    color: alpha(theme.palette.common.white, 0.38),
    '&:hover, &:focus': {
      color: theme.palette.common.white,
    },
  },
}));

function Header() {
  const classes = useStyles();

  return (
    <Toolbar className={classes.root}>
      <SidebarToggleHandler aria-label="menu" color="inherit" edge="start" />
      <Logo ml={2} />
      <Box flex={1} />
      <Box className={classes.langRoot}>
        <LanguageSwitcher />
      </Box>
    </Toolbar>
  );
}

export default Header;
