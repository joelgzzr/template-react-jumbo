import { Box, makeStyles, Typography } from '@material-ui/core';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  pageHeaderRoot: {
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.up('sm')]: {
      alignItems: 'center',
      flexDirection: 'row',
    },
  },
  titleRoot: {
    [theme.breakpoints.down('xs')]: {
      marginBottom: 10,
    },
  },
}));

const Component = () => {};

function PageHeader({ heading, breadcrumbComponent, children, ...rest }) {
  const classes = useStyles();

  return (
    <Box className={clsx(classes.pageHeaderRoot, 'page-header')} mb={{ xs: 5, md: 6, lg: 8 }} {...rest}>
      <Typography className={clsx(classes.titleRoot, 'title')} component="div" variant="h1">
        {heading}
      </Typography>
      <Box ml={{ sm: 'auto' }}>{breadcrumbComponent}</Box>

      {children}
    </Box>
  );
}

PageHeader.propTypes = {
  breadcrumbComponent: PropTypes.node.isRequired,
  heading: PropTypes.node.isRequired,
  children: PropTypes.node,
};

PageHeader.defaultProps = {
  children: <Component />,
};

export default PageHeader;
