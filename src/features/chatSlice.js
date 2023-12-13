import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
const CONVERSATION_END_POINT = `${process.env.REACT_APP_API_ENDPOINT}/conversation`;
const initialState = {
  status: '',
  error: '',
  conversations: [],
  activeCovnersation: {},
  notifications: [],
};

export const getConversations = createAsyncThunk(
  'conversation/all',
  async (token, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(CONVERSATION_END_POINT, {
        headers: { Authorization: `${token}` },
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.error.message);
    }
  }
);

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setActiveConversation: (state, action) => {
      state.activeCovnersation = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getConversations.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(getConversations.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.conversations = action.payload;
      })
      .addCase(getConversations.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { setActiveConversation } = chatSlice.actions;

export default chatSlice.reducer;
