// store/slices/initiateConversationSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { initiateConversation } from '../../services/apis/initiateConversationApi';

export const initiateConversationAsync = createAsyncThunk(
  'initiateConversation/initiate',
  async ({ recipientId, propertyId }, { rejectWithValue }) => {
    try {
      const response = await initiateConversation({ recipientId, propertyId });
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initiateConversationSlice = createSlice({
  name: 'initiateConversation',
  initialState: {
    conversation: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearInitiateConversationState: (state) => {
      state.conversation = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(initiateConversationAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(initiateConversationAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.conversation = action.payload.conversation;
      })
      .addCase(initiateConversationAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearInitiateConversationState } = initiateConversationSlice.actions;
export default initiateConversationSlice.reducer;