import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    name:'',
    email:''
 }
export const UserSlice = createSlice({
    name:'user',
    initialState,
    reducers : {
        setLoginUserDetails:(state,action) => {
            state.name = action.payload.name;
            state.email = action.payload.email;   
        },
        setSignOutState:state => {
            state.name = null;
            state.email = null;
        }
    }
});
export const {setLoginUserDetails, setSignOutState} = UserSlice.actions;
export default UserSlice.reducer;