import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import settingsService from './settingsService';

//const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
  meta: {
   isError: false,
   isSuccess: false,
   isLoading: false,
  },
  isFirstTime: false,
  other: true,
  message: '',
};

// settings load
export const load = createAsyncThunk('settings/load', async (data, thunkAPI) => {
    try {
      return await settingsService.load()
    } catch (error) {
      const message = (error.response && error.response.data &&
          error.response.data.message) || error.message || error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// settings load
export const save = createAsyncThunk('settings/save', async (data, thunkAPI) => {
    try {
      return await settingsService.save(data)
    } catch (error) {
      const message = (error.response && error.response.data &&
          error.response.data.message) || error.message || error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)
export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    reset: (state) => {
      state.meta.isLoading = false
      state.meta.isSuccess = false
      state.meta.isError = false
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(load.pending, (state) => {
        state.meta.isLoading = true
      })
      .addCase(load.fulfilled, (state, action) => {
        state.meta.isLoading = false
        state.meta.isSuccess = true
        state.isFirstTime = action.payload.isFirstTime
        //state.message = action.payload
      })
      .addCase(load.rejected, (state, action) => {
        state.meta.isLoading = false
        state.meta.isError = true
        state.message = action.payload
      })
      .addCase(save.pending, (state) => {
        state.meta.isLoading = true
      })
      .addCase(save.fulfilled, (state, action) => {
        state.meta.isLoading = false
        state.meta.isSuccess = true
        //state.isFirstTime = action.payload.isFirstTime
        state.message = action.payload
      })
      .addCase(save.rejected, (state, action) => {
        state.meta.isLoading = false
        state.meta.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = settingsSlice.actions
export default settingsSlice.reducer