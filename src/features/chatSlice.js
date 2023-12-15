import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
const CONVERSATION_END_POINT = `${process.env.REACT_APP_API_ENDPOINT}/conversation`;
const MESSAGE_END_POINT = `${process.env.REACT_APP_API_ENDPOINT}/message`;
const initialState = {
  status: '',
  error: '',
  conversations: [],
  activeConversation: {},
  notifications: [],
  messages: [],
};

export const getConversations = createAsyncThunk(
  'conversation/all',
  async (token, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        CONVERSATION_END_POINT,

        {
          headers: { Authorization: `${token}` },
        }
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.error.message);
    }
  }
);

export const open_create_conversation = createAsyncThunk(
  'conversation/open_create',
  async (values, { rejectWithValue }) => {
    const { token, reciver_id } = values;
    try {
      const { data } = await axios.post(
        CONVERSATION_END_POINT,
        { reciver_id },
        {
          headers: { Authorization: `${token}` },
        }
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.error.message);
    }
  }
);

export const getConversationMessages = createAsyncThunk(
  'conversation/messages',
  async (values, { rejectWithValue }) => {
    const { token, convo_id } = values;
    try {
      const { data } = await axios.get(`${MESSAGE_END_POINT}/${convo_id}`, {
        headers: { Authorization: `${token}` },
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.error.message);
    }
  }
);
export const sendMessage = createAsyncThunk(
  'message/send',
  async (values, { rejectWithValue }) => {
    const { token, convo_Id, message, files } = values;
    try {
      const { data } = await axios.post(
        `${MESSAGE_END_POINT}`,
        {
          message,
          convo_Id,
          files,
        },
        {
          headers: { Authorization: `${token}` },
        }
      );
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
      state.activeConversation = action.payload;
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
      })
      .addCase(open_create_conversation.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(open_create_conversation.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.activeConversation = action.payload;
      })
      .addCase(open_create_conversation.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(getConversationMessages.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(getConversationMessages.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.messages = action.payload;
      })
      .addCase(getConversationMessages.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(sendMessage.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.messages = [...state.messages, action.payload];
        let conversation = {
          ...action.payload.conversation,
          latestMessage: action.payload,
        };
        let newConvos = [...state.conversations].filter(
          (c) => c._id !== conversation._id
        );
        newConvos.unshift(conversation);
        state.conversations = newConvos;
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { setActiveConversation } = chatSlice.actions;

export default chatSlice.reducer;
