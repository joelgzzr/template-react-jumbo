import PropTypes from 'prop-types';

import globalStyles from '../../theme/GlobalCss';

function AppLayout({ children }) {
  globalStyles();

  return children;
}

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
