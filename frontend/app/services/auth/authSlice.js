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
   forgotState: initialSubState,
   resendCodeState: initialSubState,
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

// Resend code
export const resendCode = createAsyncThunk('auth/resend_code', async (userData, thunkAPI) => {
  try {
    console.log("AuthSlice::resendCode - " + JSON.stringify(userData) );
    return await authService.resendCode(userData)
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
       error.message || error.toString()
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
  initialState: initialState,
  reducers: {
    reset: (state) => {
      state.loadState = initialSubState
      state.loginState = initialSubState
      state.activateState = initialSubState
      state.forgotState = initialSubState
      state.resendCodeState = initialSubState
      state.logoutState = initialSubState
      state.user = null
    },
    resetLogin: (state) => {
      state.loginState = initialSubState
    },
    resetForgotPassword: (state) => {
      //state.forgotState = initialState
      state.forgotState.isError = false
      state.forgotState.isSuccess = false
      state.forgotState.isLoading = false
      state.forgotState.message = ''
    },
  },
  extraReducers: (builder) => {
    builder
      // Resend Code
      .addCase(resendCode.pending, (state) => {
        state.resendCodeState.isLoading = true
      })
      .addCase(resendCode.fulfilled, (state, action) => {
        state.resendCodeState.isLoading = false
        state.resendCodeState.isSuccess = true
        //state.user.activated = true
      })
      .addCase(resendCode.rejected, (state, action) => {
        state.resendCodeState.isLoading = false
        state.resendCodeState.isError = true
        state.resendCodeState.message = action.payload
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

      // Log out
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
        state.loadState.isLoading = false;
        state.loadState.isError = false;
        state.loadState.isSuccess = true;
        state.user = action.payload.user;
        state.useFirstTime = action.payload.useFirstTime || false;
      })
      .addCase(load.rejected, (state, action) => {
        state.loadState.isLoading = false
        state.loadState.isError = true
        state.loadState.message = action.payload
        state.user = null
      })
  },
})

export const { reset, resetLogin, resetForgotPassword } = authSlice.actions
export default authSlice.reducer