import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from './authService'

//const user = JSON.parse(localStorage.getItem('user'))
const initialSubState = {
   isError: false,
   isSuccess: false,
   isLoading: false,
   message: "",
};

const initialState = {
   user: null,
   loadState: initialSubState,
   loginState: initialSubState,
   activateState: initialSubState,
   logoutState: initialSubState,
};

// Login user
export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
  try {
    console.log("AuthSlice::login - " + JSON.stringify(user) );
    return await authService.login(user)
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

// Activate account
export const activate = createAsyncThunk('auth/activate', async (user, thunkAPI) => {
  try {
    console.log("AuthSlice::activate- " + JSON.stringify(user) );
    return await authService.activate(user)
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const logout = createAsyncThunk('auth/logout', async (thunkAPI) => {
  console.log("AuthSlice::logout");
  await authService.logout()
})

export const load = createAsyncThunk('auth/load', async (thunkAPI) => {
  try {
    console.log("authSlice::load");
    return await authService.load();
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.loadState = initialSubState
      state.loginState = initialSubState
      state.activateState = initialSubState
      state.logoutState = initialSubState
      state.user = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(activate.pending, (state) => {
        state.activateState.isLoading = true
      })
      .addCase(activate.fulfilled, (state, action) => {
        state.activateState.isLoading = false
        state.activateState.isSuccess = true
        state.user = action.payload
      })
      .addCase(activate.rejected, (state, action) => {
        state.activateState.isLoading = false
        state.activateState.isError = true
        state.activateState.message = action.payload
        //state.user = null
      })
      .addCase(login.pending, (state) => {
        state.loginState.isLoading = true
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loginState.isLoading = false
        state.loginState.isSuccess = true
        state.user = action.payload
      })
      .addCase(login.rejected, (state, action) => {
        state.loginState.isLoading = false
        state.loginState.isError = true
        state.loginState.message = action.payload
        state.user = null
      })

      .addCase(logout.pending, (state) => {
        state.logoutState.isLoading = true
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null
        state.logoutState.isLoading = false
        state.logoutState.isError = false
        state.logoutState.isSuccess = true
      })
      .addCase(load.pending, (state) => {
        state.loadState.isLoading = true 
      })
      .addCase(load.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loadState.isLoading = false;
        state.loadState.isError = false;
        state.loadState.isSuccess = true;
      })
      .addCase(load.rejected, (state, action) => {
        state.loadState.isLoading = false
        state.loadState.isError = true
        state.loadState.message = action.payload
        state.user = null
      })
  },
})

export const { reset } = authSlice.actions
export default authSlice.reducer