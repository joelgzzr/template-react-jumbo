import { createSlice, createSelector, createAsyncThunk } from '@reduxjs/toolkit';

import instance from '../axios';

const defaultToken = localStorage.getItem('token') || '';

const initialState = {
  loadingUser: false,
  loadingToken: false,
  user: {},
  signInErrors: {},
  signUpErrors: {},
  token: defaultToken,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoadingUser: (state, { payload }) => ({ ...state, loadingUser: payload }),
    setLoadingToken: (state, { payload }) => ({ ...state, loadingToken: payload }),
    setUser: (state, { payload }) => ({ ...state, user: payload }),
    setSignInErrors: (state, { payload }) => ({ ...state, signInErrors: payload }),
    setSignUpErrors: (state, { payload }) => ({ ...state, signUpErrors: payload }),
    setToken: (state, { payload }) => ({ ...state, token: payload }),
  },
});

export const { setLoadingUser, setLoadingToken, setUser, setSignInErrors, setSignUpErrors, setToken } =
  authSlice.actions;

export const signUp = createAsyncThunk('auth/signUp', async ({ name, email, password }, { dispatch }) => {
  try {
    dispatch(setLoadingToken(true));
    const { data } = await instance.post('/auth/signup', { name, email, password });
    dispatch(setToken(data.accessToken));
    localStorage.setItem('token', data.accessToken);
    dispatch(setLoadingToken(false));
  } catch ({ response }) {
    dispatch(setSignUpErrors(response.data));
    dispatch(setLoadingToken(false));
  }
});

export const signIn = createAsyncThunk('auth/signIn', async ({ email, password }, { dispatch }) => {
  try {
    dispatch(setLoadingToken(true));
    const { data } = await instance.post('/auth/signIn', { email, password });
    dispatch(setToken(data.accessToken));
    localStorage.setItem('token', data.accessToken);
    dispatch(setLoadingToken(false));
  } catch ({ response }) {
    dispatch(setSignInErrors(response.data));
    dispatch(setLoadingToken(false));
  }
});

export const signOut = createAsyncThunk('auth/signOut', (args, { dispatch }) => {
  dispatch(setToken(''));
  localStorage.removeItem('token');
});

export const getUser = createAsyncThunk('auth/getUser', async (args, { dispatch, getState }) => {
  try {
    dispatch(setLoadingUser(true));
    const { token } = getState().auth;
    const { data } = await instance.get('/auth/me', { headers: { Authorization: `Bearer ${token}` } });
    dispatch(setUser(data));
    dispatch(setLoadingUser(false));
  } catch {
    dispatch(setUser({}));
    dispatch(setToken(''));
    localStorage.removeItem('token');
    dispatch(setLoadingUser(false));
  }
});

const selfSelect = (state) => state.auth;

export const selectLoadingUser = createSelector(selfSelect, ({ loadingUser }) => loadingUser);
export const selectLoadingToken = createSelector(selfSelect, ({ loadingToken }) => loadingToken);
export const selectUser = createSelector(selfSelect, ({ user }) => user);
export const selectSignInErrors = createSelector(selfSelect, ({ signInErrors }) => signInErrors);
export const selectSignUpErrors = createSelector(selfSelect, ({ signUpErrors }) => signUpErrors);
export const selectToken = createSelector(selfSelect, ({ token }) => token);

export default authSlice.reducer;
