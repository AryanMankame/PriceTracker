import { createSlice } from '@reduxjs/toolkit';
const initialState = [];
export const TracklistSlice = createSlice({
    name:'Tracklist',
    initialState,
    reducers : {
        setTracklistDetails:(state,action) => {
            state = [...state,action];   
        },
    }
});
export const {setTracklistDetails} = TracklistSlice.actions;
export default TracklistSlice.reducer;