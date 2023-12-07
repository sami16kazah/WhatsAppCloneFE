import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  stauts: '',
  error: '',
  user: {
    id: '',
    name: '',
    email: '',
    picture: '',
    status: '',
    token: '',
  },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      state.stauts = '';
      state.error = '';
      state.user = {
        id: '',
        name: '',
        email: '',
        picture: '',
        status: '',
        token: '',
      };
    },
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
