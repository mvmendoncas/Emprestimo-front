import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    showLogin: false,
  },
  reducers: {
    showLogin(state) {
      state.showLogin = true;
    },
    hideLogin(state) {
      state.showLogin = false;
    },
  },
});

export const { showLogin, hideLogin } = uiSlice.actions;
export default uiSlice.reducer;
