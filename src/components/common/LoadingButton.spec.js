import { cleanup, render, screen } from '@testing-library/react';
import React from 'react';

import LoadingButton from './LoadingButton';

import '@testing-library/jest-dom/extend-expect';

beforeEach(cleanup);

afterEach(() => {
  jest.clearAllMocks();
});

afterAll(() => {
  jest.restoreAllMocks();
});

describe('<LoadingButton />', () => {
  it('renders children when not loading', async () => {
    render(
      <LoadingButton loading={false}>
        <div data-testid="loadingButton_children" />
      </LoadingButton>
    );

    const result = await screen.findByTestId('loadingButton_children');
    expect(result).toBeInTheDocument();
  });

  it('renders CircularProgress when loading', async () => {
    render(
      <LoadingButton loading>
        <div />
      </LoadingButton>
    );

    const result = await screen.findByTestId('loadingButton_circularProgress');
    expect(result).toBeInTheDocument();
  });
});
