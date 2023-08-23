import { combineReducers } from 'redux';
import userSlice from './userReducer';
import layoutSlice from './layoutReducer';
import ProfileSlice from './profileReducer';

const rootReducer = combineReducers({
  user: userSlice.reducer,
  layout: layoutSlice.reducer,
  profile: ProfileSlice.reducer
});

export default rootReducer;
