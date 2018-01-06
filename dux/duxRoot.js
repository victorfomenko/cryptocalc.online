import { combineReducers } from 'redux';
import user from './user';
import coins from './coins';
import coin from './coin';

export default combineReducers({
  user,
  coins,
  coin,
});
