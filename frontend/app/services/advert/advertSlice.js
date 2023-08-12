import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import advertService from "./advertService";
import getStoredState from "redux-persist/es/getStoredState";

const initialState = {
  adverts: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  getMoreState: {
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ""},
};

// Get user posts
export const getAdverts = createAsyncThunk("advert/get",
    async (condition, thunkAPI) => {
      try {
        const token = thunkAPI.getState().auth.user.token;
        return await advertService.getAdverts(condition, token);
      } catch (error) {
        const message = (error.response && error.response.data) ||
        error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
      }
    },
);
// Get user posts
export const getMoreAdverts = createAsyncThunk("advert/get_more",
    async (condition, thunkAPI) => {
      try {
        const token = thunkAPI.getState().auth.user.token;
        return await advertService.getAdverts(condition, token);
      } catch (error) {
        const message = (error.response && error.response.data) ||
         error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
      }
    },
);

// Delete user post
export const deleteAdvert = createAsyncThunk(
    "advert/delete",
    async (id, thunkAPI) => {
      try {
        const token = thunkAPI.getState().auth.user.token;
        return await advertService.deleteAdvert(id, token);
      } catch (error) {
        const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
        return thunkAPI.rejectWithValue(message);
      }
    },
);

// Do UP vote
export const upvotePost = createAsyncThunk(
    "advert/up_vote",
    async (advertData, thunkAPI) => {
      try {
        console.log("------");
        const token = thunkAPI.getState().auth.user.token;
        return await advertService.upvotePost(advertData.post_id, advertData, token);
      } catch (error) {
        const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
        return thunkAPI.rejectWithValue(message);
      }
    },
);

// Do DOWN vote
export const downvotePost = createAsyncThunk(
    "advert/down_vote",
    async (advertData, thunkAPI) => {
      try {
        const token = thunkAPI.getState().auth.user.token;
        return await advertService.downvotePost(advertData.post_id, advertData, token);
      } catch (error) {
        const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
        return thunkAPI.rejectWithValue(message);
      }
    },
);

export const advertSlice = createSlice({
  name: "advert",
  initialState,
  reducers: {
    reset: (state) => {
      state.adverts = [];
    },
    resetGetMoreState: (state) => {
      state.getMoreState.isLoading = false;
      state.getMoreState.isError = false;
      state.getMoreState.isSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
        .addCase(getAdverts.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(getAdverts.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.adverts = action.payload;
        })
        .addCase(getAdverts.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
        })
        .addCase(getMoreAdverts.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(getMoreAdverts.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.adverts.push(...action.payload);
        })
        .addCase(getMoreAdverts.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
        })
        .addCase(deleteAdvert.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(deleteAdvert.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.adverts = state.adverts.filter(
              (advert) => advert._id !== action.payload.id,
          );
        })
        .addCase(deleteAdvert.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
        });
  },
});

export const {reset} = advertSlice.actions;
export default advertSlice.reducer;
