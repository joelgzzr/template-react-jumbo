import { Breadcrumbs, makeStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React from 'react';
import { NavLink } from 'react-router-dom';

const useStyles = makeStyles(() => ({
  textSm: {
    fontSize: 12,
  },
  linkBlock: {
    display: 'block',
    color: 'inherit',
  },
}));

function PageBreadcrumbs({ items, ...rest }) {
  const classes = useStyles();

  return (
    <Breadcrumbs aria-label="breadcrumb" {...rest} className="bread-crumbs">
      {items.map((item, index) =>
        item.isActive ? (
          <Typography className={classes.textSm} color="textPrimary" key={index}>
            {item.label}
          </Typography>
        ) : (
          <NavLink
            className={clsx(classes.textSm, classes.linkBlock)}
            color="inherit"
            key={index}
            to={item.link || '/'}
          >
            {item.label}
          </NavLink>
        )
      )}
    </Breadcrumbs>
  );
}

PageBreadcrumbs.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default PageBreadcrumbs;
