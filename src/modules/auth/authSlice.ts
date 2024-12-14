import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import AuthService from './service/AuthService.ts';
import { handleApiError } from '@/util/ErrorHandlerUtils';

// Login interface
export interface LoginCredentials {
  email: string;
  password: string;
}

// Authentication state interface
interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

// Initial state
const initialAuthState: AuthState = {
  isAuthenticated: !!AuthService.getToken(),
  isLoading: false,
  error: null,
};

// Login thunk
export const login = createAsyncThunk(
  'auth/login',
  async (credentials: LoginCredentials, { rejectWithValue }) => {
    try {
      const response = await AuthService.login(credentials);
      return response.data;
    } catch (error) {
      const errorMessage = handleApiError(error);
      return rejectWithValue(errorMessage);
    }
  }
);

// Authentication slice
const authSlice = createSlice({
  name: 'authentication',
  initialState: initialAuthState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Login cases
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state) => {
        state.isLoading = false;
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.error = action.payload as string;
      });
  },
});

export default authSlice.reducer;
