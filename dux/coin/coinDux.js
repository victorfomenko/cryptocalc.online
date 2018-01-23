import { createAction, createReducer, disbatch } from 'redux-act';
import { createSelector } from 'reselect';
import api from './coinApi';

// Selectors
const duxSelector = state => state.coin;

export const loadingSelector = createSelector(
  duxSelector,
  ({ loading }) => loading,
);
export const coinSelector = createSelector(duxSelector, ({ data }) => data);
export const errorSelector = createSelector(duxSelector, ({ error }) => error);

// Sync actions
const loading = createAction('loading');
const success = createAction('success');
const error = createAction('error');


// Async actions
export const loadCoin = (req, coinId) => async (dispatch) => {
    dispatch(loading());
    const data = await api.getCoin(coinId);
    dispatch(success({ data }));
}

// Default state
const defaultState = {
    data: null,
    loading: false,
    error: false,
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
