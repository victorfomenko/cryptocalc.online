import { createAction, createReducer, disbatch } from 'redux-act';
import { createSelector } from 'reselect';
import api from './coinsApi';

// Selectors
const duxSelector = state => state.coins;

export const loadingSelector = createSelector(
  duxSelector,
  ({ loading }) => loading,
);
export const currenciesSelector = createSelector(duxSelector, ({ data }) => data);
export const errorSelector = createSelector(duxSelector, ({ error }) => error);

// Sync actions
const loading = createAction('loading');
const success = createAction('success');
const error = createAction('error');


// Async actions
export const loadCurrencies = () => async (dispatch) => {
    dispatch(loading());
    const data = await api.getCurrencies({
      where: {
        ticker: {
          in: ['BTC', 'ETH', 'LTC', 'ETC', 'OMG', 'BCH', 'MIOTA', 'XMR', 'ZEC', 'SAN', 'DASH', 'PASC']
        }
      }, 
      candles: 'q1',
      offset: 0
    })
    dispatch(success({ data }));
}

// Default state
const defaultState = {
    data: [],
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
