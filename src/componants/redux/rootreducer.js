import { combineReducers } from 'redux';
import gemelReducer from './gemelReducer'


export default combineReducers({
  gemel: gemelReducer,
});