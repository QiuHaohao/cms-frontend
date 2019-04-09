import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  MAP_ACTION_DELETE_INCIDENT_BEGIN,
  MAP_ACTION_DELETE_INCIDENT_SUCCESS,
  MAP_ACTION_DELETE_INCIDENT_FAILURE,
  MAP_ACTION_DELETE_INCIDENT_DISMISS_ERROR,
} from '../../../../src/features/map/redux/constants';

import {
  actionDeleteIncident,
  dismissActionDeleteIncidentError,
  reducer,
} from '../../../../src/features/map/redux/actionDeleteIncident';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('map/redux/actionDeleteIncident', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when actionDeleteIncident succeeds', () => {
    const store = mockStore({});

    return store.dispatch(actionDeleteIncident())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', MAP_ACTION_DELETE_INCIDENT_BEGIN);
        expect(actions[1]).toHaveProperty('type', MAP_ACTION_DELETE_INCIDENT_SUCCESS);
      });
  });

  it('dispatches failure action when actionDeleteIncident fails', () => {
    const store = mockStore({});

    return store.dispatch(actionDeleteIncident({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', MAP_ACTION_DELETE_INCIDENT_BEGIN);
        expect(actions[1]).toHaveProperty('type', MAP_ACTION_DELETE_INCIDENT_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissActionDeleteIncidentError', () => {
    const expectedAction = {
      type: MAP_ACTION_DELETE_INCIDENT_DISMISS_ERROR,
    };
    expect(dismissActionDeleteIncidentError()).toEqual(expectedAction);
  });

  it('handles action type MAP_ACTION_DELETE_INCIDENT_BEGIN correctly', () => {
    const prevState = { actionDeleteIncidentPending: false };
    const state = reducer(
      prevState,
      { type: MAP_ACTION_DELETE_INCIDENT_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.actionDeleteIncidentPending).toBe(true);
  });

  it('handles action type MAP_ACTION_DELETE_INCIDENT_SUCCESS correctly', () => {
    const prevState = { actionDeleteIncidentPending: true };
    const state = reducer(
      prevState,
      { type: MAP_ACTION_DELETE_INCIDENT_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.actionDeleteIncidentPending).toBe(false);
  });

  it('handles action type MAP_ACTION_DELETE_INCIDENT_FAILURE correctly', () => {
    const prevState = { actionDeleteIncidentPending: true };
    const state = reducer(
      prevState,
      { type: MAP_ACTION_DELETE_INCIDENT_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.actionDeleteIncidentPending).toBe(false);
    expect(state.actionDeleteIncidentError).toEqual(expect.anything());
  });

  it('handles action type MAP_ACTION_DELETE_INCIDENT_DISMISS_ERROR correctly', () => {
    const prevState = { actionDeleteIncidentError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: MAP_ACTION_DELETE_INCIDENT_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.actionDeleteIncidentError).toBe(null);
  });
});

