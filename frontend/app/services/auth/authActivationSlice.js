import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authActivationService from './authActivationService'

//const user = JSON.parse(localStorage.getItem('user'))
const initialState = {
   isError: false,
   isSuccess: false,
   isLoading: false,
   message: "",
};

// Activate account
export const activate = createAsyncThunk('auth/activate', async (userData, thunkAPI) => {
  try {
    console.log("AuthActivationSlice::activate- " + JSON.stringify(userData) );
    return await authActivationService.activate(userData)
  } catch (error) {
    const message =
      //(error.response && error.response.data && error.response.data.message) ||
      (error.response && error.response.data) ||
      error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const authActivationSlice = createSlice({
  name: 'auth/activate',
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
      .addCase(activate.pending, (state) => {
        state.isLoading = true
      })
      .addCase(activate.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.message = action.payload
      })
      .addCase(activate.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        console.log(action.payload)
        state.message = action.payload
      })
  },
})

export const { reset } = authActivationSlice.actions
export default authActivationSlice.reducer