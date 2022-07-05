import PropTypes from 'prop-types';
import React from 'react';

import defaultContext from '../../context/app/defaultContext';
import CmtVerticalLayout from '../../coremat/CmtLayouts/Vertical';
import CmtContent from '../../coremat/CmtLayouts/Vertical/Content';
import CmtFooter from '../../coremat/CmtLayouts/Vertical/Footer';
import CmtHeader from '../../coremat/CmtLayouts/Vertical/Header';
import CmtSidebar from '../../coremat/CmtLayouts/Vertical/Sidebar';

import Footer from './Footer';
import Header from './Header';
import Sidebar from './Sidebar';
import SidebarHeader from './SidebarHeader';

const layoutOptions = {
  headerType: defaultContext.headerType,
  footerType: 'fixed',
  sidebarType: defaultContext.sidebarType,
  isSidebarFixed: defaultContext.isSidebarFixed,
  isSidebarOpen: false,
  showTourOpt: true,
  showFooterOpt: true,
  miniSidebarWidth: 80,
  layoutStyle: defaultContext.layoutType,
  drawerBreakPoint: defaultContext.drawerBreakPoint,
  sidebarWidth: defaultContext.sidebarWidth,
};

function VerticalDefault({ children }) {
  return (
    <CmtVerticalLayout
      className="verticalDefaultLayout"
      footer={
        <CmtFooter>
          <Footer />
        </CmtFooter>
      }
      header={
        <CmtHeader>
          <Header />
        </CmtHeader>
      }
      layoutOptions={layoutOptions}
      sidebar={
        <CmtSidebar>
          <SidebarHeader />
          <Sidebar />
        </CmtSidebar>
      }
    >
      <CmtContent>{children}</CmtContent>
    </CmtVerticalLayout>
  );
}

VerticalDefault.propTypes = {
  children: PropTypes.node.isRequired,
};

export default VerticalDefault;
