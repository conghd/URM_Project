import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import advertCreationSerice from './advertCreationService'

const initialState = {
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Create new post
export const createAdvert = createAsyncThunk(
  'advert/create',
  async (advertData, thunkAPI) => {
    try {
      console.log("advertSlice:createAdvert")
      console.log("advertSlice:createAdvert: " + thunkAPI.getState().auth.user);
      console.log("advertSlice:createAdvert2: " + thunkAPI.getState().auth.user.name);
      const token = thunkAPI.getState().auth.user.token;
      console.log("advertSlice:token: " + token);
      return await advertCreationSerice.createAdvert(advertData, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
        
        console.log("advertSlide: " + error)
        console.log("advertSlide: " + message)
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const advertCreationSlice = createSlice({
  name: 'advertCreation',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createAdvert.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createAdvert.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        //state.adverts.push(action.payload)
      })
      .addCase(createAdvert.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = advertCreationSlice.actions
export default advertCreationSlice.reducer