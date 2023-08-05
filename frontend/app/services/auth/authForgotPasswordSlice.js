import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authForgotPasswordService from './authForgotPasswordService'

//const user = JSON.parse(localStorage.getItem('user'))
const initialState = {
   isError: false,
   isSuccess: false,
   isLoading: false,
   message: "",
};

// Forgot Password
export const forgotPassword = createAsyncThunk('auth/forgot_password', async (userData, thunkAPI) => {
  try {
    console.log("AuthSlice::forgotPassword- " + JSON.stringify(userData) );
    return await authForgotPasswordService.forgotPassword(userData)
  } catch (error) {
    const message =
      //(error.response && error.response.data && error.response.data.message) ||
      (error.response && error.response.data) ||
      error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const authForgotPasswordSlice = createSlice({
  name: 'auth/forgot_password',
  initialState: initialState,
  reducers: {
    reset: (state) => {
      state.isError = false
      state.isSuccess = false
      state.isLoading = false
      state.message = ''
    },
  },
  extraReducers: (builder) => {
    builder
      // Forgot password 
      .addCase(forgotPassword.pending, (state) => {
        state.isLoading = true
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.message = action.payload
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = authForgotPasswordSlice.actions
export default authForgotPasswordSlice.reducer