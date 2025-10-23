import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchConversation } from '../../services/apis/fetchConversationApi';

export const fetchPreviousConversationAsync = createAsyncThunk(
  'fetchConversation/fetchPrevious',
  async ({ conversationId }, { rejectWithValue }) => {
    try {
      const response = await fetchConversation({ conversationId });
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const fetchConversationSlice = createSlice({
  name: 'fetchConversation',
  initialState: {
    previousConversation: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearFetchConversationState: (state) => {
      state.previousConversation = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPreviousConversationAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPreviousConversationAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.previousConversation = action.payload;
      })
      .addCase(fetchPreviousConversationAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearFetchConversationState } = fetchConversationSlice.actions;
export default fetchConversationSlice.reducer;