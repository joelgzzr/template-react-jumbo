import { cleanup, screen, render } from '@testing-library/react';
import React from 'react';

import FooterLogo from './FooterLogo';

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
  NavLink: (props) => <div {...props} />,
}));

describe('<FooterLogo />', () => {
  beforeEach(() => {
    render(<FooterLogo />);
  });

  it('renders Logo correctly', async () => {
    const result = await screen.findByTestId('footerLogo_logo');
    expect(result).toBeInTheDocument();
  });
});
