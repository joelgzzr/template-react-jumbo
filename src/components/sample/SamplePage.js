import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import React from 'react';

import IntlMessages from '../common/IntlMessages';
import GridContainer from '../layout/GridContainer';
import PageContainer from '../layout/PageContainer';
import VerticalDefault from '../layout/VerticalDefault';

const breadcrumbs = [
  { label: <IntlMessages id="sidebar.main" />, link: '/' },
  { label: <IntlMessages id="pages.samplePage" />, isActive: true },
];

function SamplePage() {
  return (
    <VerticalDefault>
      <PageContainer breadcrumbs={breadcrumbs} heading={<IntlMessages id="pages.samplePage" />}>
        <GridContainer>
          <Grid xs={12} item>
            <div style={{ marginBottom: 10 }}>
              <IntlMessages id="pages.samplePage.description" />
            </div>
            <Divider />
          </Grid>
        </GridContainer>
      </PageContainer>
    </VerticalDefault>
  );
}

export default SamplePage;
