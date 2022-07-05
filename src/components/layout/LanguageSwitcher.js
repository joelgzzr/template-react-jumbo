import { IconButton, Popover, useTheme } from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';
import React, { useContext, useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';

import AppContext from '../../context/app/AppContext';
import CmtCard from '../../coremat/CmtCard';
import CmtCardHeader from '../../coremat/CmtCard/CmtCardHeader';
import CmtImage from '../../coremat/CmtImage';
import CmtList from '../../coremat/CmtList';
import { flags, languageData } from '../../utils/intlData';

import LanguageItem from './LanguageItem';

const useStyles = makeStyles(() => ({
  cardRoot: {
    '& .Cmt-header-root': {
      paddingTop: 14,
      paddingBottom: 14,
    },
  },
  perfectScrollbarLanguage: {
    height: 170,
  },
  menuItemRoot: {
    paddingTop: 0,
    paddingBottom: 0,
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  popoverRoot: {
    '& .MuiPopover-paper': {
      width: 205,
    },
  },
}));

function LanguageSwitcher() {
  const classes = useStyles();
  const { locale, setLocale } = useContext(AppContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const theme = useTheme();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'language' : undefined;

  const switchLanguage = (item) => {
    setLocale(item);
    handleClose();
  };

  return (
    <>
      <IconButton
        data-testid="languageSwitcher_iconButton"
        data-tut="reactour__localization"
        size="small"
        onClick={handleClick}
      >
        <CmtImage src={flags[locale.locale]} />
      </IconButton>

      <Popover
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        className={classes.popoverRoot}
        data-testid="laguageSwitcher_popover"
        id={id}
        open={open}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        onClose={handleClose}
      >
        <CmtCard className={classes.cardRoot}>
          <CmtCardHeader
            separator={{
              color: theme.palette.borderColor.dark,
              borderWidth: 1,
              borderStyle: 'solid',
            }}
            title="Language"
          />
          <PerfectScrollbar className={classes.perfectScrollbarLanguage}>
            <CmtList
              data={languageData}
              renderRow={(item, index) => (
                <LanguageItem
                  data-testid={`languageSwitcher_${item.languageId}`}
                  key={index}
                  language={item}
                  onClick={switchLanguage}
                />
              )}
            />
          </PerfectScrollbar>
        </CmtCard>
      </Popover>
    </>
  );
}

export default LanguageSwitcher;
