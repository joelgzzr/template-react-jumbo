import instance from '../axios';
import setupStore from '../store';

import {
  getUser,
  selectLoadingToken,
  selectLoadingUser,
  selectSignInErrors,
  selectSignUpErrors,
  selectToken,
  selectUser,
  signIn,
  signOut,
  signUp,
} from './auth';

afterEach(() => {
  jest.clearAllMocks();
});

afterAll(() => {
  jest.restoreAllMocks();
});

describe('auth', () => {
  let store;

  beforeEach(() => {
    store = setupStore();
  });

  it('auth state default values', () => {
    const { auth } = store.getState();
    expect(auth).toStrictEqual({
      loadingUser: false,
      loadingToken: false,
      user: {},
      signInErrors: {},
      signUpErrors: {},
      token: '',
    });
  });

  it('signUp sets token', async () => {
    jest.spyOn(instance, 'post').mockResolvedValue({ data: { accessToken: 'testToken' } });
    await store.dispatch(signUp('Test name', 'email@email.com', 'password'));

    const { auth } = store.getState();
    expect(auth.token).toBe('testToken');
  });

  it('signUp sets signUpErrors if it catches', async () => {
    jest.spyOn(instance, 'post').mockRejectedValue({ response: { data: { error: 401 } } });
    await store.dispatch(signUp('Test name', 'email@email.com', 'password'));

    const { auth } = store.getState();
    expect(auth.signUpErrors).toStrictEqual({ error: 401 });
  });

  it('signIn sets token', async () => {
    jest.spyOn(instance, 'post').mockResolvedValue({ data: { accessToken: 'testToken' } });
    await store.dispatch(signIn('email@email.com', 'password'));

    const { auth } = store.getState();
    expect(auth.token).toBe('testToken');
  });

  it('signIn sets signInErrors if it catches', async () => {
    jest.spyOn(instance, 'post').mockRejectedValue({ response: { data: { error: 401 } } });
    await store.dispatch(signIn('email@email.com', 'password'));

    const { auth } = store.getState();
    expect(auth.signInErrors).toStrictEqual({ error: 401 });
  });

  it('signOut unsets token', async () => {
    await store.dispatch(signOut());

    const { auth } = store.getState();
    expect(auth.token).toBe('');
  });

  it('getUser sets user', async () => {
    jest.spyOn(instance, 'get').mockResolvedValue({ data: { name: 'Test name' } });
    await store.dispatch(getUser());

    const { auth } = store.getState();
    expect(auth.user).toStrictEqual({ name: 'Test name' });
  });

  it('getUser unsets token if it catches', async () => {
    jest.spyOn(instance, 'get').mockRejectedValue({});
    await store.dispatch(getUser());

    const { auth } = store.getState();
    expect(auth.token).toBe('');
  });

  it('getUser unsets user if it catches', async () => {
    jest.spyOn(instance, 'get').mockRejectedValue({});
    await store.dispatch(getUser());

    const { auth } = store.getState();
    expect(auth.user).toStrictEqual({});
  });

  it('selectLoadingUser selects loadingUser', async () => {
    const result = selectLoadingUser(store.getState());

    expect(result).toBe(false);
  });

  it('selectLoadingToken selects loadingToken', async () => {
    const result = selectLoadingToken(store.getState());

    expect(result).toBe(false);
  });

  it('selectUser selects user', async () => {
    const result = selectUser(store.getState());

    expect(result).toStrictEqual({});
  });

  it('selectSignInErrors selects signInErrors', async () => {
    const result = selectSignInErrors(store.getState());

    expect(result).toStrictEqual({});
  });

  it('selectSignUpErrors selects signUpErrors', async () => {
    const result = selectSignUpErrors(store.getState());

    expect(result).toStrictEqual({});
  });

  it('selectToken selects token', async () => {
    const result = selectToken(store.getState());

    expect(result).toBe('');
  });
});
