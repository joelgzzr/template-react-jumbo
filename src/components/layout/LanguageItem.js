import Box from '@material-ui/core/Box';
import { alpha } from '@material-ui/core/styles';
import makeStyles from '@material-ui/core/styles/makeStyles';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React from 'react';

import CmtImage from '../../coremat/CmtImage';
import { flags } from '../../utils/intlData';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    padding: '12px 24px',
    '& .flag': {
      fontSize: 30,
    },
    '&:hover': {
      backgroundColor: alpha(theme.palette.primary.main, 0.08),
    },
  },
}));

function LanguageItem({ language, onClick, ...rest }) {
  const { locale, name } = language;
  const classes = useStyles();

  return (
    <Box className={clsx(classes.root, 'pointer')} onClick={() => onClick(language)} {...rest}>
      <CmtImage src={flags[locale]} />
      <Box ml={3}>{name}</Box>
    </Box>
  );
}

LanguageItem.propTypes = {
  language: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default LanguageItem;
