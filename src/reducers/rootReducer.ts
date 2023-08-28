import { combineReducers } from 'redux';
import userSlice from './userReducer';
import layoutSlice from './layoutReducer';
import ProfileSlice from './profileReducer';
import TeamsSlice from './teamsReducer';
import BookSlice from './bookReducer';

const rootReducer = combineReducers({
  user: userSlice.reducer,
  layout: layoutSlice.reducer,
  profile: ProfileSlice.reducer,
  teams: TeamsSlice.reducer,
  book: BookSlice.reducer,
});

export default rootReducer;
