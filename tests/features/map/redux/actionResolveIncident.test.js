import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  MAP_ACTION_RESOLVE_INCIDENT_BEGIN,
  MAP_ACTION_RESOLVE_INCIDENT_SUCCESS,
  MAP_ACTION_RESOLVE_INCIDENT_FAILURE,
  MAP_ACTION_RESOLVE_INCIDENT_DISMISS_ERROR,
} from '../../../../src/features/map/redux/constants';

import {
  actionResolveIncident,
  dismissActionResolveIncidentError,
  reducer,
} from '../../../../src/features/map/redux/actionResolveIncident';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('map/redux/actionResolveIncident', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when actionResolveIncident succeeds', () => {
    const store = mockStore({});

    return store.dispatch(actionResolveIncident())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', MAP_ACTION_RESOLVE_INCIDENT_BEGIN);
        expect(actions[1]).toHaveProperty('type', MAP_ACTION_RESOLVE_INCIDENT_SUCCESS);
      });
  });

  it('dispatches failure action when actionResolveIncident fails', () => {
    const store = mockStore({});

    return store.dispatch(actionResolveIncident({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', MAP_ACTION_RESOLVE_INCIDENT_BEGIN);
        expect(actions[1]).toHaveProperty('type', MAP_ACTION_RESOLVE_INCIDENT_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissActionResolveIncidentError', () => {
    const expectedAction = {
      type: MAP_ACTION_RESOLVE_INCIDENT_DISMISS_ERROR,
    };
    expect(dismissActionResolveIncidentError()).toEqual(expectedAction);
  });

  it('handles action type MAP_ACTION_RESOLVE_INCIDENT_BEGIN correctly', () => {
    const prevState = { actionResolveIncidentPending: false };
    const state = reducer(
      prevState,
      { type: MAP_ACTION_RESOLVE_INCIDENT_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.actionResolveIncidentPending).toBe(true);
  });

  it('handles action type MAP_ACTION_RESOLVE_INCIDENT_SUCCESS correctly', () => {
    const prevState = { actionResolveIncidentPending: true };
    const state = reducer(
      prevState,
      { type: MAP_ACTION_RESOLVE_INCIDENT_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.actionResolveIncidentPending).toBe(false);
  });

  it('handles action type MAP_ACTION_RESOLVE_INCIDENT_FAILURE correctly', () => {
    const prevState = { actionResolveIncidentPending: true };
    const state = reducer(
      prevState,
      { type: MAP_ACTION_RESOLVE_INCIDENT_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.actionResolveIncidentPending).toBe(false);
    expect(state.actionResolveIncidentError).toEqual(expect.anything());
  });

  it('handles action type MAP_ACTION_RESOLVE_INCIDENT_DISMISS_ERROR correctly', () => {
    const prevState = { actionResolveIncidentError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: MAP_ACTION_RESOLVE_INCIDENT_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.actionResolveIncidentError).toBe(null);
  });
});

