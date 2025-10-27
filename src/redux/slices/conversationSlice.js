// store/slices/conversationSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchConversations } from '../../services/apis/conversationApi';

export const fetchConversationsAsync = createAsyncThunk(
  'conversations/fetchConversations',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchConversations();
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const conversationSlice = createSlice({
  name: 'conversations',
  initialState: {
    conversations: [],
    count: 0,
    totalPages: 1,
    currentPage: 1,
    loading: false,
    error: null,
  },
  reducers: {
    resetConversationState: (state) => {
      state.conversations = [];
      state.count = 0;
      state.totalPages = 1;
      state.currentPage = 1;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchConversationsAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchConversationsAsync.fulfilled, (state, action) => {
        state.loading = false;
        
        // Handle both response formats: array or wrapped object
        if (Array.isArray(action.payload)) {
          state.conversations = action.payload;
          state.count = action.payload.length;
          state.totalPages = 1;
          state.currentPage = 1;
        } else if (action.payload.data) {
          state.conversations = action.payload.data.conversations || [];
          state.count = action.payload.data.totalCount || 0;
          state.totalPages = action.payload.data.totalPages || 1;
          state.currentPage = action.payload.data.currentPage || 1;
        } else {
          state.conversations = [];
          state.count = 0;
        }
      })
      .addCase(fetchConversationsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.conversations = [];
      });
  },
});

export const { resetConversationState } = conversationSlice.actions;
export default conversationSlice.reducer;