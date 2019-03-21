import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  MAP_ACTION_FETCH_DATA_BEGIN,
  MAP_ACTION_FETCH_DATA_SUCCESS,
  MAP_ACTION_FETCH_DATA_FAILURE,
  MAP_ACTION_FETCH_DATA_DISMISS_ERROR,
} from '../../../../src/features/map/redux/constants';

import {
  actionFetchData,
  dismissActionFetchDataError,
  reducer,
} from '../../../../src/features/map/redux/actionFetchData';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('map/redux/actionFetchData', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when actionFetchData succeeds', () => {
    const store = mockStore({});

    return store.dispatch(actionFetchData())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', MAP_ACTION_FETCH_DATA_BEGIN);
        expect(actions[1]).toHaveProperty('type', MAP_ACTION_FETCH_DATA_SUCCESS);
      });
  });

  it('dispatches failure action when actionFetchData fails', () => {
    const store = mockStore({});

    return store.dispatch(actionFetchData({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', MAP_ACTION_FETCH_DATA_BEGIN);
        expect(actions[1]).toHaveProperty('type', MAP_ACTION_FETCH_DATA_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissActionFetchDataError', () => {
    const expectedAction = {
      type: MAP_ACTION_FETCH_DATA_DISMISS_ERROR,
    };
    expect(dismissActionFetchDataError()).toEqual(expectedAction);
  });

  it('handles action type MAP_ACTION_FETCH_DATA_BEGIN correctly', () => {
    const prevState = { actionFetchDataPending: false };
    const state = reducer(
      prevState,
      { type: MAP_ACTION_FETCH_DATA_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.actionFetchDataPending).toBe(true);
  });

  it('handles action type MAP_ACTION_FETCH_DATA_SUCCESS correctly', () => {
    const prevState = { actionFetchDataPending: true };
    const state = reducer(
      prevState,
      { type: MAP_ACTION_FETCH_DATA_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.actionFetchDataPending).toBe(false);
  });

  it('handles action type MAP_ACTION_FETCH_DATA_FAILURE correctly', () => {
    const prevState = { actionFetchDataPending: true };
    const state = reducer(
      prevState,
      { type: MAP_ACTION_FETCH_DATA_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.actionFetchDataPending).toBe(false);
    expect(state.actionFetchDataError).toEqual(expect.anything());
  });

  it('handles action type MAP_ACTION_FETCH_DATA_DISMISS_ERROR correctly', () => {
    const prevState = { actionFetchDataError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: MAP_ACTION_FETCH_DATA_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.actionFetchDataError).toBe(null);
  });
});

