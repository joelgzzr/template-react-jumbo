import Box from '@material-ui/core/Box';
import Slide from '@material-ui/core/Slide';
import makeStyles from '@material-ui/core/styles/makeStyles';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React from 'react';

import PageBreadcrumbs from './PageBreadcrumbs';
import PageHeader from './PageHeader';

const useStyles = makeStyles(() => ({
  pageFull: {
    width: '100%',
  },
}));

function PageContainer({ heading, breadcrumbs, children, className, ...restProps }) {
  const classes = useStyles();

  return (
    <Slide direction="up" in mountOnEnter unmountOnExit>
      <Box className={clsx(classes.pageFull, className)} {...restProps}>
        <PageHeader breadcrumbComponent={breadcrumbs && <PageBreadcrumbs items={breadcrumbs} />} heading={heading} />
        {children}
      </Box>
    </Slide>
  );
}

PageContainer.propTypes = {
  breadcrumbs: PropTypes.arrayOf(PropTypes.object).isRequired,
  children: PropTypes.node.isRequired,
  heading: PropTypes.node.isRequired,
  className: PropTypes.string,
};

PageContainer.defaultProps = {
  className: '',
};

export default PageContainer;
