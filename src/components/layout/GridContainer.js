import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import React from 'react';

function GridContainer({ children, ...rest }) {
  return (
    <Grid spacing={6} container {...rest}>
      {children}
    </Grid>
  );
}

GridContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default GridContainer;
