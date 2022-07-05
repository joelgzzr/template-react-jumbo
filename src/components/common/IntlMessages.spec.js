import { cleanup, screen } from '@testing-library/react';
import React from 'react';

import renderWithProviders from '../../utils/renderWithProviders';

import IntlMessages from './IntlMessages';

import '@testing-library/jest-dom/extend-expect';

beforeEach(cleanup);

afterEach(() => {
  jest.clearAllMocks();
});

afterAll(() => {
  jest.restoreAllMocks();
});

jest.mock('react-intl', () => ({
  ...jest.requireActual('react-intl'),
  FormattedMessage: (props) => <div {...props} />,
  injectIntl: (Node) =>
    function _(props) {
      return <Node {...props} intl={{ formatMessage: ({ defaultMessage }) => defaultMessage }} />;
    },
}));

describe('<IntlMessages />', () => {
  it('renders FormattedMessage', async () => {
    renderWithProviders(<IntlMessages />);

    const result = await screen.findByTestId('injectMessage_formattedMessage');
    expect(result).toBeInTheDocument();
  });
});
