import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import advertMyService from "./advertMyService";

const initialState = {
  adverts: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  sellState: {
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
  },
  statusState: {
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
  },
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

export const sellMyAdvert = createAsyncThunk(
    "advert/sell",
    async (condition, thunkAPI) => {
      try {
        const token = thunkAPI.getState().auth.user.token;
        return await advertMyService.sellMyAdvert(condition, token);
      } catch (error) {
        const message = (error.response && error.response.data) ||
      error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
      }
    },
);
export const updateStatus = createAsyncThunk(
    "advert/update_status",
    async (condition, thunkAPI) => {
      try {
        const token = thunkAPI.getState().auth.user.token;
        return await advertMyService.updateStatus(condition, token);
      } catch (error) {
        const message = (error.response && error.response.data) ||
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
    resetSellState: (state) => {
      state.sellState.isLoading = false;
      state.sellState.isError = false;
      state.sellState.isSuccess= false;
      state.sellState.message = "";
    },
    resetStatusState: (state) => {
      state.statusState.isLoading = false;
      state.statusState.isError = false;
      state.statusState.isSuccess= false;
      state.statusState.message = "";
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
        })
        .addCase(sellMyAdvert.pending, (state) => {
          state.sellState.isLoading = true;
        })
        .addCase(sellMyAdvert.fulfilled, (state, action) => {
          state.sellState.isLoading = false;
          state.sellState.isSuccess = true;
          console.log(action.payload);
          const index = state.adverts.findIndex(
              (item) => item._id === action.payload.data._id);
          state.adverts.splice(index, 1);
          state.adverts.push(action.payload.data);

          // Modify
          // state.sellState.adverts = action.payload;
        })
        .addCase(sellMyAdvert.rejected, (state, action) => {
          state.sellState.isLoading = false;
          state.sellState.isError = true;
          state.sellState.message = action.payload;
          console.log(action.payload);
        })
        .addCase(updateStatus.pending, (state) => {
          state.statusState.isLoading = true;
        })
        .addCase(updateStatus.fulfilled, (state, action) => {
          state.statusState.isLoading = false;
          state.statusState.isSuccess = true;
          console.log("------" + action.payload.data.status);
          // Process
          const index = state.adverts.findIndex(
              (item) => item._id === action.payload.data._id);
          state.adverts.splice(index, 1);
          if (action.payload.data.status != 0) {
            state.adverts.push(action.payload.data);
          }
        })
        .addCase(updateStatus.rejected, (state, action) => {
          state.statusState.isLoading = false;
          state.statusState.isError = true;
          state.statusState.message = action.payload;
        })
    ;
  },
});

export const {reset, resetSellState, resetStatusState} = advertMySlice.actions;
export default advertMySlice.reducer;
