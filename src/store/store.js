import { configureStore } from '@reduxjs/toolkit'
import UserReducer from './UserSlice.js';
import TracklistReducer from './TracklistSlice.js';
export default configureStore({
  reducer: {
    user:UserReducer,
    Tracklist:TracklistReducer
  },
})