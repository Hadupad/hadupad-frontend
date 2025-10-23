import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { sendMessage } from '../../services/apis/sendMessageApi';

export const sendMessageAsync = createAsyncThunk(
  'sendMessage/send',
  async ({ conversationId, message, type }, { rejectWithValue }) => {
    try {
      const response = await sendMessage({ conversationId, message, type });
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const sendMessageSlice = createSlice({
  name: 'sendMessage',
  initialState: {
    message: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearSendMessageState: (state) => {
      state.message = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendMessageAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendMessageAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(sendMessageAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearSendMessageState } = sendMessageSlice.actions;
export default sendMessageSlice.reducer;