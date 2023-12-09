import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
const AUTH_END_POINT = `${process.env.REACT_APP_API_ENDPOINT}/auth`;
const initialState = {
  status: 'initial',
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

export const registerUser = createAsyncThunk(
  'auth/register',
  async (values, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${AUTH_END_POINT}/register`, {
        ...values,
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.error.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/login',
  async (values, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${AUTH_END_POINT}/login`, {
        ...values,
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.error.message);
    }
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      state.status = '';
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
    changeStatus: (state, action) => {
      state.status = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        state.status = 'success';
        state.user = payload.user;
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.error = payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.status = 'success';
        state.user = payload.user;
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.error = payload;
      });
  },
});

export const { logout, changeStatus } = userSlice.actions;
export default userSlice.reducer;
