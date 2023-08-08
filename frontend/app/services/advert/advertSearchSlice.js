import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import advertSearchService from './advertSearchService'

const initialState = {
  adverts: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Get user posts
export const search = createAsyncThunk(
  'advert/search',
  async (condition, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await advertSearchService.search(condition, token)
    } catch (error) {
      const message =
        (error.response && error.response.data) ||
        error.message || error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)


export const advertSearchSlice = createSlice({
  name: 'advertSearch',
  initialState: initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false
      state.isError = false
      state.isSuccess = false
      state.adverts = []
      state.message = ""
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(search.pending, (state) => {
        state.isLoading = true
      })
      .addCase(search.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.adverts = action.payload
      })
      .addCase(search.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = advertSearchSlice.actions
export default advertSearchSlice.reducer