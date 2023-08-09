import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import advertMyService from "./advertMyService";

const initialState = {
  adverts: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Get user posts
export const getMyAdverts = createAsyncThunk(
    "advert/get_my_adverts",
    async (condition, thunkAPI) => {
      try {
        const token = thunkAPI.getState().auth.user.token;
        return await advertMyService.getMyAdverts(condition, token);
      } catch (error) {
        const message =
        (error.response && error.response.data) ||
        error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
      }
    },
);


export const advertMySlice = createSlice({
  name: "advertMy",
  initialState: initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.adverts = [];
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
        .addCase(getMyAdverts.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(getMyAdverts.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.adverts = action.payload;
        })
        .addCase(getMyAdverts.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
        });
  },
});

export const {reset} = advertMySlice.actions;
export default advertMySlice.reducer;
