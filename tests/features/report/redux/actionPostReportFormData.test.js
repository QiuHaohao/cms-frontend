import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  REPORT_ACTION_POST_REPORT_FORM_DATA_BEGIN,
  REPORT_ACTION_POST_REPORT_FORM_DATA_SUCCESS,
  REPORT_ACTION_POST_REPORT_FORM_DATA_FAILURE,
  REPORT_ACTION_POST_REPORT_FORM_DATA_DISMISS_ERROR,
} from '../../../../src/features/report/redux/constants';

import {
  actionPostReportFormData,
  dismissActionPostReportFormDataError,
  reducer,
} from '../../../../src/features/report/redux/actionPostReportFormData';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('report/redux/actionPostReportFormData', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when actionPostReportFormData succeeds', () => {
    const store = mockStore({});

    return store.dispatch(actionPostReportFormData())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', REPORT_ACTION_POST_REPORT_FORM_DATA_BEGIN);
        expect(actions[1]).toHaveProperty('type', REPORT_ACTION_POST_REPORT_FORM_DATA_SUCCESS);
      });
  });

  it('dispatches failure action when actionPostReportFormData fails', () => {
    const store = mockStore({});

    return store.dispatch(actionPostReportFormData({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', REPORT_ACTION_POST_REPORT_FORM_DATA_BEGIN);
        expect(actions[1]).toHaveProperty('type', REPORT_ACTION_POST_REPORT_FORM_DATA_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissActionPostReportFormDataError', () => {
    const expectedAction = {
      type: REPORT_ACTION_POST_REPORT_FORM_DATA_DISMISS_ERROR,
    };
    expect(dismissActionPostReportFormDataError()).toEqual(expectedAction);
  });

  it('handles action type REPORT_ACTION_POST_REPORT_FORM_DATA_BEGIN correctly', () => {
    const prevState = { actionPostReportFormDataPending: false };
    const state = reducer(
      prevState,
      { type: REPORT_ACTION_POST_REPORT_FORM_DATA_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.actionPostReportFormDataPending).toBe(true);
  });

  it('handles action type REPORT_ACTION_POST_REPORT_FORM_DATA_SUCCESS correctly', () => {
    const prevState = { actionPostReportFormDataPending: true };
    const state = reducer(
      prevState,
      { type: REPORT_ACTION_POST_REPORT_FORM_DATA_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.actionPostReportFormDataPending).toBe(false);
  });

  it('handles action type REPORT_ACTION_POST_REPORT_FORM_DATA_FAILURE correctly', () => {
    const prevState = { actionPostReportFormDataPending: true };
    const state = reducer(
      prevState,
      { type: REPORT_ACTION_POST_REPORT_FORM_DATA_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.actionPostReportFormDataPending).toBe(false);
    expect(state.actionPostReportFormDataError).toEqual(expect.anything());
  });

  it('handles action type REPORT_ACTION_POST_REPORT_FORM_DATA_DISMISS_ERROR correctly', () => {
    const prevState = { actionPostReportFormDataError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: REPORT_ACTION_POST_REPORT_FORM_DATA_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.actionPostReportFormDataError).toBe(null);
  });
});

