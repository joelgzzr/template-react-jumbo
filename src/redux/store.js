import { configureStore } from '@reduxjs/toolkit';

import authReducer from './features/auth';

const setupStore = (preloadedState = {}) =>
  configureStore({
    reducer: {
      auth: authReducer,
    },
    preloadedState,
  });

export default setupStore;
