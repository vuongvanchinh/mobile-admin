import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import request from '../../../utils/request'

const initialState = {
  data: [],
  isLoading: true,
  hasNextPage: true
}

export const getUsers = createAsyncThunk('api/user', async () => {
    const users = await request({
      url: '/user',
      method:'GET'
    })
    return users
})
export const postsSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    appendUsers: (state, action) => {
      state.data.push(...action.payload.data)
      // state.isLoading = false,
      // state.hasNextPage = action.payload.hasNextPage 
    },
    clearUsers: (state) => {
        // return initialState
    }
  },
  extraReducers: {
    [getUsers.pending]: (state) => {
      state.isLoading = true
    },
    [getUsers.rejected]: (state, action) => {
      state.isLoading = false
    },
    [getUsers.fulfilled]: (state, action) => {
      state.isLoading = false
      state.data.push(...action.payload)
    }
  }
})

// Action creators are generated for each case reducer function
export const { appendUsers, clearUsers } = postsSlice.actions

export default postsSlice.reducer