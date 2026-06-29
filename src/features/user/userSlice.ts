import { createSlice } from '@reduxjs/toolkit';
import { userState } from '@/types/global';

const initialState: userState = {
    name:null,
    isVerified: false,
    isLoggedIn: false
}

export const userSlice = createSlice({
    name: 'userData',
    initialState,
    reducers: {
        setUser(state, action) {
            state.name = action.payload.name;
            state.isVerified = action.payload.isVerified;
            state.isLoggedIn = action.payload.isLoggedIn;
        },
        updateUser(state,action){
            state.name = null,
            state.isVerified = false,
            state.isLoggedIn = false
        }
    }

})
export const { setUser,updateUser } = userSlice.actions
export default userSlice.reducer