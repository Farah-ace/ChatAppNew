import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  user: null,
  token: null,
  loading: false,
  error: null
}

export const loginUser = createAsyncThunk('auth/loginUser', async (credentials, thunkAPI) => {
  try {
    const res = await axios.post('http://localhost:5000/api/auth/login', credentials)
    return res.data
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data)
  }
})

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null
      state.token = null
    },
    setUser: (state, action) => {
      //console.log("set User", JSON.stringify(action.payload, null, 2));
      state.user = action.payload;
    },
    setToken: (state, action) => {

      state.token = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload.user
        state.token = action.payload.token
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload.error
      })
  }
})

export const { logout, setUser, setToken } = authSlice.actions;
export default authSlice.reducer
