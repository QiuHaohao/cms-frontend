import {
  AUTH_ACTION_LOGIN,
} from '../../../../src/features/auth/redux/constants';

import {
  actionLogin,
  reducer,
} from '../../../../src/features/auth/redux/actionLogin';

describe('auth/redux/actionLogin', () => {
  it('returns correct action by actionLogin', () => {
    expect(actionLogin()).toHaveProperty('type', AUTH_ACTION_LOGIN);
  });

  it('handles action type AUTH_ACTION_LOGIN correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: AUTH_ACTION_LOGIN }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
