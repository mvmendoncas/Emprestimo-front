// src/redux/userLogin/userLoginSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    username: '',
    roles: [],
    userId: null, 
    isAuthenticated: false, // Inicialmente falso
};

const userLoginSlice = createSlice({
    name: 'userLogin',
    initialState,
    reducers: {
        setUserLogin: (state, action) => {
            state.username = action.payload.username;
            state.roles = action.payload.roles;
            state.userId = action.payload.userId;
            state.isAuthenticated = true;
        },
        clearUserLogin: (state) => {
            state.username = '';
            state.roles = [];
            state.userId = null;
            state.isAuthenticated = false;
        },
    },
});

export const { setUserLogin, clearUserLogin } = userLoginSlice.actions;
export default userLoginSlice.reducer;
