import { createAction, createReducer } from 'redux-act';
import { createSelector } from 'reselect';

// Selectors
const duxSelector = state => state.user;

export const isAuthorizedSelector = createSelector(
  duxSelector,
  ({ isAuthorized }) => isAuthorized,
);
export const idSelector = createSelector(duxSelector, ({ id }) => id);
export const nameSelector = createSelector(duxSelector, ({ name }) => name);
export const rolesSelector = createSelector(duxSelector, ({ roles }) => roles);
export const loadingSelector = createSelector(
  duxSelector,
  ({ loading }) => loading,
);
export const errorSelector = createSelector(duxSelector, ({ error }) => error);

// Sync actions
const loading = createAction('loading');
const success = createAction('success');
const error = createAction('error');

// Default state
const defaultState = {
  isAuthorized: false,
  loading: false,
  error: null,
};

// Reducer
export default createReducer(
  {
    [loading]: state => ({
      ...state,
      loading: true,
      error: null,
    }),
    [success]: (state, payload) => ({
      ...state,
      ...payload,
      isAuthorized: true,
      loading: false,
      error: null,
    }),
    [error]: (state, payload) => ({
      ...state,
      error: payload,
      loading: false,
    }),
  },
  defaultState,
);
