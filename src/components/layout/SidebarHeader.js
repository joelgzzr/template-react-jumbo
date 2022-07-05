import { MenuItem, MenuList, Paper, Popover, Typography } from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PersonIcon from '@material-ui/icons/Person';
import SettingsIcon from '@material-ui/icons/Settings';
import { Skeleton } from '@material-ui/lab';
import React, { useContext, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import CmtAvatar from '../../coremat/CmtAvatar';
import SidebarThemeContext from '../../coremat/CmtLayouts/SidebarThemeContext/SidebarThemeContext';
import { getUser, selectLoadingUser, selectUser, signOut } from '../../redux/features/auth';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '30px 16px 12px 16px',
    borderBottom: (props) => `solid 1px ${props.sidebarTheme.borderColor}`,
  },
  userInfo: {
    paddingTop: 24,
    transition: 'all 0.1s ease',
    height: 75,
    opacity: 1,
    '.Cmt-miniLayout .Cmt-sidebar-content:not(:hover) &': {
      height: 0,
      paddingTop: 0,
      opacity: 0,
      transition: 'all 0.3s ease',
    },
  },
  userTitle: {
    color: (props) => props.sidebarTheme.textDarkColor,
    marginBottom: 8,
  },
  userSubTitle: {
    fontSize: 14,
    fontWeight: theme.typography.fontWeightBold,
    letterSpacing: 0.25,
  },
}));

function SidebarHeader() {
  const dispatch = useDispatch();
  const loadingUser = useSelector(selectLoadingUser);
  const user = useSelector(selectUser);
  const { sidebarTheme } = useContext(SidebarThemeContext);
  const classes = useStyles({ sidebarTheme });
  const [anchorEl, setAnchorEl] = useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const onLogoutClick = () => {
    handlePopoverClose();
    dispatch(signOut());
  };

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  return (
    <div className={classes.root}>
      <CmtAvatar alt="User Avatar" src="https://via.placeholder.com/150" />
      <div
        className={classes.userInfo}
        data-testid="sidebarHeader_popoverOpen"
        role="button"
        tabIndex={0}
        onClick={handlePopoverOpen}
        onKeyDown={handlePopoverOpen}
      >
        <div
          className="pointer"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
          }}
        >
          <div className="mr-2">
            <Typography className={classes.userTitle} component="h3" variant="h6">
              {loadingUser ? (
                <Skeleton animation="wave" data-testid="sidebarHeader_userNameSkeleton" width={162} />
              ) : (
                user.name
              )}
            </Typography>
            <Typography className={classes.userSubTitle} variant="h6">
              {loadingUser ? (
                <Skeleton animation="wave" data-testid="sidebarHeader_userEmailSkeleton" width={162} />
              ) : (
                user.email
              )}
            </Typography>
          </div>
          <ArrowDropDownIcon />
        </div>
      </div>

      {open && (
        <Popover
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'center',
            horizontal: 'right',
          }}
          container={anchorEl}
          data-testid="sidebarHeader_popover"
          open={open}
          transformOrigin={{
            vertical: 'center',
            horizontal: 'right',
          }}
          onClose={handlePopoverClose}
        >
          <Paper elevation={8}>
            <MenuList>
              <MenuItem onClick={handlePopoverClose}>
                <PersonIcon />
                <div className="ml-2">Profile</div>
              </MenuItem>
              <MenuItem data-testid="sidebarHeader_settings" onClick={handlePopoverClose}>
                <SettingsIcon />
                <div className="ml-2">Settings</div>
              </MenuItem>
              <MenuItem data-testid="sidebarHeader_logout" onClick={onLogoutClick}>
                <ExitToAppIcon />
                <div className="ml-2">Logout</div>
              </MenuItem>
            </MenuList>
          </Paper>
        </Popover>
      )}
    </div>
  );
}

export default SidebarHeader;
