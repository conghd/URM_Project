import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authResetPasswordService from './authResetPasswordService';

const initialState = {
   isError: false,
   isSuccess: false,
   isLoading: false,
   message: "",
};

// Activate account
export const resetPassword = createAsyncThunk('auth/reset_password', async (userData, thunkAPI) => {
  try {
    console.log("AutheResetPassword::resetPassword- " + JSON.stringify(userData) );
    return await authResetPasswordService.resetPassword(userData)
  } catch (error) {
    const message = (error.response && error.response.data) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const authResetPasswordSlice = createSlice({
  name: 'auth/reset_password',
  initialState: initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false
      state.isError = false
      state.isSuccess = false
      state.message = ''
    },
  },
  extraReducers: (builder) => {
    builder
      // Activate
      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.message = action.payload
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        console.log(action.payload)
        state.message = action.payload
      })
  },
})

export const { reset } = authResetPasswordSlice.actions
export default authResetPasswordSlice.reducer