import { combineReducers } from 'redux';
import user from './user';
import currencies from './currencies';

export default combineReducers({
  user,
  currencies,
});
