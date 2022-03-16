import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    name:'',
    email:'',
    photo:''
 }
export const UserSlice = createSlice({
    name:'user',
    initialState,
    reducers : {
        setLoginUserDetails:(state,action) => {
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.photo = action.payload.photo;   
        },
        setSignOutState:state => {
            state.name = null;
            state.email = null;
            state.photo = null;
        }
    }
});
export const {setLoginUserDetails, setSignOutState} = UserSlice.actions;
export default UserSlice.reducer;