import {
  AUTH_ACTION_LOGOUT,
} from '../../../../src/features/auth/redux/constants';

import {
  actionLogout,
  reducer,
} from '../../../../src/features/auth/redux/actionLogout';

describe('auth/redux/actionLogout', () => {
  it('returns correct action by actionLogout', () => {
    expect(actionLogout()).toHaveProperty('type', AUTH_ACTION_LOGOUT);
  });

  it('handles action type AUTH_ACTION_LOGOUT correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: AUTH_ACTION_LOGOUT }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
