import { Button, CircularProgress } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';

function LoadingButton({ children, loading, ...rest }) {
  return (
    <Button {...rest}>
      {loading ? (
        <CircularProgress color="inherit" data-testid="loadingButton_circularProgress" size={18} />
      ) : (
        children
      )}
    </Button>
  );
}

LoadingButton.propTypes = {
  children: PropTypes.node.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default LoadingButton;
