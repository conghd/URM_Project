import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import advertISBNService from './advertISBNService'

const initialState = {
  book: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Get user posts
export const getBookInfo = createAsyncThunk(
  'advertISBN/get_book_info',
  async (isbn, thunkAPI) => {
    try {
      return await advertISBNService.getBookInfo(isbn)
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message || error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const advertISBNSlice = createSlice({
  name: 'advertISBN',
  initialState: initialState,
  reducers: {
    reset: (state) => {
      state.book = null
      state.isError = false
      state.isSuccess = false
      state.isLoading = false
      state.message = ""
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBookInfo.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getBookInfo.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.book = action.payload
      })
      .addCase(getBookInfo.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = advertISBNSlice.actions
export default advertISBNSlice.reducer