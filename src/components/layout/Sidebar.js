import makeStyles from '@material-ui/core/styles/makeStyles';
import { PostAdd } from '@material-ui/icons';
import React from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';

import CmtVertical from '../../coremat/CmtNavigation/Vertical';
import IntlMessages from '../common/IntlMessages';

const useStyles = makeStyles(() => ({
  perfectScrollbarSidebar: {
    height: '100%',
    transition: 'all 0.3s ease',
    '.Cmt-sidebar-fixed &, .Cmt-Drawer-container &': {
      height: 'calc(100% - 167px)',
    },
    '.Cmt-modernLayout &': {
      height: 'calc(100% - 72px)',
    },
    '.Cmt-miniLayout &': {
      height: 'calc(100% - 91px)',
    },
    '.Cmt-miniLayout .Cmt-sidebar-content:hover &': {
      height: 'calc(100% - 167px)',
    },
  },
}));

const sidebarNavs = [
  {
    name: <IntlMessages id="sidebar.main" />,
    type: 'section',
    children: [
      {
        name: <IntlMessages id="sidebar.menu.samplePage" />,
        type: 'item',
        icon: <PostAdd />,
        link: '/',
      },
    ],
  },
];

function Sidebar() {
  const classes = useStyles();

  return (
    <PerfectScrollbar className={classes.perfectScrollbarSidebar}>
      <CmtVertical menuItems={sidebarNavs} />
    </PerfectScrollbar>
  );
}

export default Sidebar;
