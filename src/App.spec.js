import { cleanup, screen, render } from '@testing-library/react';
import React from 'react';

import App from './App';

import '@testing-library/jest-dom/extend-expect';

beforeEach(cleanup);

afterEach(() => {
  jest.clearAllMocks();
});

afterAll(() => {
  jest.restoreAllMocks();
});

jest.mock('./components/routes/Router', () => ({
  __esModule: true,
  default: () => <div>Content</div>,
}));

describe('<App />', () => {
  beforeEach(() => {
    jest.spyOn(console, 'warn').mockImplementation(() => {});
    render(<App />);
  });

  it('renders App correctly', async () => {
    const result = await screen.findByText('Content');
    expect(result).toBeInTheDocument();
  });
});
