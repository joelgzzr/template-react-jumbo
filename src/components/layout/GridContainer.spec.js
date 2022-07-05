import { cleanup, render, screen } from '@testing-library/react';
import React from 'react';

import GridContainer from './GridContainer';

import '@testing-library/jest-dom/extend-expect';

beforeEach(cleanup);

afterEach(() => {
  jest.clearAllMocks();
});

afterAll(() => {
  jest.restoreAllMocks();
});

jest.mock('react-router-dom', () => ({
  useLocation: jest.fn(),
  NavLink: () => <div />,
}));

const testBreadcrumbs = [
  { label: 'testNoLink' },
  { label: 'test', link: '/test' },
  { label: 'testActive', isActive: true },
];

describe('<GridContainer />', () => {
  beforeEach(() => {
    render(
      <GridContainer breadcrumbs={testBreadcrumbs} heading="Header">
        <div>Child</div>
      </GridContainer>
    );
  });

  it('renders child correctly', async () => {
    const result = await screen.findByText('Child');
    expect(result).toBeInTheDocument();
  });
});
